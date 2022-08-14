const fetch = require('node-fetch');
const axios = require('axios');

specialTeamContribution = async (specialTeamsMadeTeam, specialTeamsAllowedTeam) => {
    try {

        let specialTeamsMade = {
            sumNumberOfGames: 0,
            kickReturnTDs: 0,
            kickReturnYards: 0,
            kickReturns: 0,
            kickingPoints: 0,
            puntReturnTDs: 0,
            puntReturnYards: 0,
            puntReturns: 0,
            games: []
        }

        let specialTeamsAllowed = {
            sumNumberOfGames: 0,
            kickReturnTDs: 0,
            kickReturnYards: 0,
            kickReturns: 0,
            kickingPoints: 0,
            puntReturnTDs: 0,
            puntReturnYards: 0,
            puntReturns: 0,
            games: []
        }


        //Get stats for each team
        const dataMade = await axios.get(`http://api:4000/api/stats/specialTeamsMade/${specialTeamsMadeTeam}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status}    Status Text: ${response.statusText}`)
                }
            })
            .catch((error) => {
                throw new Error(error)
            });

        const dataAllowed = await axios.get(`http://api:4000/api/stats/specialTeamsAllowed/${specialTeamsAllowedTeam}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    throw new Error(`Status: ${response.status}    Status Text: ${response.statusText}`)
                }
            })
            .catch((error) => {
                throw new Error(error)
            });



        //Update data objects with correct info
        for (i in dataMade) {
            if (specialTeamsMade.games.indexOf(dataMade[i].game_id) === -1) {
                specialTeamsMade.games.push(dataMade[i].game_id)

            }

            if (dataMade[i].stat_category === "kickReturnTDs") {
                specialTeamsMade.kickReturnTDs = specialTeamsMade.kickReturnTDs + parseInt(dataMade[i].stat);

            } else if (dataMade[i].stat_category === "kickReturnYards") {
                specialTeamsMade.kickReturnYards = specialTeamsMade.kickReturnYards + parseInt(dataMade[i].stat);

            } else if (dataMade[i].stat_category === "kickReturns") {
                specialTeamsMade.kickReturns = specialTeamsMade.kickReturns + parseInt(dataMade[i].stat);

            } else if (dataMade[i].stat_category === "kickingPoints") {
                specialTeamsMade.kickingPoints = specialTeamsMade.kickingPoints + parseInt(dataMade[i].stat);

            } else if (dataMade[i].stat_category === "puntReturnTDs") {
                specialTeamsMade.puntReturnTDs = specialTeamsMade.puntReturnTDs + parseInt(dataMade[i].stat);

            } else if (dataMade[i].stat_category === "puntReturnYards") {
                specialTeamsMade.puntReturnYards = specialTeamsMade.puntReturnYards + parseInt(dataMade[i].stat);

            } else if (dataMade[i].stat_category === "puntReturns") {
                specialTeamsMade.puntReturns = specialTeamsMade.puntReturns + parseInt(dataMade[i].stat);

            }

        }


        for (i in dataAllowed) {
            if (specialTeamsAllowed.games.indexOf(dataAllowed[i].game_id) === -1) {
                specialTeamsAllowed.games.push(dataAllowed[i].game_id)

            }

            if (dataAllowed[i].stat_category === "kickReturnTDs") {
                specialTeamsAllowed.kickReturnTDs = specialTeamsAllowed.kickReturnTDs + parseInt(dataAllowed[i].stat);

            } else if (dataAllowed[i].stat_category === "kickReturnYards") {
                specialTeamsAllowed.kickReturnYards = specialTeamsAllowed.kickReturnYards + parseInt(dataAllowed[i].stat);

            } else if (dataAllowed[i].stat_category === "kickReturns") {
                specialTeamsAllowed.kickReturns = specialTeamsAllowed.kickReturns + parseInt(dataAllowed[i].stat);

            } else if (dataAllowed[i].stat_category === "kickingPoints") {
                specialTeamsAllowed.kickingPoints = specialTeamsAllowed.kickingPoints + parseInt(dataAllowed[i].stat);

            } else if (dataAllowed[i].stat_category === "puntReturnTDs") {
                specialTeamsAllowed.puntReturnTDs = specialTeamsAllowed.puntReturnTDs + parseInt(dataAllowed[i].stat);

            } else if (dataAllowed[i].stat_category === "puntReturnYards") {
                specialTeamsAllowed.puntReturnYards = specialTeamsAllowed.puntReturnYards + parseInt(dataAllowed[i].stat);

            } else if (dataAllowed[i].stat_category === "puntReturns") {
                specialTeamsAllowed.puntReturns = specialTeamsAllowed.puntReturns + parseInt(dataAllowed[i].stat);

            }

        }



        //Update stats to a per game basis
        specialTeamsMade = {
            kickReturnTDs: specialTeamsMade.kickReturnTDs / specialTeamsMade.games.length,
            kickReturnYards: specialTeamsMade.kickReturnYards / specialTeamsMade.games.length,
            kickReturns: specialTeamsMade.kickReturns / specialTeamsMade.games.length,
            kickingPoints: specialTeamsMade.kickingPoints / specialTeamsMade.games.length,
            puntReturnTDs: specialTeamsMade.puntReturnTDs / specialTeamsMade.games.length,
            puntReturnYards: specialTeamsMade.puntReturnYards / specialTeamsMade.games.length,
            puntReturns: specialTeamsMade.puntReturns / specialTeamsMade.games.length,
            games: specialTeamsMade.games
        }

        specialTeamsAllowed = {
            kickReturnTDs: specialTeamsAllowed.kickReturnTDs / specialTeamsAllowed.games.length,
            kickReturnYards: specialTeamsAllowed.kickReturnYards / specialTeamsAllowed.games.length,
            kickReturns: specialTeamsAllowed.kickReturns / specialTeamsAllowed.games.length,
            kickingPoints: specialTeamsAllowed.kickingPoints / specialTeamsAllowed.games.length,
            puntReturnTDs: specialTeamsAllowed.puntReturnTDs / specialTeamsAllowed.games.length,
            puntReturnYards: specialTeamsAllowed.puntReturnYards / specialTeamsAllowed.games.length,
            puntReturns: specialTeamsAllowed.puntReturns / specialTeamsAllowed.games.length,
            games: specialTeamsAllowed.games
        }


        //Calculate simulated data
        const simulatedSpecialTeams = {
            kickReturnTDs: (specialTeamsMade.kickReturnTDs + specialTeamsAllowed.kickReturnTDs) / 2,
            kickReturnYards: (specialTeamsMade.kickReturnYards + specialTeamsAllowed.kickReturnYards) / 2,
            kickReturns: (specialTeamsMade.kickReturns + specialTeamsAllowed.kickReturns) / 2,
            kickingPoints: (specialTeamsMade.kickingPoints + specialTeamsAllowed.kickingPoints) / 2,
            puntReturnTDs: (specialTeamsMade.puntReturnTDs + specialTeamsAllowed.puntReturnTDs) / 2,
            puntReturnYards: (specialTeamsMade.puntReturnYards + specialTeamsAllowed.puntReturnYards) / 2,
            puntReturns: (specialTeamsMade.puntReturns + specialTeamsAllowed.puntReturns) / 2
        }

        return simulatedSpecialTeams


    } catch (error) {
        return error
    }
}

module.exports = specialTeamContribution