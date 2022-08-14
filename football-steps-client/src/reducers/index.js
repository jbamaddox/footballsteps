import { combineReducers } from 'redux'
import { showHideHorizontalMenuBarReducer, selectedHorizontalMenuButton } from './HorizontalMenuBar_Reducer'
import { setTokenReducer, setUserNameReducer } from './LogInOut_Reducers'
import { showHideAccountMenu, showLogInOutComponent } from './Header_Reducers'
import {
    GameSimulation_SetTeamAData,
    GameSimulation_SetTeamBData,
    GameSimulation_toggleShowHideChangeTeamComponent,
    GameSimulation_toggleShowHideSimulationResults,
    GameSimulation_toggleShowSetSubstitutions
} from './GameSimulation_Reducers'

const setInnerWindowTypeReducer = (newInnerWindowType = "Desktop", action) => {
    if (action.type === 'CHANGE_INNER_WINDOW_TYPE') {
        return action.payload
    }

    return newInnerWindowType

}


export default combineReducers({
    showHideHorizontalMenuBar: showHideHorizontalMenuBarReducer,
    innerWindowType: setInnerWindowTypeReducer,
    selectedHorizontalMenuButton: selectedHorizontalMenuButton,
    token: setTokenReducer,
    userName: setUserNameReducer,
    showHideAccountMenu: showHideAccountMenu,
    showLogInOutComponent: showLogInOutComponent,
    teamAData: GameSimulation_SetTeamAData,
    teamBData: GameSimulation_SetTeamBData,
    showHideChangeTeamComponent: GameSimulation_toggleShowHideChangeTeamComponent,
    showHideSimulationResults: GameSimulation_toggleShowHideSimulationResults,
    showHideSetSubstitutions: GameSimulation_toggleShowSetSubstitutions
})
