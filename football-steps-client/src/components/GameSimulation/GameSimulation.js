import React, { Component } from 'react';
import ChangeTeams from '../ChangeTeams/ChangeTeams.js';
import ScoreBoard from '../ScoreBoard/ScoreBoard.js';
import SubsStatsChart from '../SubsStatsChart/SubsStatsChart.js';
import SubstitutionsAll from '../SubstitutionsAll/SubstitutionsAll.js';
import TeamLogoName from '../TeamLogoName/TeamLogoName.js';
import { setTeamDataAction, toggleShowChangeTeamAction, toggleShowSimulationResultsAction } from '../../actions/GameSimulation_Actions.js';
import { connect } from 'react-redux';
import axios from 'axios';


class GameSimulation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //Initial team info from Redux store data
            needGameSimulation: 1,
            teamAName: this.props.teamAData === null ? this.props.teamANameDefault : this.props.teamAData.data.school,
            teamBName: this.props.teamBData === null ? this.props.teamBNameDefault : this.props.teamBData.data.school,
            teamAGameData: this.props.teamAData === null ? null : this.props.teamAData.gameData,
            teamBGameData: this.props.teamBData === null ? null : this.props.teamBData.gameData,

        }

    }


    componentDidMount() {

        //If team data is not available, use the default info. Otherwise, use the substitute data from the redux store team object
        if ((this.props.teamAData === null || this.props.teamBData === null) && this.state.needGameSimulation === 1) {

            //Update substitution data
            this.setData(
                this.props.teamAData === null ? this.props.teamANameDefault : this.props.teamAData.data.school,
                this.props.teamBData === null ? this.props.teamBNameDefault : this.props.teamBData.data.school,
                this.props.teamAData === null ? null : this.props.teamAData.subData,
                this.props.teamBData === null ? null : this.props.teamBData.subData
            )

        } else {
            this.setState({ needGameSimulation: 0 })

        }

    }


    //Initialize and update team data
    setData = (setTeamAName, setTeamBName, setTeamASubObject, setTeamBSubObject) => {

        const teamAData = this.getTeamData(setTeamAName);
        const teamBData = this.getTeamData(setTeamBName);
        const teamGameData = this.simulateGame(setTeamAName, setTeamBName, setTeamASubObject, setTeamBSubObject);

        Promise.all([teamAData, teamBData, teamGameData])
            .then(
                (values) => {

                    //Set data for team to be moved to Redux store
                    const teamA = {
                        data: values[0],
                        gameData: values[2].teamA,
                        subData: {
                            name: setTeamASubObject === null ? null : setTeamAName,
                            offense: {
                                passing: setTeamASubObject === null ? null : setTeamASubObject.offense.passing,
                                rushing: setTeamASubObject === null ? null : setTeamASubObject.offense.rushing,
                                passingConference: setTeamASubObject === null ? null : setTeamASubObject.offense.passingConference,
                                rushingConference: setTeamASubObject === null ? null : setTeamASubObject.offense.rushingConference,
                                passingTeamList: setTeamASubObject === null ? null : setTeamASubObject.offense.passingTeamList,
                                rushingTeamList: setTeamASubObject === null ? null : setTeamASubObject.offense.rushingTeamList
                            },
                            defense: {
                                defense: setTeamASubObject === null ? null : setTeamASubObject.defense.defense,
                                defenseConference: setTeamASubObject === null ? null : setTeamASubObject.defense.defenseConference,
                                defenseTeamList: setTeamASubObject === null ? null : setTeamASubObject.defense.defenseTeamList
                            },
                            specialTeams: setTeamASubObject === null ? null : setTeamASubObject.specialTeams
                        }
                    }

                    const teamB = {
                        data: values[1],
                        gameData: values[2].teamB,
                        subData: {
                            name: setTeamBSubObject === null ? null : setTeamBName,
                            offense: {
                                passing: setTeamBSubObject === null ? null : setTeamBSubObject.offense.passing,
                                rushing: setTeamBSubObject === null ? null : setTeamBSubObject.offense.rushing,
                                passingConference: setTeamBSubObject === null ? null : setTeamBSubObject.offense.passingConference,
                                rushingConference: setTeamBSubObject === null ? null : setTeamBSubObject.offense.rushingConference,
                                passingTeamList: setTeamBSubObject === null ? null : setTeamBSubObject.offense.passingTeamList,
                                rushingTeamList: setTeamBSubObject === null ? null : setTeamBSubObject.offense.rushingTeamList
                            },
                            defense: {
                                defense: setTeamBSubObject === null ? null : setTeamBSubObject.defense.defense,
                                defenseConference: setTeamBSubObject === null ? null : setTeamBSubObject.defense.defenseConference,
                                defenseTeamList: setTeamBSubObject === null ? null : setTeamBSubObject.defense.defenseTeamList
                            },
                            specialTeams: setTeamBSubObject === null ? null : setTeamBSubObject.specialTeams
                        }
                    }

                    //Set team data to Redux store
                    this.props.setTeamDataAction("teamA", teamA)
                    this.props.setTeamDataAction("teamB", teamB)

                    //Set the state (and reload component)
                    this.setState({
                        teamAName: setTeamAName,
                        teamBName: setTeamBName,
                        teamAGameData: values[2].teamA,
                        teamBGameData: values[2].teamB,
                        needGameSimulation: 0
                    })

                }

            )
            .catch((error) => {
                console.log(error);
            });

    }


    //Simulate game with main teams and substitutions
    simulateGame = async (simteamA, simteamB, teamASubstitutionsObject, teamBSubstitutionsObject) => {

        let requestBody = {}

        if (teamASubstitutionsObject === null || teamBSubstitutionsObject === null) {
            requestBody = {
                teamA: {
                    name: simteamA,
                    offense: {
                        passing: simteamA,
                        rushing: simteamA
                    },
                    defense: simteamA,
                    specialTeams: simteamA
                },
                teamB: {
                    name: simteamB,
                    offense: {
                        passing: simteamB,
                        rushing: simteamB
                    },
                    defense: simteamB,
                    specialTeams: simteamB
                }
            }
        } else {
            requestBody = {
                teamA: {
                    name: simteamA,
                    offense: {
                        passing: teamASubstitutionsObject.offense.passing === null ? simteamA : teamASubstitutionsObject.offense.passing,
                        rushing: teamASubstitutionsObject.offense.rushing === null ? simteamA : teamASubstitutionsObject.offense.rushing
                    },
                    defense: teamASubstitutionsObject.defense.defense === null ? simteamA : teamASubstitutionsObject.defense.defense,
                    specialTeams: teamASubstitutionsObject.specialTeams === null ? simteamA : teamASubstitutionsObject.specialTeams
                },
                teamB: {
                    name: simteamB,
                    offense: {
                        passing: teamBSubstitutionsObject.offense.passing === null ? simteamB : teamBSubstitutionsObject.offense.passing,
                        rushing: teamBSubstitutionsObject.offense.rushing === null ? simteamB : teamBSubstitutionsObject.offense.rushing
                    },
                    defense: teamBSubstitutionsObject.defense.defense === null ? simteamB : teamBSubstitutionsObject.defense.defense,
                    specialTeams: teamBSubstitutionsObject.specialTeams === null ? simteamB : teamBSubstitutionsObject.specialTeams
                }
            }
        }


        try {

            return await axios.post('/simulations', {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)

            }).then((response) => {
                if (response.status === 200) {
                    return response.data

                } else {
                    throw new Error(`Status: ${response.status}   Message: ${response.statusText}`)

                }
            });

        } catch (error) {
            console.log(error);
            //throw new Error(error);

        }

    }


    //Get team specific data from database
    getTeamData = async (teamName) => {

        try {

            const teamData = await axios.get(`/api/teams/${teamName}`,
                {
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })
                .then((response) => {
                    if (response.status === 200) {
                        return response.data

                    } else {
                        throw new Error(`Status: ${response.status}   Message: ${response.statusText}`)

                    }
                })

            return teamData

        } catch (error) {
            console.log(error);
            //throw new Error(error);

        }

    }

    //Simulate a new game with substitues
    simNewGame = (newTeamA, newTeamB) => {
        this.setState({ needGameSimulation: 1 })

        //If both teams need to be changed
        if (
            newTeamA !== this.state.teamAName && newTeamA !== null
            && newTeamB !== this.state.teamBName && newTeamB !== null
        ) {
            this.props.setTeamDataAction("teamA", null)
            this.props.setTeamDataAction("teamB", null)
            this.props.toggleShowChangeTeamAction(0)
            this.props.toggleShowSimulationResultsAction(1)

            this.setData(newTeamA, newTeamB, null, null);

        }
        //Else if only teamA needs to be changed
        else if (newTeamA !== this.state.teamAName && newTeamA !== null) {

            this.props.setTeamDataAction("teamA", null)
            this.props.setTeamDataAction("teamB", null)
            this.props.toggleShowChangeTeamAction(0)
            this.props.toggleShowSimulationResultsAction(1)

            this.setData(newTeamA, this.state.teamBName, null, null);

        }
        //Else if only team B needs to be changed
        else if (newTeamB !== this.state.teamBName && newTeamB !== null) {


            this.props.setTeamDataAction("teamA", null)
            this.props.setTeamDataAction("teamB", null)
            this.props.toggleShowChangeTeamAction(0)
            this.props.toggleShowSimulationResultsAction(1)

            this.setData(this.state.teamAName, newTeamB, null, null);

        }

    }


    //Reset all substitutes
    resetSubs = () => {
        this.setState({ needGameSimulation: 1 })
        this.setData(this.state.teamAName, this.state.teamBName, null, null);

    }


    //Set substitution data in redux store to trigger a simulation with the substitutions 
    simulateWithSubstitutions = (substituteState) => {

        let subteamA = {
            name: this.state.teamAName,
            offense: {
                passing: substituteState.tempSubTeamAOffensePassing === null ? null : substituteState.tempSubTeamAOffensePassing,
                rushing: substituteState.tempSubTeamAOffenseRushing === null ? null : substituteState.tempSubTeamAOffenseRushing,
                passingConference: substituteState.tempSubTeamAOffensePassingConference === null ? null : substituteState.tempSubTeamAOffensePassingConference,
                rushingConference: substituteState.tempSubTeamAOffenseRushingConference === null ? null : substituteState.tempSubTeamAOffenseRushingConference,
                passingTeamList: substituteState.tempSubTeamAOffensePassingTeamList === null ? null : substituteState.tempSubTeamAOffensePassingTeamList,
                rushingTeamList: substituteState.tempSubTeamAOffenseRushingTeamList === null ? null : substituteState.tempSubTeamAOffenseRushingTeamList
            },
            defense: {
                defense: substituteState.tempSubTeamADefense === null ? null : substituteState.tempSubTeamADefense,
                defenseConference: substituteState.tempSubTeamADefenseConference === null ? null : substituteState.tempSubTeamADefenseConference,
                defenseTeamList: substituteState.tempSubTeamADefenseTeamList === null ? null : substituteState.tempSubTeamADefenseTeamList,
            },
            specialTeams: this.state.teamAName
        }

        let subteamB = {
            name: this.state.teamBName,
            offense: {
                passing: substituteState.tempSubTeamBOffensePassing === null ? null : substituteState.tempSubTeamBOffensePassing,
                rushing: substituteState.tempSubTeamBOffenseRushing === null ? null : substituteState.tempSubTeamBOffenseRushing,
                passingConference: substituteState.tempSubTeamBOffensePassingConference === null ? null : substituteState.tempSubTeamBOffensePassingConference,
                rushingConference: substituteState.tempSubTeamBOffenseRushingConference === null ? null : substituteState.tempSubTeamBOffenseRushingConference,
                passingTeamList: substituteState.tempSubTeamBOffensePassingTeamList === null ? null : substituteState.tempSubTeamBOffensePassingTeamList,
                rushingTeamList: substituteState.tempSubTeamBOffenseRushingTeamList === null ? null : substituteState.tempSubTeamBOffenseRushingTeamList
            },
            defense: {
                defense: substituteState.tempSubTeamBDefense === null ? null : substituteState.tempSubTeamBDefense,
                defenseConference: substituteState.tempSubTeamBDefenseConference === null ? null : substituteState.tempSubTeamBDefenseConference,
                defenseTeamList: substituteState.tempSubTeamBDefenseTeamList === null ? null : substituteState.tempSubTeamBDefenseTeamList,
            },
            specialTeams: this.state.teamBName
        }

        this.setState({ needGameSimulation: 1 })
        this.setData(subteamA.name, subteamB.name, subteamA, subteamB);

    }


    //Determine the JSX to produce for main window of component
    applicationToReturn = () => {
        let appReturned = null;

        if (this.props.innerWindowType === null || this.state.needGameSimulation === 1 || this.props.teamAData === null || this.props.teamBData === null) {
            appReturned = <div style={{ width: "100%", textAlign: "center", float: "left" }}>Simulating the game...</div>

        } else if (this.props.showHideSimulationResults === 1) {
            appReturned = (
                <div>
                    <TeamLogoName />

                    <ScoreBoard />

                    <SubsStatsChart
                        //component functions
                        resetSubs={this.resetSubs}
                        componentOrderCSSDelay={4}
                    />

                </div>
            )

        } else if (this.props.showHideChangeTeamComponent === 1) {
            appReturned = (
                <ChangeTeams simNewGame={this.simNewGame} />
            )

        } else if (this.props.showHideSetSubstitutions === 1) {
            appReturned = (
                <SubstitutionsAll
                    componentTitle="Position Substitutions"
                    simulateWithSubstitutions={this.simulateWithSubstitutions}

                />
            )

        }

        return appReturned
    }


    render() {
        return (
            <div className={`gameSimulation_${this.props.innerWindowType}`}>
                {this.applicationToReturn()}
            </div>
        )
    }
}


GameSimulation.defaultProps = {
    innerWindowType: null,
    gameSimulationState: null,
    setGameSimulationState: null,
    teamANameDefault: "Purdue",
    teamBNameDefault: "Indiana"
}


const MapStateToProps = (state) => {
    return {
        teamAData: state.teamAData,
        teamBData: state.teamBData,
        showHideChangeTeamComponent: state.showHideChangeTeamComponent,
        showHideSimulationResults: state.showHideSimulationResults,
        showHideSetSubstitutions: state.showHideSetSubstitutions,
        innerWindowType: state.innerWindowType
    }
}

export default connect(MapStateToProps, { setTeamDataAction, toggleShowChangeTeamAction, toggleShowSimulationResultsAction })(GameSimulation);