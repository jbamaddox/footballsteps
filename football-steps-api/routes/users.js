const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const authorize = require('../middleware/authorization');
const { response } = require('express');


/*   Schema and Model for database  */
const userSchema = mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
})

userSchema.methods.generateAuthTokens = function (user) {
    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

    return token
}


const userModel = mongoose.model('users', userSchema)

validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })


    return schema.validate(user)
}


/*  Routes  */
router.post('/me', authorize, async (req, res) => {
    try {
        const dbUser = await userModel.findById(req.user._id)

        const userToReturn = {
            _id: dbUser._id,
            name: dbUser.name,
            email: dbUser.email
        }

        res.status(200).send(userToReturn);

    } catch (error) {
        res.status(400).send(error)
    }
})


//Log in existing user
router.post('/authenticate', async (req, res) => {
    try {
        //Validate the information sent by the user
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        //Verify if a user already exists based on the email account
        let user = await userModel
            .findOne({ email: req.body.email });

        if (!user) return res.status(400).send('Invalid email or password')

        //Verify if user password is accurate
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).send('Invalid email or password')


        //Set JWT to send as cookie
        const token = userSchema.methods.generateAuthTokens(user)

        const userToReturn = {
            name: user.name,
            email: user.email
        }


        res.header('Access-Control-Expose-Headers', 'x-auth-token')
        res.header('x-auth-token', token).send(userToReturn);

    } catch (error) {
        console.error(error)
        res.status(400).send(error);

    }

})

//Create new user and log them in
router.post('/', async (req, res) => {
    try {
        //Validate the information sent by the user
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        //Verify if a user already exists based on the email account
        let user = await userModel
            .findOne({ email: req.body.email });

        if (user) return res.status(400).send('Invalid email or password')

        //Create new user if valid input and user does not exist
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        user = new userModel({
            name: req.body.email,
            email: req.body.email,
            password: hashed
        });

        const userToReturn = {
            name: user.name,
            email: user.email
        }

        await user.save();

        //Set JWT to send as cookie
        const token = userSchema.methods.generateAuthTokens(user)

        res.header('Access-Control-Expose-Headers', 'x-auth-token')
        res.header('x-auth-token', token).send(userToReturn);

    } catch (error) {
        console.error(error)
        res.status(400).send(error);

    }

})


module.exports = router;
exports.userModel = userModel;