import React, { Component } from 'react';
import OptionSelection from '../OptionSelection/OptionSelection.js';
import twoWayArrow from './twoWayArrow.png';
import { connect } from 'react-redux';
import axios from 'axios';

class SubstitutePositions extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.teamASubConferenceList = null
        this.teamBSubConferenceList = null
        this.teamATeamOptionList = null
        this.teamBTeamOptionList = null

    }


    componentDidMount() {
    }


    componentDidUpdate() {

    }

    setSubstitution = (event) => {
        if (event.target.id === "teamAConferenceSubstitution" || event.target.id === "teamBConferenceSubstitution") {
            this.getTeamsForConference(event.target.id, event.target.value)

        } else if (event.target.id === "teamATeamSub") {
            this.props.updateSubstitutions(this.props.substitionTitle, event.target.id, { value: event.target.value })

        } else if (event.target.id === "teamBTeamSub") {
            this.props.updateSubstitutions(this.props.substitionTitle, event.target.id, { value: event.target.value })

        }

    }


    getTeamsForConference = async (eventId, conference) => {
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


        Promise
            .all([teams])
            .then((values) => {
                let valueObject = null

                if (eventId === "teamAConferenceSubstitution") {
                    valueObject = {
                        teamASubConference: conference,
                        teamATeamOptionList: values[0],
                        teamASubTeam: null
                    }

                } else if (eventId === "teamBConferenceSubstitution") {
                    valueObject = {
                        teamBSubConference: conference,
                        teamBTeamOptionList: values[0],
                        teamBSubTeam: null
                    }
                }

                this.props.updateSubstitutions(this.props.substitionTitle, eventId, valueObject)


            })

    }



    returnSubstitutionResult = (floatLeftRight, originalTeam, substituteTeam) => {

        let dataToReturn = (
            <div
                className="substitutionResultInfo"
                style={{ width: '50%', textAlign: 'center', float: `${floatLeftRight}`, marginTop: '5px', color: 'rgba(125,125,125,.5)' }}
            >
                No Substitution
            </div>
        )

        if (originalTeam !== null && substituteTeam !== null) {
            dataToReturn = (
                <div className="substitutionResultInfo" style={{ width: '50%', textAlign: 'center', float: `${floatLeftRight}`, marginTop: '10px', fontSize: '.8em' }}>
                    {originalTeam}
                    <img src={twoWayArrow} alt="Two Way Arrow" style={{ width: '.75em', marginTop: '.25em', paddingLeft: '10px', paddingRight: '10px' }} />
                    {substituteTeam}
                </div>
            )
        }

        return dataToReturn
    }


    render() {
        //----------//
        // conference mapping
        if (this.props.conferences !== null || this.props.conferences !== undefined) {
            this.teamASubConferenceList = this.props.conferences.map((element) => {
                return (
                    <option
                        value={element.name}
                        key={element.id}>
                        {element.name}
                    </option>
                )
            })

            this.teamBSubConferenceList = this.props.conferences.map((element) => {
                return (
                    <option
                        value={element.name}
                        key={element.id}>
                        {element.name}
                    </option>
                )
            })

        } else {
            this.teamAConferenceSubstitution = null
            this.teamBConferenceSubstitution = null
        }


        // Team Mapping
        //TeamA
        if (this.props.subPositionTeamAList !== null) {
            this.teamATeamOptionList = this.props.subPositionTeamAList.map((element) => {
                return (
                    <option
                        value={element.school}
                        key={element.id}>
                        {element.school}
                    </option>
                )
            })

        } else {
            this.teamATeamOptionList = null
        }

        //TeamB
        if (this.props.subPositionTeamBList !== null) {
            this.teamBTeamOptionList = this.props.subPositionTeamBList.map((element) => {
                return (
                    <option
                        value={element.school}
                        key={element.id}>
                        {element.school}
                    </option>
                )
            })

        } else {
            this.teamBTeamOptionList = null
        }


        return (

            <div style={{ width: '100%', float: 'left' }} >
                <div style={{ width: '100%', float: 'left', textAlign: 'center', fontSize: '1em', marginTop: '10px', fontWeight: 'bold' }}>
                    {this.props.substitionTitle}
                </div>

                {/* Conferences */}
                <OptionSelection
                    floatLeftRight="left"
                    id="teamAConferenceSubstitution"
                    labelTitle="Conference"
                    selectValue={this.props.subPositionConferenceA}
                    arrayOfOptions={this.teamASubConferenceList}
                    onChangeFunction={this.setSubstitution}

                />

                <OptionSelection
                    floatLeftRight="right"
                    id="teamBConferenceSubstitution"
                    labelTitle="Conference"
                    selectValue={this.props.subPositionConferenceB}
                    arrayOfOptions={this.teamBSubConferenceList}
                    onChangeFunction={this.setSubstitution}

                />


                {/* Team */}
                <OptionSelection
                    floatLeftRight="left"
                    id="teamATeamSub"
                    labelTitle="Team"
                    selectValue={this.props.subPositionTeamA}
                    arrayOfOptions={this.teamATeamOptionList}
                    onChangeFunction={this.setSubstitution}

                />

                <OptionSelection
                    floatLeftRight="right"
                    id="teamBTeamSub"
                    labelTitle="Team"
                    selectValue={this.props.subPositionTeamB}
                    arrayOfOptions={this.teamBTeamOptionList}
                    onChangeFunction={this.setSubstitution}

                />


                <br />
                {this.returnSubstitutionResult("left", this.props.teamAData.school, this.props.subPositionTeamA)}
                {this.returnSubstitutionResult("right", this.props.teamBData.school, this.props.subPositionTeamB)}

            </div>


        )
    }
}

const MapStateToProps = (state) => {
    return {
        teamAData: state.teamAData,
        teamBData: state.teamBData
    }
}

export default connect(MapStateToProps)(SubstitutePositions)