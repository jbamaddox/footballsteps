import React, { Component } from 'react';
//import GoogleAuth from '../GoogleAuth/GoogleAuth.js';
import './LogInOut.css';
import fbButtonLogo from './logo_fb_gold.png';
import { connect } from 'react-redux';
import { setTokenAction, setUserNameAction } from '../../actions/LogInOut_Actions';
import { showLogInOutComponentAction } from '../../actions/Header_Actions';
import axios from 'axios';

class LogInOut extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            username: this.props.username,
            showLogInForm: this.props.token === null ? true : false,
            showCreateAccountForm: false,
            loading: false,
            error: null
        }

        this.logInOutChild = React.createRef()
    }


    componentDidMount() {
        this.logInOutChild.current.addEventListener('load', this.forceUpdate())

    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        window.removeEventListener('load', () => { })
    }

    //Sign In with existing account
    signIntoServer = async (event) => {
        this.setState({ error: null })

        let responseStatus = null
        let token = null

        const user = await axios.post(`/api/users/authenticate`,
            {
                //method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => {
                responseStatus = response.status

                if (response.status === 200) {
                    token = this.setAppToken(response)

                    return response.data
                } else {
                    return response.text()
                }

            }
            )


        Promise
            .all([user])
            .then((values) => {
                if (responseStatus === 200) {
                    this.props.setTokenAction(token)
                    this.props.setUserNameAction(values[0].name)
                    this.props.showLogInOutComponentAction(0)
                    this.setState({ error: null })

                } else {
                    this.setState({ error: values[0] })
                }

            })

    }


    //Create a user account
    createUserAccount = async (event) => {
        event.preventDefault()
        this.setState({ error: null })

        let responseStatus = null
        let token = null

        const user = await axios.post(`/api/users`,
            {
                //method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => {
                responseStatus = response.status

                if (responseStatus === 200) {
                    token = this.setAppToken(response)

                    return response.data
                } else {
                    return response.text()
                }

            });

        Promise
            .all([user])
            .then((values) => {
                if (responseStatus === 200) {

                    this.props.setTokenAction(token)
                    this.props.setUserNameAction(values[0].name)
                    this.props.showLogInOutComponentAction(0)
                    this.setState({ error: null })


                } else {
                    this.setState({ error: values[0] })
                }

            });

    }

    setAppToken = (response) => {
        let token = null
        for (var pair of response.headers.entries()) { // accessing the entries
            if (pair[0] === 'x-auth-token') {
                if (pair[1] !== undefined) {
                    token = pair[1]

                }
            }
        }

        return token
    }



    signUserOut = () => {
        this.props.setTokenAction(null)
        this.props.setUserNameAction(null)
        this.props.showLogInOutComponentAction(0)
    }

    cancel = () => {
        this.props.showLogInOutComponentAction(0)
    }

    returnAccountForm = () => {
        let jsxToReturn = null

        if (this.props.token === null) {
            if (this.state.showLogInForm === true) {
                jsxToReturn = (
                    <div className='logInOutForm'>
                        <br />
                        <div className="logInOutHeader" >Sign In</div>

                        <label id='emailLabel' type='label' >Email: </label><br />
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })} />

                        <br />

                        <label id='passwordLabel' type='label' >Password: </label><br />
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })} />

                        <br />
                        <br />
                        <br />

                        <div className="errorText">{this.state.error}</div>
                        <br />
                        <button
                            className="accountButton"
                            onClick={(event) => {
                                this.signIntoServer(event)
                            }}
                        >Sign In</button>
                        {/*Google Button*/}
                        {/*<GoogleAuth /><br />*/}


                        <br />
                        <div>Dont have an account yet?</div>


                        {/*Create Account Button*/}
                        <button className="accountButton" onClick={() => { this.showCreateAccountForm() }} >
                            <img id="needAccountImage" src={fbButtonLogo} alt="FootballSteps icon" /><div className="accountButtonText" >Create an account</div>
                        </button>

                        {/*Cancel log in */}
                        <button className="accountButton" style={{ marginTop: '20px' }} onClick={() => { this.cancel() }} >
                            <div className="accountButtonText" style={{ fontWeight: 'bold', color: 'rgb(255, 100,100)', marginTop: '0px' }}>Cancel Sign {this.props.token !== null ? `Out` : `In`}</div>
                        </button>

                    </div>

                )//jsxToReturn
            }//END: if (this.state.showLogInForm === true)
            else if (this.state.showCreateAccountForm === true) {
                jsxToReturn = (
                    <div className='logInOutForm'>
                        <div className="logInOutHeader" >Create Account</div>

                        <label id='displayNameLabel' type='label' >Display Name: </label><br />
                        <input
                            type="text"
                            name="email"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })} />
                        <br />

                        <label id='emailLabel' type='label' >Email: </label><br />
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })} />
                        <br />

                        <label id='passwordLabel' type='label' >Password: </label><br />
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })} />
                        <br />
                        <br />
                        <br />

                        <div className="errorText">{this.state.error}</div>

                        {/*Create Account Button*/}
                        <button className="accountButton" onClick={(e) => { this.createUserAccount(e) }} >
                            <div className="accountButtonText" style={{ fontWeight: 'bold', marginTop: '0px' }}>Create new account</div>
                        </button>
                        {/*Google Button*/}
                        {/*<GoogleAuth />*/}

                        {/*Cancel log in */}
                        <button className="accountButton" style={{ marginTop: '20px' }} onClick={() => { this.cancel() }} >
                            <div className="accountButtonText" style={{ fontWeight: 'bold', color: 'rgb(255, 100,100)', marginTop: '0px' }}>Cancel Sign {this.props.token !== null ? `Out` : `In`}</div>
                        </button>

                        <button className="accountButton" onClick={() => { this.showLogInForm() }} >
                            <img id="needAccountImage" src={fbButtonLogo} alt="FootballSteps icon" /><div className="accountButtonText">I have an account</div>
                        </button>


                    </div>

                )//jsxToReturn
            }//END: else if (this.state.showCreateAccountForm === true)

        }//END: if
        else if (this.props.token !== null) {
            jsxToReturn = (
                <div>
                    <br />
                    <h3 style={{ textAlign: 'center' }}>Hello {`${this.props.userName === undefined || this.props.userName === null ? 'Visitor' : this.props.userName}`}</h3>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div>Are you sure you want to sign out?</div>
                    {/* log Out */}
                    <button className="accountButton" style={{ marginTop: '20px' }} onClick={() => { this.signUserOut() }} >
                        <div className="accountButtonText" style={{ fontWeight: 'bold', color: 'rgb(255, 100,100)', marginTop: '0px' }}>Sign Out</div>
                    </button>

                    {/*Cancel log out */}
                    <button className="accountButton" style={{ marginTop: '20px' }} onClick={() => { this.cancel() }} >
                        <div className="accountButtonText" style={{ fontWeight: 'bold', color: 'rgb(255, 100,100)', marginTop: '0px' }}>Cancel Sign {this.props.token !== null ? `Out` : `In`}</div>
                    </button>
                </div>
            )
        } else {
            jsxToReturn = null
        }

        return (jsxToReturn)
    }


    showCreateAccountForm = () => {
        this.setState({
            showLogInForm: false,
            showCreateAccountForm: true
        })
    }

    showLogInForm = () => {
        this.setState({
            showLogInForm: true,
            showCreateAccountForm: false
        })
    }


    render() {
        return (
            <div className='logInOutContainer' >
                <div className='logInOutChild'
                    ref={this.logInOutChild}
                    style={{
                        marginTop: `${this.logInOutChild.current !== null ? ((window.innerHeight - this.logInOutChild.current.clientHeight) / 3) : -window.innerHeight}px`,
                        marginLeft: `${this.logInOutChild.current !== null ? (((window.innerWidth - this.logInOutChild.current.clientWidth) / 2) / window.innerWidth) * 100 : -window.innerWidth}%`
                    }}
                >

                    {/*Form to Sign In Create Account */}
                    {this.returnAccountForm()}

                </div>



            </div>
        )
    }
}

LogInOut.defaultProps = {
    username: '',
    password: '',
    token: null,
    showLogInForm: true,
    showCreateAccountForm: false,
    loading: false
}

const MapStateToProps = (state) => {
    return {
        token: state.token,
        userName: state.userName
    }
}

export default connect(MapStateToProps, { setTokenAction, setUserNameAction, showLogInOutComponentAction })(LogInOut);