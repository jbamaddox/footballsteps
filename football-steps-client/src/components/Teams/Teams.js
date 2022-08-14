import React, { Component } from 'react';
import GameListStatsCard from '../GameListStatsCard/GameListStatsCard.js';
import OptionSelection from '../OptionSelection/OptionSelection.js';
import TeamNameBanner from '../TeamNameBanner/TeamNameBanner.js';
import './Teams.css';
import { connect } from 'react-redux';
import axios from 'axios';

class Teams extends Component {
    constructor(props) {
        super(props)

        this.state = this.props.teamsState !== null ? this.props.teamsState : {
            conferences: null,
            currentConference: null,
            tempConference: null,
            teams: null,
            currentTeam: null,
            tempTeam: null,
            currentTeamInfo: null,
            cardContainerPadding: null
        }

        this.conferencesOptions = null
        this.teamOptions = null

        this.cardContainer = React.createRef()
        this.gameListStatsCard = React.createRef()
    }

    componentDidMount() {
        this.setConferenceList()
    }

    componentDidUpdate() {
        this.setConferenceList()
    }

    componentWillUnmount() {
        this.props.setTeamsState("Teams", this.state)
    }


    setConferenceList = async () => {
        try {
            if (this.state.conferences === null) {

                const conferences = await this.getRecentConference()

                Promise.all([conferences]).then((values) => {
                    this.setState({ conferences: values[0] });
                })

            }

        } catch (error) {
            console.log(error);

        }

    }

    //Get the list of conferences used in the last 2 years
    getRecentConference = async () => {

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

            return conferences

        } catch (error) {
            console.log(error);

        }

    }


    getTeamsFromConference = async (conference) => {
        try {
            const teams = await axios.get(`/api/teams/conference/${conference}`,
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

            return teams

        } catch (error) {
            console.log(error);

        }
    }


    getTeamInfo = async (teamName) => {
        try {
            const teamInfo = await axios.get(`/api/teams/${teamName}`,
                {
                    mode: 'cors',
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

            console.log(teamInfo)

            return teamInfo

        } catch (error) {
            console.log(error);

        }
    }


    //Default event/button handler for OptionSelection
    setOptionState = async (event) => {
        const eventId = event.target.id
        const eventValue = event.target.value


        if (eventId === 'Conferences') {
            try {
                const teams = await this.getTeamsFromConference(eventValue)

                Promise.all([teams]).then((values) => {
                    this.setState({
                        tempConference: eventValue,
                        teams: values[0],
                        tempTeam: null
                    });

                })

            } catch (error) {
                console.log(error);

            }

        } else if (eventId === 'Teams') {

            try {
                const teamInformation = await this.getTeamInfo(eventValue)

                Promise.all([teamInformation])
                    .then((values) => {
                        console.log(values[0])

                        this.setState({
                            currentConference: this.state.tempConference,
                            currentTeam: eventValue,
                            tempTeam: eventValue,
                            currentTeamInfo: values[0]

                        })

                    })

            } catch (error) {
                console.log(error);

            }

        }
    }



    applicationToReturn = () => {
        return (
            <div style={{ float: 'left', width: '100%' }}>
                {/* Title Card with drop downs for Conferences and Teams */}
                <div style={{ float: 'left', width: '100%', boxShadow: '0px 8px 8px  rgba(200,200,200,1)', paddingBottom: '5px' }}>
                    {/* Conference List/DropDown */}
                    <OptionSelection
                        floatLeftRight='left'
                        id='Conferences'
                        labelTitle='Conferences'
                        selectValue={this.state.tempConference || this.state.currentConference}
                        arrayOfOptions={this.conferencesOptions}
                        onChangeFunction={this.setOptionState}
                    />

                    {/* Team List/DropDown */}
                    <OptionSelection
                        floatLeftRight='right'
                        id='Teams'
                        labelTitle='Teams'
                        selectValue={this.state.tempTeam || this.state.currentTeam}
                        arrayOfOptions={this.teamOptions}
                        onChangeFunction={this.setOptionState}
                    />


                    {/* Team Logo, Name, and conference (division) */}
                    <TeamNameBanner
                        teamInfo={this.state.currentTeamInfo}
                    />
                </div>


                {/* Listing of Games and Stats */}
                <div
                    className="teamCardContainer"
                    ref={this.cardContainer}
                    style={{
                        float: 'left',
                        width: '100%',
                        minHeight: `${window.innerHeight}px`,
                        borderTopColor: `${this.state.currentTeamInfo !== null ? this.state.currentTeamInfo.alt_color : 'inherit'}`,
                        borderBottomColor: `${this.state.currentTeamInfo !== null ? this.state.currentTeamInfo.alt_color : 'inherit'}`
                    }}>

                    <GameListStatsCard
                        teamName={this.state.currentTeam || null}
                        currentTeamInfo={this.state.currentTeamInfo}
                    />
                </div>

            </div>
        )

    }

    render() {

        if (this.state.conferences !== null && this.state.conferences !== undefined) {
            this.conferencesOptions = this.state.conferences.map((element) => {
                return (
                    <option id={element.id} key={element.id} value={element.name} >{element.name}</option>
                )
            })
        }

        if (this.state.teams !== null && this.state.teams !== undefined) {
            this.teamOptions = this.state.teams.map((element) => {
                return (
                    <option id={element.id} key={element.id} value={element.school} >{element.school}</option>
                )
            })
        }


        return this.applicationToReturn()
    }

}

Teams.defaultProps = {
    innerWindowType: null,
    teamsState: null,
    setTeamsState: null,

}

const MapStateToProps = (state) => {
    return {
        innerWindowType: state.innerWindowType
    }
}

export default connect(MapStateToProps)(Teams)