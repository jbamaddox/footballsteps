import React, { Component } from 'react';
import './MenuButton.css';


class MenuButton extends Component {
    constructor(props) {
        super(props)

        this.state = {}

    }

    toggleMenuBar = () => {
        this.props.toggleMenuBar()
    }

    render() {
        return (
            <button className="menuButton" onClick={this.toggleMenuBar}>&#9776;</button>
        )
    }

}


MenuButton.defaultProps = {
    innerWindowType: "Desktop",
    toggleMenuBar: null
}

export default MenuButton;