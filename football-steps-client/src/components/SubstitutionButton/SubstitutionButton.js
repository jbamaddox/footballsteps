import React, { Component } from 'react';
import './SubstitutionButton.css';


class SubstitutionButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            buttonText: this.props.buttonText
        }

    }

    handleClick = () => {
        this.props.handleClick()
    }

    render() {
        return (
            <button className="substitutionButton" onClick={this.handleClick}>{this.state.buttonText}</button>
        )
    }

}


SubstitutionButton.defaultProps = {
    buttonText: "Substitution"
}

export default SubstitutionButton;