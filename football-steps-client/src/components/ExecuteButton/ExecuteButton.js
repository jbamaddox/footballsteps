import React, { Component } from 'react';
import './ExecuteButton.css';


class ExecuteButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            buttonText: this.props.buttonText
        }

    }

    handleEvent = (event) => {
        this.props.handleEvent(event)
    }

    styleSelector = () => {
        let style = {}

        if (this.props.isCancel === null) {
            style = {
                backgroundColor: 'inherit',
                color: 'inherit',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        } else if (this.props.isCancel === 1) {
            style = {
                backgroundColor: 'rgb(200, 0, 0)',
                color: 'rgb(255,255,255)'
            }
        } else if (this.props.isCancel === 0) {
            style = {
                backgroundColor: 'rgb(0, 120, 0)',
                color: 'rgb(255,255,255)'
            }
        }

        return style
    }


    render() {
        return (
            <button className="executeButton"
                onClick={() => this.props.handleEvent()}
                style={this.styleSelector()}
            >{this.state.buttonText}</button>
        )
    }

}


ExecuteButton.defaultProps = {
    buttonText: "Execute",
    isCancel: null
}

export default ExecuteButton;