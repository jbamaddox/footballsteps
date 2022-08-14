import React, { Component } from 'react';
import './TeamBanner.css';
import imageIcon from './purdue.png';


class TeamBanner extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div>
                <div >
                    <img src={imageIcon} alt="teamImage" className="teamImage" style={{ float: "left" }} />
                </div>

                <div >
                    <img src={imageIcon} alt="teamImage" className="teamImage" style={{ float: "right" }} />
                </div>

            </div>
        )
    }
}

TeamBanner.defaultProps = {
}

export default TeamBanner;