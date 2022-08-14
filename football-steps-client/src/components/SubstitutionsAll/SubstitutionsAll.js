import React, { Component } from 'react';
import SubstitutePositions from '../SubstitutePositions/SubstitutePositions.js';
import ExecuteButton from '../ExecuteButton/ExecuteButton.js';
import TeamLogoName from '../TeamLogoName/TeamLogoName.js';
import { connect } from 'react-redux'
import { toggleShowSetSubstitutionsAction, toggleShowSimulationResultsAction } from '../../actions/GameSimulation_Actions'
import axios from 'axios';

class SubstitutionsAll extends Component {
    constructor(props) {
        super(props)

        this.state = {
            conferences: null,
            //Set Data
            //TeamA 
            //Passing
            subTeamAOffensePassingConference: this.props.teamAData.subData.offense.passingConference,
            subTeamAOffensePassingTeamList: this.props.teamAData.subData.offense.passingTeamList,
            subTeamAOffensePassing: this.props.teamAData.subData.offense.passing,
            //Rushing
            subTeamAOffenseRushingConference: this.props.teamAData.subData.offense.rushingConference,
            subTeamAOffenseRushingTeamList: this.props.teamAData.subData.offense.rushingTeamList,
            subTeamAOffenseRushing: this.props.teamAData.subData.offense.rushing,
            //Defense
            subTeamADefenseConference: this.props.teamAData.subData.defense.defenseConference,
            subTeamADefenseTeamList: this.props.teamAData.subData.defense.defenseTeamList,
            subTeamADefense: this.props.teamAData.subData.defense.defense,


            //TeamB 
            //Passing
            subTeamBOffensePassingConference: this.props.teamBData.subData.offense.passingConference,
            subTeamBOffensePassingTeamList: this.props.teamBData.subData.offense.passingTeamList,
            subTeamBOffensePassing: this.props.teamBData.subData.offense.passing,
            //Rushing
            subTeamBOffenseRushingConference: this.props.teamBData.subData.offense.rushingConference,
            subTeamBOffenseRushingTeamList: this.props.teamBData.subData.offense.rushingTeamList,
            subTeamBOffenseRushing: this.props.teamBData.subData.offense.rushing,
            //Defense
            subTeamBDefenseConference: this.props.teamBData.subData.defense.defenseConference,
            subTeamBDefenseTeamList: this.props.teamBData.subData.defense.defenseTeamList,
            subTeamBDefense: this.props.teamBData.subData.defense.defense,


            //TempData
            //TeamA
            //Passing
            tempSubTeamAOffensePassingConference: this.props.teamAData.subData.offense.passingConference,
            tempSubTeamAOffensePassingTeamList: this.props.teamAData.subData.offense.passingTeamList,
            tempSubTeamAOffensePassing: this.props.teamAData.subData.offense.passing,
            //Rushing
            tempSubTeamAOffenseRushingConference: this.props.teamAData.subData.offense.rushingConference,
            tempSubTeamAOffenseRushingTeamList: this.props.teamAData.subData.offense.rushingTeamList,
            tempSubTeamAOffenseRushing: this.props.teamAData.subData.offense.rushing,
            //Defense
            tempSubTeamADefenseConference: this.props.teamAData.subData.defense.defenseConference,
            tempSubTeamADefenseTeamList: this.props.teamAData.subData.defense.defenseTeamList,
            tempSubTeamADefense: this.props.teamAData.subData.defense.defense,

            //Team B
            //Passing
            tempSubTeamBOffensePassingConference: this.props.teamBData.subData.offense.passingConference,
            tempSubTeamBOffensePassingTeamList: this.props.teamBData.subData.offense.passingTeamList,
            tempSubTeamBOffensePassing: this.props.teamBData.subData.offense.passing,
            //Rushing
            tempSubTeamBOffenseRushingConference: this.props.teamBData.subData.offense.rushingConference,
            tempSubTeamBOffenseRushingTeamList: this.props.teamBData.subData.offense.rushingTeamList,
            tempSubTeamBOffenseRushing: this.props.teamBData.subData.offense.rushing,
            //Defense
            tempSubTeamBDefenseConference: this.props.teamBData.subData.defense.defenseConference,
            tempSubTeamBDefenseTeamList: this.props.teamBData.subData.defense.defenseTeamList,
            tempSubTeamBDefense: this.props.teamBData.subData.defense.defense

        }


    }

    componentDidMount() {
        if (this.state.conferences === null) {
            this.setConferences()
        }

    }


    setConferences = async () => {
        const conferences = await axios.get('/api/conferences/recent',
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    return (response.data)

                } else {
                    throw new Error(`Status: ${response.status}   Message: ${response.statusText}`)

                }
            })

        Promise
            .all([conferences])
            .then((values) => {

                this.setState({
                    conferences: values[0]
                })
            })
    }


    hideShowSubstitutions = () => {
        this.props.toggleShowSetSubstitutionsAction(0)
        this.props.toggleShowSimulationResultsAction(1)
    }


    updateSubstitutions = (updatedTitle, id, valueObject) => {

        if (id === "teamAConferenceSubstitution") {
            if (updatedTitle === "Passing") {
                this.setState({
                    tempSubTeamAOffensePassingConference: valueObject.teamASubConference,
                    tempSubTeamAOffensePassingTeamList: valueObject.teamATeamOptionList,
                    tempSubTeamAOffensePassing: valueObject.teamASubTeam
                })
            } else if (updatedTitle === "Rushing") {
                this.setState({
                    tempSubTeamAOffenseRushingConference: valueObject.teamASubConference,
                    tempSubTeamAOffenseRushingTeamList: valueObject.teamATeamOptionList,
                    tempSubTeamAOffenseRushing: valueObject.teamASubTeam
                })
            } else if (updatedTitle === "Defense") {
                this.setState({
                    tempSubTeamADefenseConference: valueObject.teamASubConference,
                    tempSubTeamADefenseTeamList: valueObject.teamATeamOptionList,
                    tempSubTeamADefense: valueObject.teamASubTeam
                })
            }
        } else if (id === "teamBConferenceSubstitution") {
            if (updatedTitle === "Passing") {
                this.setState({
                    tempSubTeamBOffensePassingConference: valueObject.teamBSubConference,
                    tempSubTeamBOffensePassingTeamList: valueObject.teamBTeamOptionList,
                    tempSubTeamBOffensePassing: valueObject.teamBSubTeam
                })
            } else if (updatedTitle === "Rushing") {
                this.setState({
                    tempSubTeamBOffenseRushingConference: valueObject.teamBSubConference,
                    tempSubTeamBOffenseRushingTeamList: valueObject.teamBTeamOptionList,
                    tempSubTeamBOffenseRushing: valueObject.teamBSubTeam
                })
            } else if (updatedTitle === "Defense") {
                this.setState({
                    tempSubTeamBDefenseConference: valueObject.teamBSubConference,
                    tempSubTeamBDefenseTeamList: valueObject.teamBTeamOptionList,
                    tempSubTeamBDefense: valueObject.teamBSubTeam
                })
            }
        } else if (id === "teamATeamSub") {
            if (updatedTitle === "Passing") {
                this.setState({
                    tempSubTeamAOffensePassing: valueObject.value
                })
            } else if (updatedTitle === "Rushing") {
                this.setState({
                    tempSubTeamAOffenseRushing: valueObject.value
                })
            } else if (updatedTitle === "Defense") {
                this.setState({
                    tempSubTeamADefense: valueObject.value
                })
            }
        } else if (id === "teamBTeamSub") {
            if (updatedTitle === "Passing") {
                this.setState({
                    tempSubTeamBOffensePassing: valueObject.value
                })
            } else if (updatedTitle === "Rushing") {
                this.setState({
                    tempSubTeamBOffenseRushing: valueObject.value
                })
            } else if (updatedTitle === "Defense") {
                this.setState({
                    tempSubTeamBDefense: valueObject.value
                })
            }
        }
    }

    simulateWithSubstitutions = () => {
        this.props.simulateWithSubstitutions(this.state)

        this.props.toggleShowSetSubstitutionsAction(0)
        this.props.toggleShowSimulationResultsAction(1)

    }


    applicationToReturn = () => {
        if (this.state.conferences === null) {
            return <div style={{ width: '100%', float: 'left', textAlign: 'center', marginTop: '0px', marginBottom: '10px' }}>Loading Substitutions... </div>
        } else {
            return (
                <div style={{ width: '100%', float: 'left' }} >
                    <h1 style={{ width: '100%', float: 'left', textAlign: 'center', marginTop: '0px', marginBottom: '10px' }}>
                        {this.props.componentTitle}
                    </h1>


                    <TeamLogoName />


                    <SubstitutePositions
                        substitionTitle="Passing"
                        //Original Data
                        conferences={this.state.conferences}
                        //Substitution Data
                        subPositionConferenceA={this.state.tempSubTeamAOffensePassingConference}
                        subPositionConferenceB={this.state.tempSubTeamBOffensePassingConference}
                        subPositionTeamA={this.state.tempSubTeamAOffensePassing}
                        subPositionTeamB={this.state.tempSubTeamBOffensePassing}
                        subPositionTeamAList={this.state.tempSubTeamAOffensePassingTeamList}
                        subPositionTeamBList={this.state.tempSubTeamBOffensePassingTeamList}
                        //Substitution Funciton
                        updateSubstitutions={this.updateSubstitutions}
                    />


                    <SubstitutePositions
                        substitionTitle="Rushing"
                        //Original Data
                        conferences={this.state.conferences}
                        //Substitution Data
                        subPositionConferenceA={this.state.tempSubTeamAOffenseRushingConference}
                        subPositionConferenceB={this.state.tempSubTeamBOffenseRushingConference}
                        subPositionTeamA={this.state.tempSubTeamAOffenseRushing}
                        subPositionTeamB={this.state.tempSubTeamBOffenseRushing}
                        subPositionTeamAList={this.state.tempSubTeamAOffenseRushingTeamList}
                        subPositionTeamBList={this.state.tempSubTeamBOffenseRushingTeamList}
                        //Substitution Funciton
                        updateSubstitutions={this.updateSubstitutions}
                    />


                    <SubstitutePositions
                        substitionTitle="Defense"
                        //Original Data
                        conferences={this.state.conferences}
                        //Substitution Data
                        subPositionConferenceA={this.state.tempSubTeamADefenseConference}
                        subPositionConferenceB={this.state.tempSubTeamBDefenseConference}
                        subPositionTeamA={this.state.tempSubTeamADefense}
                        subPositionTeamB={this.state.tempSubTeamBDefense}
                        subPositionTeamAList={this.state.tempSubTeamADefenseTeamList}
                        subPositionTeamBList={this.state.tempSubTeamBDefenseTeamList}
                        //Substitution Funciton
                        updateSubstitutions={this.updateSubstitutions}
                    />


                    <div style={{ marginTop: '20px', width: '100%', float: 'left' }}>
                        <ExecuteButton
                            buttonText={'Cancel Substitutions'}
                            handleEvent={this.hideShowSubstitutions}
                            isCancel={1}
                        />

                        <ExecuteButton
                            buttonText={'Simulate with New Positions'}
                            handleEvent={this.simulateWithSubstitutions}
                            isCancel={0}
                        />

                    </div>

                </div>
            )
        }
    }


    render() {

        return this.applicationToReturn()
    }
}


const MapStateToProps = (state) => {
    return {
        teamAData: state.teamAData,
        teamBData: state.teamBData
    }
}

export default connect(MapStateToProps, { toggleShowSetSubstitutionsAction, toggleShowSimulationResultsAction })(SubstitutionsAll)