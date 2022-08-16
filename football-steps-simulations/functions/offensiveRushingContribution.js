const fetch = require('node-fetch');
const axios = require('axios');

offensiveRushingContribution = async (rushingOffenseTeam, rushingDefenseTeam) => {

    try {

        let rushingOffense = {
            rushingAttempts: 0,
            rushingYards: 0,
            rushingPoints: 0,
            games: []
        }

        let rushingDefense = {
            rushingAttempts_allowed: 0,
            rushingYards_allowed: 0,
            pointFromRushing_allowed: 0,
            games: []
        }



        //Get game data



        const offenseStats = await axios.get(`/api/stats/teamOffenseMade/${rushingOffenseTeam}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status}   StatusText: ${response.statusText}`);
                }

            })
            .catch((err) => {
                throw new Error(err);
            });


        //Set offensive object stats
        for (i in offenseStats) {
            if (rushingOffense.games.indexOf(offenseStats[i].game_id) === -1) {
                rushingOffense.games.push(offenseStats[i].game_id)

            }


            if (offenseStats[i].stat_category === "rushingAttempts") {
                rushingOffense.rushingAttempts = rushingOffense.rushingAttempts + parseInt(offenseStats[i].stat);

            } else if (offenseStats[i].stat_category === "rushingYards") {
                rushingOffense.rushingYards = rushingOffense.rushingYards + parseInt(offenseStats[i].stat)

            } else if (offenseStats[i].stat_category === "rushingTDs") {
                rushingOffense.rushingPoints = rushingOffense.rushingPoints + (parseInt(offenseStats[i].stat) * 6)

            }

        }


        //Defensive Team's Stats allowed
        const defenseStats = await axios.get(`/api/stats/teamOffenseAllowed/${rushingDefenseTeam}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status}   StatusText: ${response.statusText}`);
                }

            })
            .catch((err) => {
                throw new Error(err);
            });


        //Set Defense object stats
        //rushingAttempts_allowed
        //rushingYards_allowed
        //pointFromRushing_allowed
        for (i in defenseStats) {
            if (rushingDefense.games.indexOf(defenseStats[i].game_id) === -1) {
                rushingDefense.games.push(defenseStats[i].game_id)

            }


            if (defenseStats[i].stat_category === "rushingAttempts") {
                rushingDefense.rushingAttempts_allowed = rushingDefense.rushingAttempts_allowed + parseInt(defenseStats[i].stat);

            } else if (defenseStats[i].stat_category === "rushingYards") {
                rushingDefense.rushingYards_allowed = rushingDefense.rushingYards_allowed + parseInt(defenseStats[i].stat)

            } else if (defenseStats[i].stat_category === "rushingTDs") {
                rushingDefense.pointFromRushing_allowed = rushingDefense.pointFromRushing_allowed + (parseInt(defenseStats[i].stat) * 6)

            }
        }



        /**/
        //////////////////////
        //Rushing Offense
        //////////////////////

        ////Sum
        //Sum historic rushing attempts
        rushingOffense_historic_rushing_attempts = (rushingOffense.rushingAttempts) / rushingOffense.games.length

        //Sum historic rushing yards
        rushingOffense_historic_rushing_yards = (rushingOffense.rushingYards) / rushingOffense.games.length

        //Sum historic rushing points
        rushingOffense_historic_rushing_points = (rushingOffense.rushingPoints) / rushingOffense.games.length


        ////Calculate
        //Calculate historic rushing yards per completion
        rushingOffense_historic_rushing_yardsPerAttempt = rushingOffense_historic_rushing_yards / rushingOffense_historic_rushing_attempts

        //Calculate historic points per rushing yard
        rushingOffense_historic_rushing_pointsPerYard = rushingOffense_historic_rushing_points / rushingOffense_historic_rushing_yards



        ////////////////////
        //Rushing Defense
        ////////////////////

        ////Sum
        //Sum historic rushing attempts allowed
        rushingDefense_historic_rushing_attemptsAllowed = (rushingDefense.rushingAttempts_allowed) / rushingDefense.games.length


        //Sum historic rushing yards allowed
        rushingDefense_historic_rushing_yardsAllowed = (rushingDefense.rushingYards_allowed) / rushingDefense.games.length

        //Sum historic rushing points allowed
        rushingDefense_historic_rushingPointsAllowed = (rushingDefense.pointFromRushing_allowed) / rushingDefense.games.length


        ////Calculate
        //Calculate historic rushing yards per completion allowed
        rushingDefense_historic_rushing_yardsPerAttemptAllowed = rushingDefense_historic_rushing_yardsAllowed / rushingDefense_historic_rushing_attemptsAllowed

        //Calculate historic points per rushing yard
        rushingDefense_historic_rushing_pointsPerYardAllowed = rushingDefense_historic_rushingPointsAllowed / rushingDefense_historic_rushing_yardsAllowed



        ////////////////////
        //Simulation: Calculate then yards per attempt, attempts, then points from yards, then yards, then points
        ////////////////////

        //Calculate yards per attempt
        simulated_rushing_yardsPerAttempt = (rushingOffense_historic_rushing_yardsPerAttempt + rushingDefense_historic_rushing_yardsPerAttemptAllowed) / 2

        //Calculate attempts
        simulated_rushing_attempts = (rushingOffense_historic_rushing_attempts + rushingDefense_historic_rushing_attemptsAllowed) / 2

        //Calculate points from yards
        simulated_rushing_pointsPerYard = (rushingOffense_historic_rushing_pointsPerYard + rushingDefense_historic_rushing_pointsPerYardAllowed) / 2

        //Calculate yards
        simulated_rushing_yards = simulated_rushing_yardsPerAttempt * simulated_rushing_attempts

        //Calculate points
        simulated_rushing_points = simulated_rushing_pointsPerYard * simulated_rushing_yards




        /**/
        ////////////////////
        //Output
        ////////////////////

        return {
            rushingAttempts: simulated_rushing_attempts,
            rushingYards: simulated_rushing_yards,
            rushingPoints: simulated_rushing_points
        }

    } catch (error) {
        return error
    }

}

module.exports = offensiveRushingContribution