import React, { Component } from 'react';
import GameCard from '../GameCard/GameCard';
import axios from 'axios';

class GameListCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentTeamName: this.props.teamName,
            currentTeamGameList: null,
            needToClickFirstGame: 0
        }

        this.currentTeamGameListComponents = null

    }

    componentDidMount() {
        this.needNewGameList()

    }

    componentDidUpdate() {
        this.needNewGameList()

        if (this.currentTeamGameListComponents !== null && this.state.needToClickFirstGame === 1) {
            document.getElementById(`${this.currentTeamGameListComponents[0].key}`).click()
            this.setState({ needToClickFirstGame: 0 })
        }
    }


    needNewGameList = () => {

        if (this.state.currentTeamGameList === null || this.props.teamName !== this.state.currentTeamName) {
            this.setGameList(this.props.teamName)
        }
    }


    setGameList = async (teamName) => {
        try {
            const teamGames = await this.getTeamGames(teamName)

            Promise.all([teamGames]).then((values) => {

                this.currentTeamGameListComponents = null

                this.setState({
                    currentTeamName: this.props.teamName,
                    currentTeamGameList: values[0],
                    needToClickFirstGame: 1

                })

            })
        } catch (error) {
            console.log(error);

        }
    }


    getTeamGames = async (teamName) => {
        try {
            const gameInfo = await axios.get(`/api/games/team/${teamName}`,
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
                });


            return gameInfo

        } catch (error) {
            console.log(error);

        }
    }


    //Send the card click to the parent component (GameListStatsCard)
    handleGameCardClick = (teamName, gameData, event) => {
        this.props.handleGameCardClick(teamName, gameData, event)
    }


    //Return list of cards for games
    returnAllGameCards = (team) => {

        if (this.state.currentTeamGameList !== null && this.props.teamName === this.state.currentTeamName) {
            return (
                this.currentTeamGameListComponents = this.state.currentTeamGameList.map((gameElement) => {

                    return (
                        <GameCard
                            key={gameElement.id}
                            teamName={team}
                            currentTeamInfo={this.props.currentTeamInfo}
                            gameData={gameElement}
                            onClick={this.handleGameCardClick}
                            isSelected={gameElement.id === this.props.gameId ? 1 : 0} />
                    )
                })
            )
        } else {
            this.currentTeamGameListComponents = null
        }

        return null
    }


    render() {
        return (
            <div style={{ width: '100%' }}>
                {this.returnAllGameCards(this.props.teamName)}
            </div>
        )

    }

}

GameListCard.defaultProps = {
    teamName: null,
    gameId: null,
    currentTeamInfo: null,
    handleGameCardClick: null

}

export default GameListCard