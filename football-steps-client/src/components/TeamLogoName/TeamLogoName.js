import React, { Component } from 'react';
import { connect } from 'react-redux'

class TeamLogoName extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }


    returnTeamLogoName = () => {

        if (this.props.teamAData === null && this.props.teamBData === null) {
            return <div style={{ width: '100%', float: 'left' }}><h3 style={{ textAlign: 'center', marginTop: '0px' }}>Loading Teams...</h3></div>
        } else {
            return (
                <div style={{ width: '100%', float: 'left' }}>
                    <div style={{ width: '50%', float: 'left', textAlign: 'center' }}>
                        <img src={this.props.teamAData.logos[0]} alt={`${this.props.teamAData.school}`} height='50px' />
                        <h3 style={{ marginTop: '0px', marginBottom: '0px' }}>{this.props.teamAData.school}</h3>
                    </div>

                    <div style={{ width: '50%', float: 'right', textAlign: 'center' }}>
                        <img src={this.props.teamBData.logos[0]} alt={`${this.props.teamBData.school}`} height='50px' />
                        <h3 style={{ marginTop: '0px', marginBottom: '0px' }}>{this.props.teamBData.school}</h3>
                    </div>
                </div>
            )
        }
    }

    render() {

        return (this.returnTeamLogoName())
    }
}

const MapStateToProps = (state) => {
    return {
        teamAData: state.teamAData === null ? null : state.teamAData.data,
        teamBData: state.teamBData === null ? null : state.teamBData.data
    }
}

export default connect(MapStateToProps)(TeamLogoName)