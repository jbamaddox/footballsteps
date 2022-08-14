export const setTeamDataAction = (teamAOrteamB, data) => {
    if (teamAOrteamB === "teamA") {
        return {
            type: 'UPDATE_TEAMA_DATA',
            payload: data
        }
    } else if (teamAOrteamB === "teamB") {
        return {
            type: 'UPDATE_TEAMB_DATA',
            payload: data
        }
    }
}

export const toggleShowChangeTeamAction = (newToggleSetting) => {
    if (newToggleSetting === 1) {
        return {
            type: 'SHOW_CHANGE_TEAM_COMPONENT',
            payload: 1
        }
    } else if (newToggleSetting === 0) {
        return {
            type: 'HIDE_CHANGE_TEAM_COMPONENT',
            payload: 0
        }
    }
}

export const toggleShowSimulationResultsAction = (newToggleSetting) => {
    if (newToggleSetting === 1) {
        return {
            type: 'SHOW_SIMULATION_RESULTS',
            payload: 1
        }
    } else if (newToggleSetting === 0) {
        return {
            type: 'HIDE_SIMULATION_RESULTS',
            payload: 0
        }
    }
}

export const toggleShowSetSubstitutionsAction = (newToggleSetting) => {
    if (newToggleSetting === 1) {
        return {
            type: 'SHOW_SUBSTITUTION_COMPONENT',
            payload: 1
        }
    } else if (newToggleSetting === 0) {
        return {
            type: 'HIDE_SUBSTITUTION_COMPONENT',
            payload: 0
        }
    }
}