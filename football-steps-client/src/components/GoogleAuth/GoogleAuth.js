import React, { Component } from 'react'
import './GoogleAuth.css'


class GoogleAuth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isSignedIn: null
        }


        this.auth = null
    }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '949207624150-6gjin90e1q8heonndcao8dv065rlkht7.apps.googleusercontent.com',
                scope: 'email profile'
            })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance()
                    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                    this.auth.isSignedIn.listen(this.onAuthChange)
                })
                .then(this.renderButton)
        })

    }

    onAuthChange = () => {
        //console.log('auth change')
        console.log('make window dissapear')
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })

    }

    onSignInOut = () => {
        if (this.state.isSignedIn) {
            this.auth.signOut()
            this.auth.disconnect()

        } else (
            this.auth.signIn()

        )

    }

    onSuccess = (googleUser) => {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
        console.log(this.state.isSignedIn)

    }

    onFailure = (error) => {
        console.log(error);
    }

    renderButton = () => {
        window.gapi.signin2.render('my-signin2',
            {
                'scope': 'profile email',
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'light',
                'onsuccess': this.onSuccess,
                'onfailure': this.onFailure
            }
        );

    }

    returnAuthButton = () => {

        if (this.state.isSignedIn === null) {
            return null
        } else {
            return (<div id="my-signin2"  ></div>
            )
        }

    }


    render() {
        return (this.returnAuthButton())
    }
}

export default GoogleAuth