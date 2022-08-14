import React, { Component } from 'react';
import ExecuteButton from '../ExecuteButton/ExecuteButton.js';
import OptionSelection from '../OptionSelection/OptionSelection.js';
import TeamLogoName from '../TeamLogoName/TeamLogoName.js';
import { connect } from 'react-redux';
import { toggleShowChangeTeamAction, toggleShowSimulationResultsAction } from '../../actions/GameSimulation_Actions';
import axios from 'axios';

class ChangeTeams extends Component {
    constructor(props) {
        super(props)

        this.state = {
            conferences: null,
            teamOptionsConferenceA: null,
            teamOptionsConferenceB: null,
            tempConferenceA: this.props.teamAData.data.conference,
            tempConferenceB: this.props.teamBData.data.conference,
            tempTeamA: this.props.teamAData.data.school,
            tempTeamB: this.props.teamBData.data.school
        }

        //Array of Conferences Output as Select > Options
        this.conferenceOptionsA = []
        this.conferenceOptionsB = []

        //Array of Teams output as Select > Options
        this.teamOptionsConferenceA = []
        this.teamOptionsConferenceB = []

    }

    /**
    //componentDidMount: If no team is set from the props, get the team's data by running loadCurrentConferences
    //loadCurrentConferences: gets conferences from the database
    //Once conferences are set, the list of conferences and teams of selected conferences are mapped and set as option values for OptionSelection component
    //When a new team is set, the state for tempTeamA/tempTeamB are set
    //When the (executing) ExecuteButton button is selected to execute a new simulation, the reducer for simulating a new game is run

    */


    componentDidMount() {
        //If no team is set from the props, get the team's data
        if (this.props.teamAData !== null && this.props.teamBData !== null) {
            this.loadCurrentConferences(this.props.teamAData.data.conference, this.props.teamBData.data.conference)

        }

    }


    //Get conferences from the database
    loadCurrentConferences = async (teamAConference, teamBConference) => {
        //Load the data for both teams and the conferences
        try {
            const conferences = await axios.get('/api/conferences/recent',
                {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then((response) => {
                    if (response.status === 200) {
                        return (response.data)

                    } else {
                        throw new Error(`Status: ${response.status}   Message: ${response.statusText}`)

                    }
                })

            const teamAConferenceTeams = await axios.get(`/api/teams/conference/${teamAConference}`,
                {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then((response) => {
                    if (response.status === 200) {
                        return (response.data)

                    } else {
                        throw new Error(`Status: ${response.status}   Message: ${response.statusText}`)

                    }
                });

            //If the teams are in the same conference, we only need to request for one team's conference.
            //If the teams are in two different conferences, we need to request for both team's conferences
            if (teamAConference === teamBConference) {
                Promise
                    .all([conferences, teamAConferenceTeams])
                    .then((values) => {
                        this.setState({
                            conferences: values[0],
                            teamOptionsConferenceA: values[1],
                            teamOptionsConferenceB: values[1]

                        });

                    })

            } else {
                const teamBConferenceTeams = await axios.get(`/api/teams/conference/${teamBConference}`,
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
                    .all([conferences, teamAConferenceTeams, teamBConferenceTeams])
                    .then((values) => {
                        this.setState({
                            conferences: values[0],
                            teamOptionsConferenceA: values[1],
                            teamOptionsConferenceB: values[2]

                        });

                    })

            }

        } catch (error) {
            console.log(error);

        }

    }   //END OF loadCurrentConferences


    //Click handler for setting the teams when a new conference is selected
    getTeamsForConference = async (event) => {
        const targetValue = event.target.value
        const targetId = event.target.id

        try {
            const teams = await axios.get(`/api/teams/conference/${targetValue}`,
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
                });


            Promise.all([teams]).then((values) => {

                if (targetId === "TeamASelectConference") {
                    this.setState({
                        tempConferenceA: targetValue,
                        teamOptionsConferenceA: values[0],
                        tempTeamA: null
                    })

                } else if (targetId === "TeamBSelectConference") {
                    this.setState({
                        tempConferenceB: targetValue,
                        teamOptionsConferenceB: values[0],
                        tempTeamB: null
                    })
                }

            })

        } catch (error) {
            console.log(error);
        }
    }   //END OF getTeamsForConference()


    //Click handler for when a new team is selected ( but the new simulation has not been run yet) 
    setNewTempTeam = (event) => {
        if (event.target.id === "TeamASelectTeam") {
            this.setState({ tempTeamA: event.target.value })

        } else if (event.target.id === "TeamBSelectTeam") {
            this.setState({ tempTeamB: event.target.value })

        }

    }

    //Return JSX for the new temp teams (before the simulation is run)
    returnNewlySelectedTeams = () => {
        let teamASubstitution = ""
        let teamBSubstitution = ""
        let textColorA = "rgba(0,0,0,1)"
        let textColorB = "rgba(0,0,0,1)"

        //If no team or substitution is set, set the substitution as "No Substitution"
        if (
            this.props.teamAdata === null ||
            this.state.tempTeamA === null ||
            this.state.tempTeamA === this.props.teamAData.data.school
        ) {
            teamASubstitution = "No Substitution"
            textColorA = "rgb(125,125,125,.5)"
        } else {
            teamASubstitution = this.state.tempTeamA
        }


        if (
            this.props.teamBdata === null ||
            this.state.tempTeamB === null ||
            this.state.tempTeamB === this.props.teamBData.data.school
        ) {
            teamBSubstitution = "No Substitution"
            textColorB = "rgba(125,125,125,.5)"
        } else {
            teamBSubstitution = this.state.tempTeamB
        }


        return (
            <div style={{ width: '100%', textAlign: 'center', marginTop: '30px', paddingTop: '0px', float: 'left' }}>

                <p style={{ width: '100%' }}><strong>New Teams</strong></p>

                <div style={{ width: '50%', textAlign: 'center', float: 'left', color: textColorA }}>{teamASubstitution}</div>
                <div style={{ width: '50%', textAlign: 'center', float: 'right', color: textColorB }}>{teamBSubstitution}</div>
            </div>
        )
    }   //END OF returnNewlySelectedTeams() 


    //Click handler for hiding the ChangeTeam component (ExecuteButton)
    hideChangeTeam = () => {
        this.props.toggleShowChangeTeamAction(0)
        this.props.toggleShowSimulationResultsAction(1)
    }


    //Click handler for simulating a new game (ExecuteButton)
    simNewGame = () => {
        if (this.state.tempTeamA !== this.state.tempTeamB) {
            this.props.simNewGame(this.state.tempTeamA, this.state.tempTeamB);

        }
    }

    render() {
        //Afer conferences are loaded, map the conferences to load the Select > Options
        if (this.state.conferences !== null && this.props.teamAData !== null && this.props.teamBData !== null) {

            this.conferenceOptionsA = this.state.conferences.map((element) => {
                return <option
                    value={element.name}
                    key={element.id}
                >{element.name}</option>

            })

            this.conferenceOptionsB = this.state.conferences.map((element) => {
                return <option
                    value={element.name}
                    key={element.id}
                >{element.name}</option>

            })
        }


        //Afer teams from conferences are loaded, map the conferences to load the Select > Options
        if (this.state.teamOptionsConferenceA !== null && this.state.teamOptionsConferenceB !== null) {
            this.teamOptionsConferenceA = this.state.teamOptionsConferenceA.map((element) => {

                return <option
                    value={element.school}
                    key={element.id}
                >{element.school}</option>
            })

            this.teamOptionsConferenceB = this.state.teamOptionsConferenceB.map((element) => {

                return <option
                    value={element.school}
                    key={element.id}
                >{element.school}</option>

            })
        }


        return (
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', float: 'left' }}>
                    <h1 style={{ textAlign: 'center', marginTop: '0px', marginBottom: '20px' }}>Change Teams</h1>
                </div>

                {/* Current Teams */}
                <TeamLogoName />


                {/* Select Conference */}
                <OptionSelection
                    floatLeftRight="left"
                    id="TeamASelectConference"
                    labelTitle="Conference"
                    selectValue={this.state.tempConferenceA}
                    arrayOfOptions={this.conferenceOptionsA}
                    onChangeFunction={this.getTeamsForConference}

                />

                <OptionSelection
                    floatLeftRight="right"
                    id="TeamBSelectConference"
                    labelTitle="Conference"
                    selectValue={this.state.tempConferenceB}
                    arrayOfOptions={this.conferenceOptionsB}
                    onChangeFunction={this.getTeamsForConference}

                />


                {/* Select Teams */}
                <OptionSelection
                    floatLeftRight="left"
                    id="TeamASelectTeam"
                    labelTitle="Team"
                    selectValue={this.state.tempTeamA}
                    arrayOfOptions={this.teamOptionsConferenceA}
                    onChangeFunction={this.setNewTempTeam}

                />

                <OptionSelection
                    floatLeftRight="right"
                    id="TeamBSelectTeam"
                    labelTitle="Team"
                    selectValue={this.state.tempTeamB}
                    arrayOfOptions={this.teamOptionsConferenceB}
                    onChangeFunction={this.setNewTempTeam}

                />


                {/* Show New Teams */}
                {this.returnNewlySelectedTeams()}


                <div style={{ marginTop: '80px', width: '100%', float: 'left' }}>
                    <ExecuteButton
                        buttonText={'Return to Current Game Simulation'}
                        handleEvent={this.hideChangeTeam}
                        isCancel={1}
                    />

                    <ExecuteButton
                        buttonText={'Simulate Game with New Teams'}
                        handleEvent={this.simNewGame}
                        isCancel={0}
                    />

                </div>

            </div>
        )// END OF RENDER()


    }
}

const MapStateToProps = (state) => {
    return {
        teamAData: state.teamAData === null ? null : state.teamAData,
        teamBData: state.teamBData === null ? null : state.teamBData,
        showHideChangeTeamComponent: state.showHideChangeTeamComponent
    }
}

export default connect(MapStateToProps, { toggleShowChangeTeamAction, toggleShowSimulationResultsAction })(ChangeTeams);