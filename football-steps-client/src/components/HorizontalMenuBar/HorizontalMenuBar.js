import React, { Component } from 'react';
import './HorizontalMenuBar.css';
import { connect } from 'react-redux'
import { showHideHorizontalMenuBarAction, changeMenuButtonAction } from '../../actions/HorizontalMenuBar_Actions'


class HorizontalMenuBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showHideHorizontalMenuBar: this.props.showHideHorizontalMenuBar,
            menuBarStyle: {
                height: this.props.showHideHorizontalMenuBar === "Open" ? "38px" : "2.5px",
                transition: ".25s",
                zIndex: '1000'
            }
        }

        this.myMenuBarRef = React.createRef();

    }

    componentDidMount() {
        this.updateMenuBar()

    }


    componentDidUpdate() {
        this.updateMenuBar()
    }


    //Determine whether the menu bar should be closed or open
    updateMenuBar = () => {

        if (this.props.showHideHorizontalMenuBar === "Closed" && this.props.showHideHorizontalMenuBar !== this.state.showHideHorizontalMenuBar) {
            setTimeout(() => {
                this.props.showHideHorizontalMenuBarAction("Closed")
                this.setState({ showHideHorizontalMenuBar: "Closed", menuBarStyle: { height: "2.5px", transition: ".25s" } })
            }, 1)
        } else if (this.props.showHideHorizontalMenuBar === "Open" && this.props.showHideHorizontalMenuBar !== this.state.showHideHorizontalMenuBar) {
            setTimeout(() => {
                this.props.showHideHorizontalMenuBarAction("Open")
                this.setState({ showHideHorizontalMenuBar: "Open", menuBarStyle: { height: "38px", transition: ".25s" } })
            }, 1)

        }

    }

    //Create buttons from the this.props "buttons" form the menu bar
    returnButtons = () => {
        if (this.props.buttons !== null) {
            return this.props.buttons.map((buttonElement, index) => {
                return (
                    <button
                        key={index}
                        className={this.props.buttons[index] === this.props.selectedHorizontalMenuButton ? "horizontalMenuBarItemButton_IsSelected" : "horizontalMenuBarItemButton_NotSelected"}
                        id={this.props.buttons[index]}
                        onClick={(event) => { this.props.changeMenuButtonAction(this.props.selectedHorizontalMenuButton, event.target.id) }}
                        style={{ width: `${100 / this.props.buttons.length}%` }}>
                        {this.props.buttons[index]}
                    </button>
                )

            })
        }
    }

    //Generate the menu bar
    returnMenuBar = () => {
        let menuBarToReturn = null

        if (this.props.showHideHorizontalMenuBar === "Closed") {
            menuBarToReturn = <div ></div>

        } else if (this.props.showHideHorizontalMenuBar === "Open") {
            menuBarToReturn = (<span> {this.returnButtons()} </span>)

        }

        return menuBarToReturn

    }


    render() {

        return (
            <div
                className={`horizontalMenuBar_${this.props.innerWindowType}`}
                id="horizontalMenuBarContainer"
                ref={this.myMenuBarRef}
                style={this.state.menuBarStyle}
            >{this.returnMenuBar()}
            </div>
        )

    }

}


HorizontalMenuBar.defaultProps = {
    innerWindowType: "Mobile",
    buttons: []
}

//Redux mapping
const MapStateToProps = (state) => {
    return {
        showHideHorizontalMenuBar: state.showHideHorizontalMenuBar,
        innerWindowType: state.innerWindowType,
        selectedHorizontalMenuButton: state.selectedHorizontalMenuButton
    }
}

export default connect(MapStateToProps, { showHideHorizontalMenuBarAction, changeMenuButtonAction })(HorizontalMenuBar);