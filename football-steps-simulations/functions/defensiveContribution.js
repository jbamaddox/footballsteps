const axios = require('axios');


defensiveContribution = async (defenseMadeTeam, defenseAllowedTeamA, defenseAllowedTeamB) => {
    if (defenseAllowedTeamA === defenseAllowedTeamB) {

        try {


            let defenseMade = {
                defensiveTDs: 0,
                fumblesRecovered: 0,
                interceptions: 0,
                qbHurries: 0,
                sacks: 0,
                tackles: 0,
                tacklesForLoss: 0,
                games: []
            }


            let defenseAllowed = {
                defensiveTDs: 0,
                fumblesRecovered: 0,
                interceptions: 0,
                qbHurries: 0,
                sacks: 0,
                tackles: 0,
                tacklesForLoss: 0,
                games: []
            }


            //Get relevant game data from database
            const defenseStatsMade = await axios.get(`/api/stats/teamDefenseMade/${defenseMadeTeam}`)
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

            const defenseStatsAllowed = await axios.get(`/api/stats/teamDefenseAllowed/${defenseAllowedTeamA}`)
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
            for (i in defenseStatsMade) {
                if (defenseMade.games.indexOf(defenseStatsMade[i].game_id) === -1) {
                    defenseMade.games.push(defenseStatsMade[i].game_id)

                }

                if (defenseStatsMade[i].stat_category === "defensiveTDs") {
                    defenseMade.defensiveTDs = defenseMade.defensiveTDs + parseInt(defenseStatsMade[i].stat);

                } else if (defenseStatsMade[i].stat_category === "fumblesRecovered") {
                    defenseMade.fumblesRecovered = defenseMade.fumblesRecovered + parseInt(defenseStatsMade[i].stat);

                } else if (defenseStatsMade[i].stat_category === "interceptions") {
                    defenseMade.interceptions = defenseMade.interceptions + parseInt(defenseStatsMade[i].stat);

                } else if (defenseStatsMade[i].stat_category === "qbHurries") {
                    defenseMade.qbHurries = defenseMade.qbHurries + parseInt(defenseStatsMade[i].stat);

                } else if (defenseStatsMade[i].stat_category === "sacks") {
                    defenseMade.sacks = defenseMade.sacks + parseInt(defenseStatsMade[i].stat);

                } else if (defenseStatsMade[i].stat_category === "tackles") {
                    defenseMade.tackles = defenseMade.tackles + parseInt(defenseStatsMade[i].stat);

                } else if (defenseStatsMade[i].stat_category === "tacklesForLoss") {
                    defenseMade.tacklesForLoss = defenseMade.tacklesForLoss + parseInt(defenseStatsMade[i].stat);

                }

            }



            //Set Defense object stats
            for (i in defenseStatsAllowed) {
                if (defenseAllowed.games.indexOf(defenseStatsAllowed[i].game_id) === -1) {
                    defenseAllowed.games.push(defenseStatsAllowed[i].game_id)

                }

                if (defenseStatsAllowed[i].stat_category === "defensiveTDs") {
                    defenseAllowed.defensiveTDs = defenseAllowed.defensiveTDs + parseInt(defenseStatsAllowed[i].stat);

                } else if (defenseStatsAllowed[i].stat_category === "fumblesRecovered") {
                    defenseAllowed.fumblesRecovered = defenseAllowed.fumblesRecovered + parseInt(defenseStatsAllowed[i].stat);

                } else if (defenseStatsAllowed[i].stat_category === "interceptions") {
                    defenseAllowed.interceptions = defenseAllowed.interceptions + parseInt(defenseStatsAllowed[i].stat);

                } else if (defenseStatsAllowed[i].stat_category === "qbHurries") {
                    defenseAllowed.qbHurries = defenseAllowed.qbHurries + parseInt(defenseStatsAllowed[i].stat);

                } else if (defenseStatsAllowed[i].stat_category === "sacks") {
                    defenseAllowed.sacks = defenseAllowed.sacks + parseInt(defenseStatsAllowed[i].stat);

                } else if (defenseStatsAllowed[i].stat_category === "tackles") {
                    defenseAllowed.tackles = defenseAllowed.tackles + parseInt(defenseStatsAllowed[i].stat);

                } else if (defenseStatsAllowed[i].stat_category === "tacklesForLoss") {
                    defenseAllowed.tacklesForLoss = defenseAllowed.tacklesForLoss + parseInt(defenseStatsAllowed[i].stat);

                }

            }


            //Get Game averagee
            defenseMade = {
                defensiveTDs: defenseMade.defensiveTDs / defenseMade.games.length,
                fumblesRecovered: defenseMade.fumblesRecovered / defenseMade.games.length,
                interceptions: defenseMade.interceptions / defenseMade.games.length,
                qbHurries: defenseMade.qbHurries / defenseMade.games.length,
                sacks: defenseMade.sacks / defenseMade.games.length,
                tackles: defenseMade.tackles / defenseMade.games.length,
                tacklesForLoss: defenseMade.tacklesForLoss / defenseMade.games.length,
                games: defenseMade.games
            }

            defenseAllowed = {
                defensiveTDs: defenseAllowed.defensiveTDs / defenseAllowed.games.length,
                fumblesRecovered: defenseAllowed.fumblesRecovered / defenseAllowed.games.length,
                interceptions: defenseAllowed.interceptions / defenseAllowed.games.length,
                qbHurries: defenseAllowed.qbHurries / defenseAllowed.games.length,
                sacks: defenseAllowed.sacks / defenseAllowed.games.length,
                tackles: defenseAllowed.tackles / defenseAllowed.games.length,
                tacklesForLoss: defenseAllowed.tacklesForLoss / defenseAllowed.games.length,
                games: defenseAllowed.games
            }


            //Get the average of stats made and allowed
            let simulatedDefenseMade = {
                defensiveTDs: (defenseMade.defensiveTDs + defenseAllowed.defensiveTDs) / 2,
                fumblesRecovered: (defenseMade.fumblesRecovered + defenseAllowed.fumblesRecovered) / 2,
                interceptions: (defenseMade.interceptions + defenseAllowed.interceptions) / 2,
                qbHurries: (defenseMade.qbHurries + defenseAllowed.qbHurries) / 2,
                sacks: (defenseMade.sacks + defenseAllowed.sacks) / 2,
                tackles: (defenseMade.tackles + defenseAllowed.tackles) / 2,
                tacklesForLoss: (defenseMade.tacklesForLoss + defenseAllowed.tacklesForLoss) / 2
            }


            return simulatedDefenseMade

        } catch (error) {
            return error

        }

    }//End of If(defenseAllowedTeamA === defenseAllowedTeamB)

    else {

        try {


            let defenseMade = {
                defensiveTDs: 0,
                fumblesRecovered: 0,
                interceptions: 0,
                qbHurries: 0,
                sacks: 0,
                tackles: 0,
                tacklesForLoss: 0,
                games: []
            }


            let defenseAllowed = {
                defensiveTDs: 0,
                fumblesRecovered: 0,
                interceptions: 0,
                qbHurries: 0,
                sacks: 0,
                tackles: 0,
                tacklesForLoss: 0,
                games: []
            }


            let defenseAllowedB = {
                defensiveTDs: 0,
                fumblesRecovered: 0,
                interceptions: 0,
                qbHurries: 0,
                sacks: 0,
                tackles: 0,
                tacklesForLoss: 0,
                games: []
            }




            //Get relevant game data from database
            const defenseStatsMade = await axios.get(`/api/stats/teamDefenseMade/${defenseMadeTeam}`)
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

            const defenseStatsAllowed = await axios.get(`/api/stats/teamDefenseAllowed/${defenseAllowedTeamA}`)
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


            const defenseStatsAllowedB = await axios.get(`/api/stats/teamDefenseAllowed/${defenseAllowedTeamB}`)
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
            for (i in defenseStatsMade) {
                if (defenseMade.games.indexOf(defenseStatsMade[i].game_id) === -1) {
                    defenseMade.games.push(defenseStatsMade[i].game_id)

                }

                if (defenseStatsMade[i].stat_category === "defensiveTDs") {
                    defenseMade.defensiveTDs = defenseMade.defensiveTDs + parseInt(defenseStatsMade[i].stat);

                } else if (defenseStatsMade[i].stat_category === "fumblesRecovered") {
                    defenseMade.fumblesRecovered = defenseMade.fumblesRecovered + parseInt(defenseStatsMade[i].stat);

                } else if (defenseStatsMade[i].stat_category === "interceptions") {
                    defenseMade.interceptions = defenseMade.interceptions + parseInt(defenseStatsMade[i].stat);

                } else if (defenseStatsMade[i].stat_category === "qbHurries") {
                    defenseMade.qbHurries = defenseMade.qbHurries + parseInt(defenseStatsMade[i].stat);

                } else if (defenseStatsMade[i].stat_category === "sacks") {
                    defenseMade.sacks = defenseMade.sacks + parseInt(defenseStatsMade[i].stat);

                } else if (defenseStatsMade[i].stat_category === "tackles") {
                    defenseMade.tackles = defenseMade.tackles + parseInt(defenseStatsMade[i].stat);

                } else if (defenseStatsMade[i].stat_category === "tacklesForLoss") {
                    defenseMade.tacklesForLoss = defenseMade.tacklesForLoss + parseInt(defenseStatsMade[i].stat);

                }

            }




            //Set Defense object stats
            for (i in defenseStatsAllowed) {
                if (defenseAllowed.games.indexOf(defenseStatsAllowed[i].game_id) === -1) {
                    defenseAllowed.games.push(defenseStatsAllowed[i].game_id)

                }

                if (defenseStatsAllowed[i].stat_category === "defensiveTDs") {
                    defenseAllowed.defensiveTDs = defenseAllowed.defensiveTDs + parseInt(defenseStatsAllowed[i].stat);

                } else if (defenseStatsAllowed[i].stat_category === "fumblesRecovered") {
                    defenseAllowed.fumblesRecovered = defenseAllowed.fumblesRecovered + parseInt(defenseStatsAllowed[i].stat);

                } else if (defenseStatsAllowed[i].stat_category === "interceptions") {
                    defenseAllowed.interceptions = defenseAllowed.interceptions + parseInt(defenseStatsAllowed[i].stat);

                } else if (defenseStatsAllowed[i].stat_category === "qbHurries") {
                    defenseAllowed.qbHurries = defenseAllowed.qbHurries + parseInt(defenseStatsAllowed[i].stat);

                } else if (defenseStatsAllowed[i].stat_category === "sacks") {
                    defenseAllowed.sacks = defenseAllowed.sacks + parseInt(defenseStatsAllowed[i].stat);

                } else if (defenseStatsAllowed[i].stat_category === "tackles") {
                    defenseAllowed.tackles = defenseAllowed.tackles + parseInt(defenseStatsAllowed[i].stat);

                } else if (defenseStatsAllowed[i].stat_category === "tacklesForLoss") {
                    defenseAllowed.tacklesForLoss = defenseAllowed.tacklesForLoss + parseInt(defenseStatsAllowed[i].stat);

                }

            }


            for (i in defenseStatsAllowedB) {
                if (defenseAllowedB.games.indexOf(defenseStatsAllowedB[i].game_id) === -1) {
                    defenseAllowedB.games.push(defenseStatsAllowedB[i].game_id)

                }

                if (defenseStatsAllowedB[i].stat_category === "defensiveTDs") {
                    defenseAllowedB.defensiveTDs = defenseAllowedB.defensiveTDs + parseInt(defenseStatsAllowedB[i].stat);

                } else if (defenseStatsAllowedB[i].stat_category === "fumblesRecovered") {
                    defenseAllowedB.fumblesRecovered = defenseAllowedB.fumblesRecovered + parseInt(defenseStatsAllowedB[i].stat);

                } else if (defenseStatsAllowedB[i].stat_category === "interceptions") {
                    defenseAllowedB.interceptions = defenseAllowedB.interceptions + parseInt(defenseStatsAllowedB[i].stat);

                } else if (defenseStatsAllowedB[i].stat_category === "qbHurries") {
                    defenseAllowedB.qbHurries = defenseAllowedB.qbHurries + parseInt(defenseStatsAllowedB[i].stat);

                } else if (defenseStatsAllowedB[i].stat_category === "sacks") {
                    defenseAllowedB.sacks = defenseAllowedB.sacks + parseInt(defenseStatsAllowedB[i].stat);

                } else if (defenseStatsAllowedB[i].stat_category === "tackles") {
                    defenseAllowedB.tackles = defenseAllowedB.tackles + parseInt(defenseStatsAllowedB[i].stat);

                } else if (defenseStatsAllowedB[i].stat_category === "tacklesForLoss") {
                    defenseAllowedB.tacklesForLoss = defenseAllowedB.tacklesForLoss + parseInt(defenseStatsAllowedB[i].stat);

                }

            }


            //Get Game averagee
            defenseMade = {
                defensiveTDs: defenseMade.defensiveTDs / defenseMade.games.length,
                fumblesRecovered: defenseMade.fumblesRecovered / defenseMade.games.length,
                interceptions: defenseMade.interceptions / defenseMade.games.length,
                qbHurries: defenseMade.qbHurries / defenseMade.games.length,
                sacks: defenseMade.sacks / defenseMade.games.length,
                tackles: defenseMade.tackles / defenseMade.games.length,
                tacklesForLoss: defenseMade.tacklesForLoss / defenseMade.games.length,
                games: defenseMade.games
            }

            defenseAllowed = {
                defensiveTDs: defenseAllowed.defensiveTDs / defenseAllowed.games.length,
                fumblesRecovered: defenseAllowed.fumblesRecovered / defenseAllowed.games.length,
                interceptions: defenseAllowed.interceptions / defenseAllowed.games.length,
                qbHurries: defenseAllowed.qbHurries / defenseAllowed.games.length,
                sacks: defenseAllowed.sacks / defenseAllowed.games.length,
                tackles: defenseAllowed.tackles / defenseAllowed.games.length,
                tacklesForLoss: defenseAllowed.tacklesForLoss / defenseAllowed.games.length,
                games: defenseAllowed.games
            }

            defenseAllowedB = {
                defensiveTDs: defenseAllowedB.defensiveTDs / defenseAllowedB.games.length,
                fumblesRecovered: defenseAllowedB.fumblesRecovered / defenseAllowedB.games.length,
                interceptions: defenseAllowedB.interceptions / defenseAllowedB.games.length,
                qbHurries: defenseAllowedB.qbHurries / defenseAllowedB.games.length,
                sacks: defenseAllowedB.sacks / defenseAllowedB.games.length,
                tackles: defenseAllowedB.tackles / defenseAllowedB.games.length,
                tacklesForLoss: defenseAllowedB.tacklesForLoss / defenseAllowedB.games.length,
                games: defenseAllowedB.games
            }

            averageDefenseAllowed = {
                defensiveTDs: (defenseAllowed.defensiveTDs + defenseAllowedB.defensiveTDs) / 2,
                fumblesRecovered: (defenseAllowed.fumblesRecovered + defenseAllowedB.fumblesRecovered) / 2,
                interceptions: (defenseAllowed.interceptions + defenseAllowedB.interceptions) / 2,
                qbHurries: (defenseAllowed.qbHurries + defenseAllowedB.qbHurries) / 2,
                sacks: (defenseAllowed.sacks + defenseAllowedB.sacks) / 2,
                tackles: (defenseAllowed.tackles + defenseAllowedB.tackles) / 2,
                tacklesForLoss: (defenseAllowed.tacklesForLoss + defenseAllowedB.tacklesForLoss) / 2
            }



            //Get the average of stats made and allowed
            let simulatedDefenseMade = {
                defensiveTDs: (defenseMade.defensiveTDs + averageDefenseAllowed.defensiveTDs) / 2,
                fumblesRecovered: (defenseMade.fumblesRecovered + averageDefenseAllowed.fumblesRecovered) / 2,
                interceptions: (defenseMade.interceptions + averageDefenseAllowed.interceptions) / 2,
                qbHurries: (defenseMade.qbHurries + averageDefenseAllowed.qbHurries) / 2,
                sacks: (defenseMade.sacks + averageDefenseAllowed.sacks) / 2,
                tackles: (defenseMade.tackles + averageDefenseAllowed.tackles) / 2,
                tacklesForLoss: (defenseMade.tacklesForLoss + averageDefenseAllowed.tacklesForLoss) / 2
            }


            return simulatedDefenseMade

        } catch (error) {
            return error

        }

    }//End of Else

}

module.exports = defensiveContribution