const fetch = require('node-fetch');
const axios = require('axios');


offensivePassingContribution = async (passingOffenseTeam, passingDefenseTeam) => {

    let passingOffense = {
        sumPassingAttempts: 0,
        sumCompletedAttempts: 0,
        sumPassingYards: 0,
        sumPassingPoints: 0,
        games: []
    }

    let passingDefense = {
        sumPassingAttempts_allowed: 0,
        sumCompletedAttempts_allowed: 0,
        sumPassingYards_allowed: 0,
        sumPointFromPassing_allowed: 0,
        games: []
    }



    //Get game data
    try {


        const offenseStats = await axios.get(`http://api:4000/api/stats/teamOffenseMade/${passingOffenseTeam}`)
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



        const defenseStats = await axios.get(`http://api:4000/api/stats/teamOffenseAllowed/${passingDefenseTeam}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status}   StatusText: ${response.statusText}`);
                }

            })
            .catch((err) => {
                throw new Error();
            });


        //Set offensive object stats
        for (i in offenseStats) {
            if (passingOffense.games.indexOf(offenseStats[i].game_id) === -1) {
                passingOffense.games.push(offenseStats[i].game_id)

            }


            if (offenseStats[i].stat_category === "completionAttempts") {
                passingOffense.sumCompletedAttempts = passingOffense.sumCompletedAttempts + parseInt(offenseStats[i].stat.split('-')[0]);
                passingOffense.sumPassingAttempts = passingOffense.sumPassingAttempts + parseInt(offenseStats[i].stat.split('-')[1]);

            } else if (offenseStats[i].stat_category === "netPassingYards") {
                passingOffense.sumPassingYards = passingOffense.sumPassingYards + parseInt(offenseStats[i].stat)

            } else if (offenseStats[i].stat_category === "passingTDs") {
                passingOffense.sumPassingPoints = passingOffense.sumPassingPoints + parseInt(offenseStats[i].stat)

            }

        }

        passingOffense.sumPassingPoints = passingOffense.sumPassingPoints * 6


        //Set Defense object stats
        for (i in defenseStats) {
            if (passingDefense.games.indexOf(defenseStats[i].game_id) === -1) {
                passingDefense.games.push(defenseStats[i].game_id)

            }


            if (defenseStats[i].stat_category === "completionAttempts") {
                passingDefense.sumCompletedAttempts_allowed = passingDefense.sumCompletedAttempts_allowed + parseInt(defenseStats[i].stat.split('-')[0]);
                passingDefense.sumPassingAttempts_allowed = passingDefense.sumPassingAttempts_allowed + parseInt(defenseStats[i].stat.split('-')[1]);

            } else if (defenseStats[i].stat_category === "netPassingYards") {
                passingDefense.sumPassingYards_allowed = passingDefense.sumPassingYards_allowed + parseInt(defenseStats[i].stat)

            } else if (defenseStats[i].stat_category === "passingTDs") {
                passingDefense.sumPointFromPassing_allowed = passingDefense.sumPointFromPassing_allowed + parseInt(defenseStats[i].stat)

            }
        }

        passingDefense.sumPointFromPassing_allowed = passingDefense.sumPointFromPassing_allowed * 6

    } catch (error) {
        return error
    }




    //////////////////////
    //Passing Offense
    //////////////////////

    ////Sum
    //Sum historic passing attempts
    const passingOffense_historic_passing_attempts = (passingOffense.sumPassingAttempts) / passingOffense.games.length

    //Sum historic passing completions
    const passingOffense_historic_passing_completions = (passingOffense.sumCompletedAttempts) / passingOffense.games.length

    //Sum historic passing yards
    const passingOffense_historic_passing_yards = (passingOffense.sumPassingYards) / passingOffense.games.length

    //Sum historic passing points
    const passingOffense_historic_passing_points = (passingOffense.sumPassingPoints) / passingOffense.games.length


    ////Calculate
    //Calculate historic passing efficiency (completions based on completion of attempts)
    const passingOffense_historic_passing_efficiency = passingOffense_historic_passing_completions / passingOffense_historic_passing_attempts

    //Calculate historic passing yards per completion
    const passingOffense_historic_passing_yardsPerCompletion = passingOffense_historic_passing_yards / passingOffense_historic_passing_completions

    //Calculate historic points per passing yard
    const passingOffense_historic_passing_pointsPerYard = passingOffense_historic_passing_points / passingOffense_historic_passing_yards



    ////////////////////
    //Passing Defense
    ////////////////////

    ////Sum
    //Sum historic passing attempts allowed
    const passingDefense_historic_passing_attemptsAllowed = (passingDefense.sumPassingAttempts_allowed) / passingDefense.games.length

    //Sum historic passing completions allowed
    const passingDefense_historic_passing_completionsAllowed = (passingDefense.sumCompletedAttempts_allowed) / passingDefense.games.length

    //Sum historic passing yards allowed
    const passingDefense_historic_passing_yardsAllowed = (passingDefense.sumPassingYards_allowed) / passingDefense.games.length

    //Sum historic passing points allowed
    const passingDefense_historic_passingPointsAllowed = (passingDefense.sumPointFromPassing_allowed) / passingDefense.games.length


    ////Calculate
    //Calculate historic passing efficiency allowed
    const passingDefense_historic_passing_efficiencyAllowed = passingDefense_historic_passing_completionsAllowed / passingDefense_historic_passing_attemptsAllowed

    //Calculate historic passing yards per completion allowed
    const passingDefense_historic_passing_yardsPerCompletionAllowed = passingDefense_historic_passing_yardsAllowed / passingDefense_historic_passing_completionsAllowed

    //Calculate historic points per passing yard
    const passingDefense_historic_passing_pointsPerYardAllowed = passingDefense_historic_passingPointsAllowed / passingDefense_historic_passing_yardsAllowed



    ////////////////////
    //Simulation: Calculate completions, then yards per completions, then points per yards, then points
    ////////////////////

    //Calculate completions
    const simulated_passing_completionsPerAttempt = (passingOffense_historic_passing_efficiency + passingDefense_historic_passing_efficiencyAllowed) / 2

    const simulated_passing_attempts = (passingOffense_historic_passing_attempts + passingDefense_historic_passing_attemptsAllowed) / 2

    const simulated_passing_completions = simulated_passing_completionsPerAttempt * simulated_passing_attempts

    //Calculate yards per completions
    const simulated_passing_yardsPerCompletion = (passingOffense_historic_passing_yardsPerCompletion + passingDefense_historic_passing_yardsPerCompletionAllowed) / 2

    //Calculate points per yards
    const simulated_passing_pointsPerYard = (passingOffense_historic_passing_pointsPerYard + passingDefense_historic_passing_pointsPerYardAllowed) / 2

    //Calculate points
    const simulated_passing_yards = simulated_passing_yardsPerCompletion * simulated_passing_completions

    const simulated_passing_points = simulated_passing_pointsPerYard * simulated_passing_yards



    /**/
    ////////////////////
    //OutPut
    ////////////////////

    //return 
    return {
        passingAttempts: simulated_passing_attempts,
        passingCompletions: simulated_passing_completions,
        passingYards: simulated_passing_yards,
        passingPoints: simulated_passing_points
    }

}


module.exports = offensivePassingContribution