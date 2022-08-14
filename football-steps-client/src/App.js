import React, { Component } from 'react';
import Header from './components/Header/Header.js';
import HorizontalMenuBar from './components/HorizontalMenuBar/HorizontalMenuBar.js';
import AppBody from './components/AppBody/AppBody.js'
import LogInOut from './components/LogInOut/LogInOut.js';
import { connect } from 'react-redux'
import { setInnerWindowTypeAction } from './actions'
import { setTokenAction, setUserNameAction } from './actions/LogInOut_Actions'

class App extends Component {
  constructor(props) {
    super(props)

    this.appReference = React.createRef()

  }

  componentDidMount() {
    this.resetAppWindow(null)

  }

  componentDidUpdate() {
    this.resetAppWindow(this.props.innerWindowType)
  }

  componentWillUnmount() {
  }


  //Set the window width for manual CSS setting
  resetAppWindow = (currentInnerWindowtype) => {
    const heightReference = this.appReference.current.parentElement.clientHeight === 0 ? this.appReference.current.parentElement.clientWidth : this.appReference.current.parentElement.clientHeight
    const widthReference = this.appReference.current.parentElement.clientWidth

    const lengthReference = widthReference <= heightReference ? widthReference : heightReference

    this.props.setInnerWindowTypeAction(currentInnerWindowtype, lengthReference)

  }


  //Determine if the log in component should be shown or not
  showLoginComponent = () => {
    if (this.props.showLogInOutComponent === 1) {
      return (
        <LogInOut
          isLoggedIn={this.state.isLoggedIn}
          username={this.state.username}
          updateSignInStatus={this.updateSignInStatus}

        />
      )

    } else {
      return null
    }

  }


  //Return the main application JSX
  applicationToReturn = () => {

    if (this.props.innerWindowType === null) {
      return <div></div>
    }

    return (
      <div ref={this.appReference} >
        {/* 
        Determine if the log in screen should be shown 
        {this.showLoginComponent()}
        */}

        <Header />

        <AppBody />

        <HorizontalMenuBar buttons={["Home", "Simulations", "Teams"]} />

      </div>

    )

  }

  render() {
    return (this.applicationToReturn())

  }

}

const MapStateToProps = (state) => {
  return {
    innerWindowType: state.innerWindowType,
    token: state.token,
    showLogInOutComponent: state.showLogInOutComponent

  }
}

export default connect(MapStateToProps, { setInnerWindowTypeAction, setTokenAction, setUserNameAction })(App);
