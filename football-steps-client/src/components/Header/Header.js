import React, { Component } from 'react';
import './Header.css';
import logo from './Logo-fbsteps-goldBlack_optimized_ezgif.png';
import { connect } from 'react-redux';
import { showHideAccountMenuAction, showLogInOutComponentAction } from '../../actions/Header_Actions'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {}

    }


    //Determine whether or not to show the menu button
    toggleMenuButtonClick = () => {

        if (this.props.showHideAccountMenu === 0) {
            this.props.showHideAccountMenuAction(1)
        } else {
            this.props.showHideAccountMenuAction(0)
        }

    }


    //Toggle the log in component & menu button
    showLogInOut = () => {
        this.toggleMenuButtonClick()

        if (this.props.showLogInOutComponent === 0) {
            this.props.showLogInOutComponentAction(1)
        } else {
            this.props.showLogInOutComponentAction(0)
        }

    }


    //User menu
    returnAccountMenu = () => {
        if (this.props.showHideAccountMenu === 1) {
            return (
                <div style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50px',
                    backgroundColor: 'rgb(255,255,255)',
                    transition: 'all',
                    transitionDuration: '.25s',
                    opacity: '1',
                    height: `${this.props.showHideAccountMenu === 0 ? '0px' : '50px'}`,
                    zIndex: '9000',
                }}>
                    <div style={{
                        float: 'right', width: 'max-content', border: 'none', cursor: 'pointer', outline: 'none',
                        boxShadow: '0px 4px 8px 0px rgba(125,125,125, .5)'
                    }}>
                        <button
                            style={{ float: 'right', width: '100%', border: 'none', cursor: 'pointer', outline: 'none', paddingTop: '10px', paddingBottom: '10px' }}
                            onClick={this.showLogInOut}
                        >Sign {this.props.token !== null ? 'Out' : 'In'}</button>
                        <br />
                        <button style={{ float: 'right', width: '100%', border: 'none', cursor: 'pointer', outline: 'none', paddingTop: '10px', paddingBottom: '10px' }}
                        >My Account
                        </button>

                    </div>
                </div>
            )

        } else {
            return null
        }
    }


    render() {
        return (
            <div className="fbStepsHeader">
                <img src={logo} alt="FootballSteps.com logo" height="95%" style={{ float: 'left', marginLeft: '15px' }} />

                {/* Return employee login button
                <div style={{ float: 'right', width: '30px', height: '30px', borderRadius: '30px', backgroundColor: 'rgb(50,50,50)', marginTop: '15px', marginRight: '15px' }}
                    onClick={() => { this.toggleMenuButtonClick() }} />
                    */}

                {/* Account Menu 
                {this.returnAccountMenu()}
                */}

            </div>
        )
    }

}


Header.defaultProps = {
}

const MapStateToProps = (state) => {
    return {
        token: state.token,
        showHideAccountMenu: state.showHideAccountMenu,
        showLogInOutComponent: state.showLogInOutComponent
    }
}

export default connect(MapStateToProps, { showHideAccountMenuAction, showLogInOutComponentAction })(Header);