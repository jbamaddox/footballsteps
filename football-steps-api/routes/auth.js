const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');



/*   Schema and Model for database  */
const authUserSchema = mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: true,
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


authUserSchema.methods.generateAuthTokens = function (user) {
    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

    return token
}

const authUserModel = mongoose.models.users || mongoose.model('users', authUserSchema)

validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(user)
}


/*  Routes  */
router.post('/', async (req, res) => {
    try {
        //Validate the information sent by the user
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message)


        //Verify if a user already exists based on the email account
        let user = await authUserModel
            .findOne({ email: req.body.email });

        if (!user) return res.status(400).send('Invalid email or password')

        //Verify if user password is accurate
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).send('Invalid email or password')

        //Set up json web token to send
        const token = mongoose.models.users ? mongoose.models.users.schema.methods.generateAuthTokens(user) : authUserSchema.generateAuthTokens(user)

        res.header('x-auth-token', token).sendStatus(200);

    } catch (error) {
        console.error(error)
        res.status(400).send(error);

    }

})

module.exports = router;
