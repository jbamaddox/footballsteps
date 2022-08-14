import React, { Component } from 'react';
import axios from 'axios';


class Conferences extends Component {
    constructor(props) {
        super(props)

        this.state = this.props.conferencesState !== null ? this.props.conferencesState : {
            conferences: null,
            currentConference: null
        }
    }

    componentDidMount() {
        //this.loadInitialData()
    }


    componentDidUpdate() {
    }


    componentWillUnmount() {
        this.props.setConferencesState(this.state)
    }


    loadInitialData = async () => {
        if (this.state.conferences === null) {
            try {
                const conferences = await axios.get('/api/conferences/recent',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            return (response.data)

                        } else {
                            throw new Error(`Status: ${response.status}   Message: ${response.statusText}`)

                        }
                    })

                Promise.all([conferences]).then((values) => {
                    this.setState({ conferences: values[0] });

                })


            } catch (error) {
                console.log(error);

            }
        }
    }

    returnShelves = (shelfList, selectedShelf) => {
    }


    applicationToReturn = () => {

        if (this.props.innerWindowType === null || this.state.conferences === null || this.state.conferences === undefined) {
            return <div></div>
        } else {
            return (
                <div>
                    <h1 style={{ textAlign: 'center', marginTop: '0px', marginBottom: '0px' }}>Conferences</h1>

                    {this.returnShelves()}
                </div>


            )
        }


    }


    render() {
        if (this.state.conferences !== null) {
            this.conferences = this.state.conferences.map((element) => {
                return element
            })
        }


        return this.applicationToReturn()
    }
}

export default Conferences;