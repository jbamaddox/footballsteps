import React, { Component } from 'react'
import GameListCard from "../GameListCard/GameListCard.js";
import GameStatsCard from '../GameStatsCard/GameStatsCard.js';
import axios from 'axios';

class GameListStatsCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teamName: this.props.teamName,
            currentTeamInfo: this.props.currentTeamInfo,
            gameId: null,
            gameData: null,
            gameStats: null,
            currentTeamGameStats: null,
            otherTeamGameStats: null

        }
    }


    //Click handler for GameListCard buttons (list of games that, when clicked, update/show that game's data in the GameStatsCard)
    handleGameCardClick = (teamName, gameData, event) => {
        if (this.state.gameId !== gameData.id) {
            this.setGameStats(teamName, gameData.id, gameData)
        }

    }


    //Update what game stats are currently being shown to the user
    setGameStats = async (currentTeam, gameId, gameData) => {
        try {

            const gameStats = await this.getGameStats(gameId)

            Promise.all([gameStats]).then((values) => {

                let currentTeamGameStats = []
                let otherTeamGameStats = []

                let stats = values[0]

                for (const item in stats) {
                    if (stats[item].school === currentTeam) {
                        currentTeamGameStats.push(stats[item])
                    } else {
                        otherTeamGameStats.push(stats[item])
                    }

                }

                this.setState({
                    teamName: currentTeam,
                    gameStats: values[0],
                    gameId: gameId,
                    gameData: gameData,
                    currentTeamGameStats: currentTeamGameStats,
                    otherTeamGameStats: otherTeamGameStats

                })

            });

        } catch (error) {
            console.log(error);

        }
    }


    getGameStats = async (gameId) => {
        try {

            const gameStats = await axios.get(`/api/stats/gameid/${gameId}`,
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


            return gameStats

        } catch (error) {
            console.log(error);

        }

    }


    //JSX to be returned to the user
    returnListStats = () => {
        if (this.props.teamName !== null) {

            return (
                <div style={{ float: 'left' }}>
                    {/* List of Games  */}
                    <div style={{ float: 'left', width: '40%' }}>
                        <GameListCard
                            teamName={this.props.teamName}
                            gameId={this.state.gameId}
                            currentTeamInfo={this.props.currentTeamInfo}
                            handleGameCardClick={this.handleGameCardClick} />
                    </div>

                    {/* Stats for Selected Game */}
                    <div style={{ float: 'left', width: '60%' }}>
                        <GameStatsCard
                            teamName={this.props.teamName}
                            gameStats={this.state.gameStats}
                            currentTeamInfo={this.props.currentTeamInfo}
                            gameData={this.state.gameData}
                            currentTeamGameStats={this.state.currentTeamGameStats}
                            otherTeamGameStats={this.state.otherTeamGameStats}
                        />
                    </div>

                </div>
            )
        } else {
            return null
        }
    }


    render() {
        return (this.returnListStats())
    }
}


GameListStatsCard.defaultProps = {
    teamName: null,
    gameId: null,
    currentTeamInfo: null,
    handleGameCardClick: null,
}

export default GameListStatsCard
