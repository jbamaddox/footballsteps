const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const offensivePassingContribution = require('./functions/offensivePassingContribution.js');
const offensiveRushingContribution = require('./functions/offensiveRushingContribution.js');
const defensiveContribution = require('./functions/defensiveContribution.js');
const specialTeamContribution = require('./functions/specialTeamContribution.js');
const { createClient } = require('redis');
const keys = require('./keys.js');



router.get('/', async (req, res) => {
    res.send('Simulation api route is online')
})

router.post('/', async (req, res) => {
    try {
        let returnValue = {
            teamA: {},
            teamB: {}
        }


        //Connect to redis 
        const redisClient = createClient({
            url: `redis://${keys.redisHost}:${keys.redisPort}`
        });

        await redisClient.connect()


        //Check if we have the query object in our cache
        const key = JSON.stringify(Object.assign(
            {},
            { request: req.body.body }
        ));

        const cachedValue = await redisClient.get(key)


        //If we have a cached value, respond with that value. 
        //Otherwise, calculate the needed value
        if (cachedValue) {
            returnValue = JSON.parse(cachedValue);

        } else {

            /*
            //Expected body
            {  
                "teamA": {
                    "name": "Coastal Carolina",
                    "offense": {
                        "passing": "Coastal Carolina",
                        "rushing": "Coastal Carolina"
                    },
                    "defense": "Coastal Carolina",
                    "specialTeams": "Coastal Carolina"
                },
                "teamB": {
                    "name": "Kansas",
                    "offense": {
                        "passing": "Kansas",
                        "rushing": "Kansas"
                    },
                    "defense": "Kansas",
                    "specialTeams": "Kansas"
                }
            }
        
            */


            const modifiedBody = JSON.parse(req.body.body)

            //-----Offensive Data-----//
            const teamA_offensivePassingContribution = await offensivePassingContribution(modifiedBody.teamA.offense.passing, modifiedBody.teamB.defense)
            const teamA_offensiveRushingContribution = await offensiveRushingContribution(modifiedBody.teamA.offense.rushing, modifiedBody.teamB.defense)

            const teamB_offensivePassingContribution = await offensivePassingContribution(modifiedBody.teamB.offense.passing, modifiedBody.teamA.defense)
            const teamB_offensiveRushingContribution = await offensiveRushingContribution(modifiedBody.teamB.offense.rushing, modifiedBody.teamA.defense)



            //-----Defensive Data-----//
            const teamA_DefensiveData = await defensiveContribution(modifiedBody.teamA.defense, modifiedBody.teamB.offense.passing, modifiedBody.teamB.offense.rushing);

            const teamB_DefensiveData = await defensiveContribution(modifiedBody.teamB.defense, modifiedBody.teamA.offense.passing, modifiedBody.teamA.offense.rushing);


            //-----Special teams points-----//
            const teamA_specialTeamContribution = await specialTeamContribution(modifiedBody.teamA.specialTeams, modifiedBody.teamB.specialTeams);

            const teamB_specialTeamContribution = await specialTeamContribution(modifiedBody.teamB.specialTeams, modifiedBody.teamA.specialTeams);


            //Sum Total Points
            const teamA_Points = (
                teamA_offensivePassingContribution.passingPoints +
                teamA_offensiveRushingContribution.rushingPoints +
                (teamA_DefensiveData.defensiveTDs * 6) +
                teamA_specialTeamContribution.kickingPoints +
                (teamA_specialTeamContribution.puntReturnTDs * 6)
            )

            const teamB_Points = (
                teamB_offensivePassingContribution.passingPoints +
                teamB_offensiveRushingContribution.rushingPoints +
                (teamB_DefensiveData.defensiveTDs * 6) +
                teamB_specialTeamContribution.kickingPoints +
                (teamB_specialTeamContribution.puntReturnTDs * 6)
            )


            //Set team data objects to return
            const teamA_All = {
                name: `${modifiedBody.teamA.name}`,
                points: teamA_Points,
                passing: teamA_offensivePassingContribution,
                rushing: teamA_offensiveRushingContribution,
                defense: teamA_DefensiveData,
                specialTeams: teamA_specialTeamContribution,
            }

            const teamB_All = {
                name: `${modifiedBody.teamB.name}`,
                points: teamB_Points,
                passing: teamB_offensivePassingContribution,
                rushing: teamB_offensiveRushingContribution,
                defense: teamB_DefensiveData,
                specialTeams: teamB_specialTeamContribution,
            }

            returnValue = {
                teamA: teamA_All,
                teamB: teamB_All
            }


            //Set cached value
            redisClient.set(key, JSON.stringify(returnValue));

        }//END if (cachedValue), Else


        //Set the value to be returned
        res.send(returnValue);

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }

})

module.exports = router;