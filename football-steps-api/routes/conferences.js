const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');


/*   Schema and Model for database  */
const conferenceSchema = mongoose.Schema({
    id: String,
    name: String,
    short_name: String,
    abbreviation: String
})

const conferenceModel = mongoose.model('conferences', conferenceSchema)



/*  Routes  */
router.get('/recent', async (req, res) => {
    //Return all of the conferences that have had a game played recently ("recently" is defined by the )

    try {

        let recentConferences = []

        //Get the games from the latest year
        //   'localhost:4000/api/games/latest/year'
        const myGames = await axios.get(`localhost:4000/api/games/latest/year`)
            .then((response) => {

                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error();
                }

            })
            .catch(e => {
                console.error(e);
                throw new Error(`Status: ${response.status} StatusText:${response.statusText}`);
            });



        //Put the games into the array of recent conferences
        for (x in myGames) {
            if (recentConferences.indexOf(myGames[x].home_conference) === -1 && recentConferences.indexOf(myGames[x].away_conference) === -1) {
                if (myGames[x].home_conference !== "") {
                    recentConferences.push(myGames[x].home_conference);
                }
                if (myGames[x].away_conference !== "") {
                    recentConferences.push(myGames[x].away_conference);
                }
            } else if (recentConferences.indexOf(myGames[x].home_conference) === -1 && recentConferences.indexOf(myGames[x].away_conference) !== -1) {
                if (myGames[x].home_conference !== "") {
                    recentConferences.push(myGames[x].home_conference);
                }
            } else if (recentConferences.indexOf(myGames[x].home_conference) !== -1 && recentConferences.indexOf(myGames[x].away_conference) === -1) {
                if (myGames[x].away_conference !== "") {
                    recentConferences.push(myGames[x].away_conference);
                }
            }
        }


        //Set as an object
        const conferences = await conferenceModel
            .find({ name: { $in: recentConferences } })
            .sort({ name: 1 })
            .cache();


        res.send(conferences);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

})


router.get('/:conferenceName', async (req, res) => {
    try {
        const conference = await conferenceModel
            .find({ name: `${req.params.conferenceName}` })
            .sort({ name: 1 })
            .cache();

        res.send(conference);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);

    }

})


router.get('/', async (req, res) => {
    try {
        const allConferences = await conferenceModel
            .find()
            .sort({ name: 1 })
            .cache();

        res.send(allConferences);

    } catch (error) {
        console.error(error)
        res.status(500).send(error);

    }

})

module.exports = router;
