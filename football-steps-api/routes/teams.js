const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');


/* Schema and Model for Individual Team */
const teamSchema = mongoose.Schema({
    id: Number,
    school: String,
    mascot: String,
    abbreviation: String,
    alt_name_1: String,
    alt_name_2: String,
    alt_name_3: String,
    conference: String,
    division: String,
    color: String,
    alt_color: String,
    logos: [String]
});

const teamModel = mongoose.model('teams', teamSchema);



/* Schema and Model for All Teams
Delete
const allTeamsSchema = mongoose.Schema({
    home_team: String,
    away_team: String
});

//const allTeamsModel = mongoose.model('games', allTeamsSchema, 'games');
 */

/* Routes */
router.get('/recent', async (req, res) => {


    try {
        //Query the game database for all the games in the last 2 years
        const teamGamesArray = await axios.get(`localhost:/api/games/latest/year`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status}  |  Status Text: ${response.statusText}`)
                }

            })
            .catch((e) => {
                throw new Error(e)
            });


        //Put all the teams from the games in an array
        let teamsArray = []

        for (i in teamGamesArray) {
            if (teamsArray.indexOf(teamGamesArray[i].home_team) === -1) {
                teamsArray.push(teamGamesArray[i].home_team)
            }

        }


        //Get the team records from the team database
        const teams = await teamModel
            .find({ school: { $in: teamsArray } })
            .sort({ school: 1 })
            .cache();

        res.send(teams)

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }

})


//Find teams in a conference
router.get('/conference/:conference', async (req, res) => {
    try {

        //Get the teams based on thier conference
        const conferenceTeams = await teamModel
            .find({ conference: `${req.params.conference}` })
            .sort({ school: 1 })
            .cache();


        res.send(conferenceTeams);

    } catch (error) {
        console.log(error)
        res.status(500).send(error);

    }


})//End of: Find teams in a conference


//Find individual team data
router.get('/:team', async (req, res) => {
    try {
        const myTeam = await teamModel
            .find({ school: `${req.params.team}` })
            .cache();

        res.send(myTeam[0]);

    } catch (error) {
        console.log(error)
        res.status(500).send(error);


    }

})//End of: Find individual team data


//Find all teams
router.get('/', async (req, res) => {
    try {

        //Get all teams that in the database that have a game associated
        const allTeams = await teamModel
            .find()
            .sort({ school: 1 })
            .cache();


        res.send(allTeams);

    } catch (error) {
        console.log(error)
        res.status(500).send(error);

    }

})//End of: Find all teams


module.exports = router;
