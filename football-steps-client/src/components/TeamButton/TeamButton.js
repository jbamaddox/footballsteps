import React, { Component } from 'react';
import './TeamButton.css';
import drowDownArrow from './dropDownArrow.png';


class TeamButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teamData: this.props.teamData,
            buttonStyle: {
                float: this.props.buttonPosition,
                marginLeft: this.props.buttonPosition === "left" ? "5%" : "0%",
                marginRight: this.props.buttonPosition === "left" ? "0%" : "5%"
            },
            imageStyle: {
                float: this.props.buttonPosition,
                paddingLeft: this.props.buttonPosition === "left" ? "5%" : "0%",
                paddingRight: this.props.buttonPosition === "left" ? "0%" : "5%"
            },
            dropDownArrowStyle: {
                float: this.props.buttonPosition === "left" ? "left" : "right",
                paddingLeft: this.props.buttonPosition === "left" ? "15px" : "0%",
                paddingRight: this.props.buttonPosition === "left" ? "0%" : "15px"
            },
            userDeviceStyle: this.props.innerWindowType
        }


        this.deviceStyleValue = window.innerWidth
    }

    hangleEvent = () => {
        this.props.hangleEvent(this.props.id)
    }

    render() {
        if (this.props.teamLogoURL === null) {
            return <div> </div>
        } else {

            return (
                <button
                    className={`teamButton_${this.state.userDeviceStyle}`}
                    style={this.state.buttonStyle}
                    onClick={this.hangleEvent}
                    id={this.props.id}
                >
                    <div>
                        <img
                            className={`teamImage_${this.state.userDeviceStyle}`}
                            src={this.props.teamLogoURL}
                            alt={`teamImage_${this.state.userDeviceStyle}`}
                        />
                        <img
                            className={`dropDwonArrow_${this.state.userDeviceStyle}`}
                            src={drowDownArrow}
                            alt="dropDownArrow"
                            style={this.state.dropDownArrowStyle}
                        />
                    </div>


                </button>
            )
        }
    }

}


TeamButton.defaultProps = {
    buttonPosition: "left"
}

export default TeamButton;