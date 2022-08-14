import React, { Component } from 'react';


class TeamNameBanner extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    returnTeamBanner = (currentTeamInfo) => {
        if (currentTeamInfo !== null) {
            return (
                <div style={{ float: 'left', width: '100%', marginTop: '15px' }}>
                    <div
                        style={{
                            float: 'left',
                            marginLeft: '10px',
                            marginBottom: '5px',
                            marginTop: '0px',
                            width: '80px',
                            height: '80px',
                            borderRadius: '80px',
                            backgroundColor: currentTeamInfo.alt_color,
                            boxShadow: `0px 8px 16px rgba(125,125,125,1)`
                        }}
                    >
                        <img src={currentTeamInfo.logos[0]} alt={`${this.state.currentTeam} logo`} width="80px" style={{}} />
                    </div>

                    <div style={{ float: 'left', marginLeft: '15px' }} >
                        <p>
                            <span style={{ fontWeight: 'bold', fontSize: '1.15em' }}>{currentTeamInfo.school}</span> {currentTeamInfo.mascot}
                            <br />
                            <span style={{ fontSize: '.80em' }}>
                                {currentTeamInfo.conference} Conference{(currentTeamInfo.division !== "" ? `  |  ${currentTeamInfo.division} Division` : null)}
                            </span>
                        </p>

                    </div>

                </div>
            )

        } else {
            return null

        }
    }

    render() {
        return this.returnTeamBanner(this.props.teamInfo)
    }
}

TeamNameBanner.defaultProps = {
    teamInfo: null
}

export default TeamNameBanner;