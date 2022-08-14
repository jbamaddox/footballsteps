import React, { Component } from 'react';
import GameSimulation from '../GameSimulation/GameSimulation.js';
import Teams from '../Teams/Teams.js'
import Home from '../Home/Home.js';
import './AppBody.css';
import { connect } from 'react-redux'


class AppBody extends Component {
    constructor(props) {
        super(props)

        this.state = {
            innerWindowType: this.props.innerWindowType,
            gameSimulationState: null,
            teamsState: null

        }

    }


    //Save the state of the child components
    setComponentState = (stateToSet, state) => {
        if (stateToSet === "Simulations") {
            this.setState({ gameSimulationState: state })

        } else if (stateToSet === "Teams") {
            this.setState({ teamsState: state })

        }
    }


    applicationToReturn = () => {
        let appReturned = null;

        if (this.props.innerWindowType === null) {
            appReturned = null
        } else if (this.props.appBody === "Home") {
            appReturned = (
                <Home />
            )

        } else if (this.props.appBody === "Simulations") {
            appReturned = (
                <GameSimulation
                    gameSimulationState={this.state.gameSimulationState}
                    setGameSimulationState={this.setComponentState}
                />
            )

        } else if (this.props.appBody === "Teams") {
            appReturned = (
                <Teams
                    teamsState={this.state.teamsState}
                    setTeamsState={this.setComponentState}
                    gameSimulationState={this.state.gameSimulationState}
                />
            )

        }

        return appReturned
    }


    render() {

        return (
            <div className={`appBody_${this.props.innerWindowType}`}>
                {this.applicationToReturn()}
            </div>
        )
    }

}

AppBody.defaultProps = {
    innerWindowType: null,
    needLogInOut: 0
}

const MapStateToProps = (state) => {
    return {
        appBody: state.selectedHorizontalMenuButton,
        token: state.token,
        innerWindowType: state.innerWindowType
    }
}

export default connect(MapStateToProps)(AppBody);
