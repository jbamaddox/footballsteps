import React, { Component } from 'react'
import './GameCard.css'

class GameCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teamColor: null
        }

    }


    componentDidUpdate() {
        this.setTeamColor()
    }


    setTeamColor = () => {
        if (this.props.isSelected === 1 && this.props.currentTeamInfo !== undefined && this.props.currentTeamInfo !== null) {
            if (this.state.teamColor !== this.props.currentTeamInfo.color) {
                this.setState({
                    teamColor: this.props.currentTeamInfo.color
                })
            }

        } else if (this.props.isSelected === 0 && this.props.currentTeamInfo !== undefined && this.props.currentTeamInfo !== null) {
            if (this.state.teamColor === this.props.currentTeamInfo.color) {
                this.setState({
                    teamColor: 'inherit'
                })
            }

        }

    }


    handleClick = (teamName, gameData, event) => {
        this.props.onClick(teamName, gameData, event)
    }


    returnGameCard = (teamName, gameData) => {

        let winLoss = null

        if (teamName === gameData.home_team && gameData.home_points > gameData.away_points) {
            winLoss = (<span style={{ color: `rgba(0,200,0,${this.props.isSelected === 1 ? '1' : `${this.props.notSelectedOpacity}`})`, fontWeight: 'bold' }}>WIN</span>)

        } else if (teamName === gameData.away_team && gameData.away_points > gameData.home_points) {
            winLoss = (<span style={{ color: `rgba(0,200,0,${this.props.isSelected === 1 ? '1' : `${this.props.notSelectedOpacity}`})`, fontWeight: 'bold' }}>WIN</span>)

        } else if (gameData.away_points === gameData.home_points) {
            winLoss = (<span style={{ color: "inherit", fontWeight: 'bold' }} >TIE</span>)

        } else {
            winLoss = (<span style={{ color: `rgba(200,0,0,${this.props.isSelected === 1 ? '1' : `${this.props.notSelectedOpacity}`})`, fontWeight: 'bold' }}>LOSS</span>)

        }

        if (teamName === null || gameData === null) {
            return null
        } else {
            return (

                < button
                    id={gameData.id}
                    className={this.props.isSelected === 1 ? 'gameCardButton_isSelected' : 'gameCardButton_notSelected'}
                    onClick={(event) => { this.handleClick(teamName, gameData, event) }}
                    style={{ borderColor: this.state.teamColor, color: `${this.props.isSelected === 1 ? 'black' : `rgba(0,0,0, ${this.props.notSelectedOpacity})`}` }}
                >
                    {teamName === gameData.home_team ? `Home vs ${gameData.away_team}` : `Away @ ${gameData.home_team}`}
                    <br />
                    {winLoss} {gameData.home_points} - {gameData.away_points}
                </button >
            )
        }

    }


    render() {
        return this.returnGameCard(this.props.teamName, this.props.gameData)
    }

}

GameCard.defaultProps = {
    teamName: null,
    gameData: null,
    currentTeamInfo: null,
    onClick: null,
    isSelected: null,
    notSelectedOpacity: `.33`

}

export default GameCard