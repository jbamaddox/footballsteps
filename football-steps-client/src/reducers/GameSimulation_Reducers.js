export const GameSimulation_SetTeamAData = (teamAData = null, action) => {
    if (action.type === 'UPDATE_TEAMA_DATA') {
        return action.payload
    }

    return teamAData

}

export const GameSimulation_SetTeamBData = (teamBData = null, action) => {
    if (action.type === 'UPDATE_TEAMB_DATA') {
        return action.payload
    }

    return teamBData
}

export const GameSimulation_toggleShowHideChangeTeamComponent = (currentToggleValue = 0, action) => {
    if (action.type === 'SHOW_CHANGE_TEAM_COMPONENT') {
        return action.payload
    } else if (action.type === 'HIDE_CHANGE_TEAM_COMPONENT') {
        return action.payload
    }

    return currentToggleValue
}

export const GameSimulation_toggleShowHideSimulationResults = (currentToggleValue = 1, action) => {
    if (action.type === 'SHOW_SIMULATION_RESULTS') {
        return action.payload
    } else if (action.type === 'HIDE_SIMULATION_RESULTS') {
        return action.payload
    }

    return currentToggleValue
}

export const GameSimulation_toggleShowSetSubstitutions = (currentToggleValue = 0, action) => {
    if (action.type === 'SHOW_SUBSTITUTION_COMPONENT') {
        return action.payload
    } else if (action.type === 'HIDE_SUBSTITUTION_COMPONENT') {
        return action.payload
    }

    return currentToggleValue
}