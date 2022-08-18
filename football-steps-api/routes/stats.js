const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');


/* Database Schema and Model */
//stats
const statsSchema = mongoose.Schema({
    game_id: Number,
    school: String,
    conference: String,
    homeAway: String,
    points: Number,
    stat_category: String,
    stat: String
})

const statsModel = mongoose.model('stats', statsSchema, 'stats');


//statCategoryGroups
const statCategoryGroupSchema = mongoose.Schema({
    stat_category_group: String,
    stat_categories: Array
})

const statCategoryGroupModel = mongoose.model('statCategoryGroups', statCategoryGroupSchema, 'statCategoryGroups');



/* Route */

//----Special Teams-----//
router.get('/specialTeamsAllowed/:teamName', async (req, res) => {

    try {

        //Initialize array of games
        let gameIdArray = []


        //Get Games IDs For the latest weeks
        const gameIds = await axios.get(`localhost:4000/api/games/team/gameIds/${req.params.teamName}`)
            .then((response) => {

                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status} StatusText:${response.statusText}`);
                }
            })
            .catch((e) => {
                console.log(e);
                throw new Error(e);
            });


        //Parse the games to create an array of gameids
        for (i in gameIds) {
            gameIdArray.push(gameIds[i].id);
        }


        //Get the stat categories needed
        let statCategoryGroup = await statCategoryGroupModel
            .find({
                stat_category_group: "specialTeams"
            });

        const statCategoryArray = statCategoryGroup[0].stat_categories


        //Use the array of stat categories to get the data for the games
        const stats = await statsModel
            .find({
                game_id: { $in: gameIdArray },
                stat_category: { $in: statCategoryArray },
                school: { $nin: [req.params.teamName] }
            })
            .sort({ stat_category: 1 })
            .cache();


        res.send(stats);


    } catch (error) {
        console.log(error)
        res.status(500).send(error);

    }

})




router.get('/specialTeamsMade/:teamName', async (req, res) => {

    try {

        //Initialize array of games
        let gameIdArray = []


        //Get Games IDs For the latest weeks
        const gameIds = await axios.get(`localhost:4000/api/games/team/gameIds/${req.params.teamName}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status} StatusText:${response.statusText}`);
                }

            })
            .catch((e) => {
                console.log(e);
                throw new Error(e);

            });


        //Parse the games to create an array of gameids
        for (i in gameIds) {
            gameIdArray.push(gameIds[i].id);
        }


        //Get the stat categories needed
        let statCategoryGroup = await statCategoryGroupModel
            .find({
                stat_category_group: "specialTeams"
            })
            .cache();

        const statCategoryArray = (statCategoryGroup[0].stat_categories)

        //Use the array of stat categories to get the data for the games
        const stats = await statsModel
            .find({
                game_id: { $in: gameIdArray },
                stat_category: { $in: statCategoryArray },
                school: req.params.teamName
            })
            .sort({ stat_category: 1 })
            .cache();


        res.send(stats);


    } catch (error) {
        console.log(error)
        res.status(500).send(error);

    }

})




//----Defense-----//
router.get('/teamDefenseAllowed/:teamName', async (req, res) => {

    try {

        //Initialize array of games
        let gameIdArray = []


        //Get Games IDs For the latest weeks
        const gameIds = await axios.get(`localhost:4000/api/games/team/gameIds/${req.params.teamName}`)
            .then((response) => {

                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status} StatusText:${response.statusText}`);
                }
            })
            .catch((e) => {
                console.log(e);
                throw new Error(e);
            });


        //Parse the games to create an array of gameids
        for (i in gameIds) {
            gameIdArray.push(gameIds[i].id);
        }


        //Get the stat categories needed
        let statCategoryGroup = await statCategoryGroupModel
            .find({
                stat_category_group: "defense"
            })
            .cache();

        const statCategoryArray = statCategoryGroup[0].stat_categories


        //Use the array of stat categories to get the data for the games
        const stats = await statsModel
            .find({
                game_id: { $in: gameIdArray },
                stat_category: { $in: statCategoryArray },
                school: { $nin: [req.params.teamName] }
            })
            .sort({ stat_category: 1 })
            .cache();


        res.send(stats);


    } catch (error) {
        console.log(error)
        res.status(500).send(error);

    }

})




router.get('/teamDefenseMade/:teamName', async (req, res) => {

    try {

        //Initialize array of games
        let gameIdArray = []


        //Get Games IDs For the latest weeks
        const gameIds = await axios.get(`localhost:4000/api/games/team/gameIds/${req.params.teamName}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status} StatusText:${response.statusText}`);
                }

            })
            .catch((e) => {
                console.log(e);
                throw new Error(e);

            });


        //Parse the games to create an array of gameids
        for (i in gameIds) {
            gameIdArray.push(gameIds[i].id);
        }


        //Get the stat categories needed
        let statCategoryGroup = await statCategoryGroupModel
            .find({
                stat_category_group: "defense"
            })
            .cache();

        const statCategoryArray = (statCategoryGroup[0].stat_categories)

        //Use the array of stat categories to get the data for the games
        const stats = await statsModel
            .find({
                game_id: { $in: gameIdArray },
                stat_category: { $in: statCategoryArray },
                school: req.params.teamName
            })
            .sort({ stat_category: 1 })
            .cache();


        res.send(stats);


    } catch (error) {
        console.log(error)
        res.status(500).send(error);

    }

})



//----Offense-----//
//'/teamDefense/:teamName'--all stats for a team's last 10 games
////get the last 10 games for the team
////get the stats for games listed 

router.get('/teamOffenseAllowed/:teamName', async (req, res) => {

    try {

        //Initialize array of games
        let gameIdArray = []


        //Get Games IDs For the latest weeks
        const gameIds = await axios.get(`localhost:4000/api/games/team/gameIds/${req.params.teamName}`)
            .then((response) => {

                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status} StatusText:${response.statusText}`);
                }
            })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
            });


        //Parse the games to create an array of gameids
        for (i in gameIds) {
            gameIdArray.push(gameIds[i].id);
        }


        //Get the stat categories needed
        let statCategoryGroup = await statCategoryGroupModel
            .find({
                stat_category_group: "offense"
            })
            .cache();

        const statCategoryArray = statCategoryGroup[0].stat_categories


        //Use the array of stat categories to get the data for the games
        const stats = await statsModel
            .find({
                game_id: { $in: gameIdArray },
                stat_category: { $in: statCategoryArray },
                school: { $nin: [req.params.teamName] }
            })
            .sort({ stat_category: 1 })
            .cache();


        res.send(stats);


    } catch (error) {
        console.log(error)
        res.status(500).send(error);

    }

})



//'/teamOffense/:teamName'
////get the last 10 games for the team
////get the stats for games listed 

router.get('/teamOffenseMade/:teamName', async (req, res) => {

    try {

        //Initialize array of games
        let gameIdArray = []


        //Get Games IDs For the latest weeks
        const gameIds = await axios.get(`localhost:4000/api/games/team/gameIds/${req.params.teamName}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status} StatusText:${response.statusText}`);
                }

            })
            .catch((error) => {
                console.log(error);
                throw new Error(error);

            });


        //Parse the games to create an array of gameids
        for (i in gameIds) {
            gameIdArray.push(gameIds[i].id);
        }


        //Get the stat categories needed
        let statCategoryGroup = await statCategoryGroupModel
            .find({
                stat_category_group: "offense"
            })
            .cache();

        const statCategoryArray = statCategoryGroup[0].stat_categories


        //Use the array of stat categories to get the data for the games
        const stats = await statsModel
            .find({
                game_id: { $in: gameIdArray },
                stat_category: { $in: statCategoryArray },
                school: req.params.teamName
            })
            .sort({ stat_category: 1 })
            .cache();


        res.send(stats);


    } catch (error) {
        console.log(error)
        res.status(500).send(error);

    }

})




//'/team/:teamName'--all stats for a team's last 10 games
////get the last 10 games for the team
////get the stats for games listed 
router.get('/team/:teamName', async (req, res) => {

    try {
        //Initialize array of games
        let gameIdArray = []


        //Get Games IDs For the latest week
        const games = await axios.get(`localhost:4000/api/games/team/${req.params.teamName}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status} StatusText:${response.statusText}`);
                }

            })
            .catch((e) => {
                console.log(e);
                throw new Error(e);

            });


        //Parse the games to create an array of gameids
        for (i in games) {
            gameIdArray.push(games[i].id);

        }


        //Use the array of games to get the data for the games
        const stats = await statsModel
            .find({
                game_id: { $in: gameIdArray }
            })
            .sort({ school: 1, stat_category: 1 })
            .cache();

        console.log(stats)

        res.send(stats);

    } catch (error) {
        console.log(error)
        res.status(500).send(error);

    }

})




//'/gameid/:gameId'-- return all stats for the specificed game
router.get('/gameid/:gameId', async (req, res) => {

    try {
        //Use the array of games to get the data for the games
        const stats = await statsModel
            .find({ game_id: req.params.gameId })
            .sort({ school: 1, stat_category: 1 })
            .cache();

        res.send(stats);

    } catch (error) {
        console.log(error)
        res.status(500).send(error);

    }

})



//Return the stats for the latest game played
router.get('/', async (req, res) => {

    try {
        //Initialize array of games
        let gameIdArray = []


        //Get Games IDs For the latest week
        const games = await axios.get(`localhost:4000/api/games`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data

                } else {
                    throw new Error(`Status: ${response.status} StatusText:${response.statusText}`);

                }

            })
            .catch((e) => {
                console.log(e);
                throw new Error(e);

            });


        //Parse the games to create an array of gameids
        for (i in games) {
            gameIdArray.push(games[i].id);
        }


        //Use the array of games to get the data for the games
        const stats = await statsModel
            .find({ game_id: { $in: gameIdArray } })
            .sort({ school: 1, stat_category: 1 })
            .cache();


        res.send(stats);

    } catch (error) {
        console.log(error)
        res.status(500).send(error);

    }

})

module.exports = router;
