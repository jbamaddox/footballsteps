const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



/*  Schema and Model for database  */
const gameSchema = mongoose.Schema({
    id: Number,
    season: Number,
    week: Number,
    start_date: Date,
    home_id: Number,
    home_school: String,
    home_conference: String,
    home_points: Number,
    away_id: Number,
    away_school: String,
    away_conference: String,
    away_points: Number
});

const gameModel = mongoose.model('games', gameSchema);



/* Functions  */
getLatestSeasonWeek = async () => {
    //Return an object containing the latest season and week
    try {
        let latestSeasonYear = 0
        let latestWeek = 0

        let latestSeasonWeekArray = await gameModel
            .find()
            .select({ week: 1, season: 1 })
            .sort({ season: -1, week: -1 })
            .limit(1)
            .cache();

        let latestSeasonWeekObject = latestSeasonWeekArray[0]

        latestSeasonYear = (latestSeasonWeekObject.season)
        latestWeek = (latestSeasonWeekObject.week)

        return {
            latestSeasonYear: latestSeasonYear,
            latestWeek: latestWeek
        }

    } catch (error) {
        throw new Error(error)

    }

}



//Games by season and week
getGamesBySeasonWeek = async (seasonParam, weekParam) => {
    try {

        let searchObject = {}

        if (weekParam === 0) {
            searchObject = {
                season: seasonParam
            }
        } else if (seasonParam === 0) {
            const { latestSeasonYear } = await getLatestSeasonWeek();

            searchObject = {
                season: latestSeasonYear,
                week: weekParam
            }
        }

        const games = await gameModel
            .find(searchObject)
            .sort({ season: -1, week: -1 })
            .cache();

        return games

    } catch (error) {
        throw new Error(error);
    }

}


getGamesBySchoolSeasonWeek = async (school, season, week) => {
    try {

        let searchObject = {}

        if (week === 0) {
            searchObject = {
                season: season
            }
        } else if (season === 0) {
            const { latestSeasonYear } = await getLatestSeasonWeek();

            searchObject = {
                season: latestSeasonYear,
                week: week
            }
        }

        const games = await gameModel
            .find(searchObject)
            .or([{ home_team: school }, { away_team: school }])
            .sort({ season: -1, week: -1 })
            .cache();

        return games

    } catch (error) {
        throw new Error(error);


    }

}

getGamesByConferenceSeasonWeek = async (conference, season, week) => {
    try {


        let searchObject = {}

        if (week === 0) {
            searchObject = {
                season: season
            }
        } else if (season === 0) {
            const { latestSeasonYear } = await getLatestSeasonWeek();
            searchObject = {
                season: latestSeasonYear,
                week: week
            }
        }

        const games = await gameModel
            .find(searchObject)
            .or([{ home_conference: conference }, { away_conference: conference }])
            .sort({ season: -1, week: -1 })
            .cache();

        return games;

    } catch (error) {
        throw new Error(error);

    }

}



/* Routes */
//Return games based on the season the week

//--if "week" parameter is 0, return all games for that season
//--if "season" parameter is 0, return all games for the latest season
router.get('/latest/:seasonWeekYear', async (req, res) => {
    try {
        const { latestSeasonYear, latestWeek } = await getLatestSeasonWeek(0, 0);
        let games = [];

        if (req.params.seasonWeekYear === "season") {
            games = await getGamesBySeasonWeek(latestSeasonYear, 0);

        } else if (req.params.seasonWeekYear === "week") {
            games = await getGamesBySeasonWeek(latestSeasonYear, latestWeek);

        } else if (req.params.seasonWeekYear === "year") {
            const prevYear = new Date().getFullYear() - 1;
            const currentMonth = new Date().getMonth();
            const currentDate = new Date().getDate();

            const requestDate = new Date(prevYear, currentMonth, currentDate).toISOString();

            games = await gameModel
                .find({ start_date: { $gte: requestDate } })
                .sort({ season: -1, week: -1 })
                .cache();

        }

        res.send(games);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }

});


router.get('/season-week/:conferenceOrTeamOrAll/:season/:week', async (req, res) => {
    try {
        let games = []

        if (req.params.conferenceOrTeamOrAll === "conference") {
            games = await getGamesByConferenceSeasonWeek(req.params.conferenceOrTeamOrAll, req.params.season, req.params.week);
        } else if (req.params.conferenceOrTeamOrAll === "team") {
            games = await getGamesBySchoolSeasonWeek(req.params.conferenceOrTeamOrAll, req.params.season, req.params.week);
        } else if (req.params.conferenceOrTeamOrAll === "all") {
            games = await getGamesBySeasonWeek(req.params.season, req.params.week);
        }

        res.send(games);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }

});


//Return games based on the conference
router.get('/conference/:conferenceName', async (req, res) => {
    try {
        const games = await gameModel
            .find()
            .or(
                [
                    { home_conference: req.params.conferenceName },
                    { away_conference: req.params.conferenceName }
                ]
            )
            .sort({ season: -1, week: -1 })
            .cache();

        res.send(games);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }

});


//Return games of a team
//Return only Gameids for team
//Return games based on the team playing
router.get('/team/gameIds/:teamName', async (req, res) => {
    try {
        const games = await gameModel
            .find()
            .select({ id: 1 })
            .or(
                [
                    { home_team: `${req.params.teamName}` },
                    { away_team: `${req.params.teamName}` }
                ]
            )
            .sort({ season: -1, week: -1 })
            .limit(12)
            .cache();

        res.send(games);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }

});


//Return games based on the team playing (last 10 games only)
router.get('/team/:teamName', async (req, res) => {
    try {
        const games = await gameModel
            .find()
            .or(
                [
                    { home_team: `${req.params.teamName}` },
                    { away_team: `${req.params.teamName}` }
                ]
            )
            .sort({ season: -1, week: -1 })
            .limit(10)
            .cache();

        res.send(games);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }

});


//Return one game based on the gameID
router.get('/gameId/:gameId', async (req, res) => {
    try {
        const games = await gameModel
            .find({ id: req.params.gameId })
            .cache();

        res.send(games);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }

});


//Return all recent games
router.get('/', async (req, res) => {

    try {
        //Return games for the latest week
        const { latestSeasonYear, latestWeek } = await getLatestSeasonWeek();

        //Get all the games for the latest week
        const latestGames = await gameModel
            .find({ season: latestSeasonYear, week: latestWeek })
            .sort({ season: -1, week: -1 })
            .cache();

        return res.send(latestGames);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }

});


module.exports = router;
