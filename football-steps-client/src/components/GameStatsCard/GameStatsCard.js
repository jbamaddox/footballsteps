import React, { Component } from 'react'

class GameStatsCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teamName: this.props.teamName
        }

    }


    shortenString = (teamNameString) => {
        let teamName = teamNameString

        if (teamNameString.indexOf(" ") !== teamNameString.lastIndexOf(" ")) {
            let teamName = teamNameString

            let firstSpace = teamName.indexOf(" ")
            let secondSpace = teamName.lastIndexOf(" ")

            let newTeamName = teamName.replace(teamName.substring(1, firstSpace + 1), "")
            newTeamName = newTeamName.replace(teamName.substring(firstSpace + 2, secondSpace), "")

            return newTeamName

        } else {
            return teamName

        }


    }


    teamStatsToObject = (teamGameStats) => {
        let teamStatObject = {
            completionAttempts: "0",
            netPassingYards: "0",
            passingTDs: "0",
            rushingAttempts: "0",
            rushingYards: "0",
            rushingTDs: "0",
            interceptions: "0",
            sacks: "0",
            tacklesForLoss: "0",
            defensiveTDs: "0",
            fumblesRecovered: "0",
            kickReturns: "0",
            kickReturnTDs: "0",
            kickReturnYards: "0",
            kickingPoints: "0",
            puntReturns: "0",
            puntReturnYards: "0",
            puntReturnTDs: "0"
        }


        //Set the current teams data into object
        for (let i in teamGameStats) {
            //Offense
            //Passing
            if (teamGameStats[i].stat_category === "completionAttempts") {
                teamStatObject.completionAttempts = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "netPassingYards") {
                teamStatObject.netPassingYards = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "passingTDs") {
                teamStatObject.passingTDs = teamGameStats[i].stat

            }
            //Rushing
            else if (teamGameStats[i].stat_category === "rushingAttempts") {
                teamStatObject.rushingAttempts = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "rushingYards") {
                teamStatObject.rushingYards = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "rushingTDs") {
                teamStatObject.rushingTDs = teamGameStats[i].stat

            }
            //Defense
            else if (teamGameStats[i].stat_category === "interceptions") {
                teamStatObject.interceptions = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "sacks") {
                teamStatObject.sacks = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "tacklesForLoss") {
                teamStatObject.tacklesForLoss = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "defensiveTDs") {
                teamStatObject.defensiveTDs = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "fumblesRecovered") {
                teamStatObject.fumblesRecovered = teamGameStats[i].stat

            }
            //Kicking
            else if (teamGameStats[i].stat_category === "kickReturns") {
                teamStatObject.kickReturns = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "kickReturnTDs") {
                teamStatObject.kickReturnTDs = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "kickReturnYards") {
                teamStatObject.kickReturnYards = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "kickingPoints") {
                teamStatObject.kickingPoints = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "puntReturns") {
                teamStatObject.puntReturns = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "puntReturnYards") {
                teamStatObject.puntReturnYards = teamGameStats[i].stat

            } else if (teamGameStats[i].stat_category === "puntReturnTDs") {
                teamStatObject.puntReturnTDs = teamGameStats[i].stat

            }
        }


        return teamStatObject

    }


    returnGameStatsCard = () => {


        if (
            this.props.teamName === null ||
            this.props.gameStats === null ||
            this.props.currentTeamGameStats === null ||
            this.props.otherTeamGameStats === null ||
            this.props.gameData === null ||
            ((this.props.gameData.home_team !== this.props.teamName & this.props.gameData.away_team !== this.props.teamName))
        ) {
            return (null)
        } else if (this.props.currentTeamGameStats.length === 0 || this.props.otherTeamGameStats.length === 0) {
            if (this.props.currentTeamInfo !== null && this.props.currentTeamInfo !== undefined) {
                return (
                    <div style={{ float: 'left', width: '100%', textAlign: 'center' }} >
                        <br />
                        Data Not Available
                        <br />
                        <img
                            src={this.props.currentTeamInfo.logos[0]}
                            alt={this.props.teamName}
                            style={{ float: 'left', width: '80%', textAlign: 'center', marginLeft: '10%', opacity: .2 }}
                        />
                    </div>
                )

            } else {
                return <div style={{ float: 'left', width: '100%', textAlign: 'center' }} >Data Not Available</div>

            }

        } else {
            //Set Text for TeamVsTeam to keep selected team on left side of component
            let versusText = ""
            let currentTeamScore = null
            let otherTeamScore = null

            const shortHomeTeam = this.shortenString(this.props.gameData.home_team)
            const shortAwayTeam = this.shortenString(this.props.gameData.away_team)

            if (this.props.gameData.home_team === this.props.teamName) {
                versusText = `${shortHomeTeam}  vs  ${shortAwayTeam}`
                currentTeamScore = this.props.gameData.home_points
                otherTeamScore = this.props.gameData.away_points
            } else {
                versusText = `${shortAwayTeam}  at  ${shortHomeTeam}`
                currentTeamScore = this.props.gameData.away_points
                otherTeamScore = this.props.gameData.home_points
            }


            //Put the stats into an object
            const currentTeamStatObject = this.teamStatsToObject(this.props.currentTeamGameStats)
            const otherTeamStatObject = this.teamStatsToObject(this.props.otherTeamGameStats)


            return (
                <div style={{ float: 'left', width: '100%', textAlign: 'center' }}>
                    <br />
                    <table style={{ width: '100%', textAlign: 'center', fontSize: '.85em' }}>
                        <thead style={{ width: '100%', textAlign: 'center' }}>
                            <tr style={{ width: '100%', textAlign: 'center' }}>
                                <td colSpan="2" style={{ float: 'left', width: '100%', textAlign: 'center' }} ><span style={{ fontSize: '1.2em', fontWeight: 'bold', textAlign: 'center', float: 'left', width: '100%' }}>{versusText}</span></td>
                            </tr>
                        </thead>

                        <tbody>
                            {/* Game Info */}
                            <tr style={{ float: 'left', width: '100%', textAlign: 'center' }}>
                                <td colSpan="2" style={{ float: 'left', width: '100%', paddingBottom: '5px', fontSize: '.85em', textAlign: 'center' }}>{this.props.gameData.venue}</td>
                            </tr>

                            {/* Score */}
                            <tr style={{ float: 'left', width: '100%', textAlign: 'center' }}>
                                <td style={{ paddingLeft: '0%', paddingRight: '0%', paddingBottom: '15px', fontSize: '1.25em', fontWeight: 'bold', float: 'left', width: '50%' }}>{currentTeamScore}</td>
                                <td style={{ paddingLeft: '0%', paddingRight: '0%', paddingBottom: '15px', fontSize: '1.25em', fontWeight: 'bold', float: 'left', width: '50%' }}>{otherTeamScore}</td>
                            </tr>


                            {/* Passing */}
                            <tr style={{ float: 'left', width: '100%', paddingTop: '15px', fontWeight: 'bold', textAlign: 'center' }}>
                                <td colSpan="2" style={{ float: 'left', width: '100%', textAlign: 'center' }} >Passing</td>
                            </tr>
                            <tr style={{ float: 'left', width: '100%', textAlign: 'center' }}>
                                <td style={{ paddingRight: '2%', float: 'left', width: '47%', textAlign: 'center' }}>
                                    {currentTeamStatObject.netPassingYards} yds, {currentTeamStatObject.passingTDs} td{parseInt(currentTeamStatObject.passingTDs) > 1 ? "s" : ""}
                                    <br />{currentTeamStatObject.completionAttempts} comp
                                </td>
                                <td style={{ paddingLeft: '2%', float: 'left', width: '47%', textAlign: 'center' }}>
                                    {otherTeamStatObject.netPassingYards} yds, {otherTeamStatObject.passingTDs} td{parseInt(otherTeamStatObject.passingTDs) > 1 ? "s" : ""}
                                    <br />{otherTeamStatObject.completionAttempts} comp
                                </td>


                            </tr>


                            {/* Rushing */}
                            <tr style={{ paddingTop: '15px', fontWeight: 'bold', textAlign: 'center' }}>
                                <td colSpan="2">Rushing</td>

                            </tr>
                            <tr style={{ float: 'left', width: '100%', textAlign: 'center' }}>
                                <td style={{ paddingRight: '2%', float: 'left', width: '47%', textAlign: 'center' }}>
                                    {currentTeamStatObject.rushingYards} yds, {currentTeamStatObject.rushingTDs} td{parseInt(currentTeamStatObject.rushingTDs) > 1 ? "s" : ""}
                                    <br />{currentTeamStatObject.rushingAttempts} attempts

                                </td>
                                <td style={{ paddingLeft: '2%', float: 'left', width: '47%', textAlign: 'center' }}>
                                    {otherTeamStatObject.rushingYards} yds, {otherTeamStatObject.rushingTDs} td{parseInt(otherTeamStatObject.rushingTDs) > 1 ? "s" : ""}
                                    <br />{otherTeamStatObject.rushingAttempts} attempts


                                </td>
                            </tr>


                            {/* Defense */}
                            <tr style={{ paddingTop: '15px', fontWeight: 'bold', textAlign: 'center' }}>
                                <td colSpan="2">Defense</td>
                            </tr>
                            <tr style={{ float: 'left', width: '100%', textAlign: 'center' }}>
                                <td style={{ paddingRight: '2%', float: 'left', width: '47%', textAlign: 'center' }}>
                                    {parseInt(currentTeamStatObject.interceptions) === 1 ?
                                        `${currentTeamStatObject.interceptions} int` : `${currentTeamStatObject.interceptions} ints`}
                                    <br />
                                    {parseInt(currentTeamStatObject.fumblesRecovered) === 1 ?
                                        `${currentTeamStatObject.fumblesRecovered} fumble rec` : `${currentTeamStatObject.fumblesRecovered} fumble rec`}
                                    <br />
                                    {parseInt(currentTeamStatObject.sacks) === 1 ?
                                        `${currentTeamStatObject.sacks} sack` : `${currentTeamStatObject.sacks} sacks`}
                                </td>
                                <td style={{ paddingLeft: '2%', float: 'left', width: '47%', textAlign: 'center' }}>
                                    {parseInt(otherTeamStatObject.interceptions) === 1 ?
                                        `${otherTeamStatObject.interceptions} int` : `${otherTeamStatObject.interceptions} ints`}
                                    <br />
                                    {parseInt(otherTeamStatObject.fumblesRecovered) === 1 ?
                                        `${otherTeamStatObject.fumblesRecovered} fumble rec` : `${otherTeamStatObject.fumblesRecovered} fumble recs`}
                                    <br />
                                    {parseInt(otherTeamStatObject.sacks) === 1 ?
                                        `${otherTeamStatObject.sacks} sack` : `${otherTeamStatObject.sacks} sacks`}
                                </td>
                            </tr>



                            {/* Special Teams */}
                            <tr style={{ paddingTop: '15px', fontWeight: 'bold', textAlign: 'center' }}>
                                <td colSpan="2">Special Teams</td>
                            </tr>
                            <tr style={{ float: 'left', width: '100%', textAlign: 'center' }}>
                                <td style={{ fontSize: '.9em', paddingRight: '2%', float: 'left', width: '47%', textAlign: 'center' }}>
                                    {parseInt(currentTeamStatObject.kickReturns) === 1 ? `${currentTeamStatObject.kickReturns} KRet` : `${currentTeamStatObject.kickReturns} KRet`},
                                    {parseInt(currentTeamStatObject.kickReturnYards) === 1 ? ` ${currentTeamStatObject.kickReturnYards} yrd` : ` ${currentTeamStatObject.kickReturnYards} yds`}
                                    {parseInt(currentTeamStatObject.kickReturnTDs) > 0 ? ` , ${currentTeamStatObject.kickReturnTDs} td` : ``}
                                </td>
                                <td style={{ fontSize: '.9em', paddingLeft: '2%', float: 'left', width: '47%', textAlign: 'center' }}>
                                    {parseInt(otherTeamStatObject.kickReturns) === 1 ? `${otherTeamStatObject.kickReturns} KRet` : `${otherTeamStatObject.kickReturns} KRet`},
                                    {parseInt(otherTeamStatObject.kickReturnYards) === 1 ? ` ${otherTeamStatObject.kickReturnYards} yrd` : ` ${otherTeamStatObject.kickReturnYards} yds`}
                                    {parseInt(otherTeamStatObject.kickReturnTDs) > 0 ? ` , ${otherTeamStatObject.kickReturnTDs} td` : ``}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ fontSize: '.9em', paddingRight: '2%', float: 'left', width: '47%', textAlign: 'center' }}>
                                    {parseInt(currentTeamStatObject.puntReturns) === 1 ? `${currentTeamStatObject.puntReturns} PRet` : `${currentTeamStatObject.puntReturns} PRet`},
                                    {parseInt(currentTeamStatObject.puntReturnYards) === 1 ? ` ${currentTeamStatObject.puntReturnYards} yrd` : ` ${currentTeamStatObject.puntReturnYards} yds`}
                                    {parseInt(currentTeamStatObject.puntReturnTDs) > 0 ? ` , ${currentTeamStatObject.puntReturnTDs} td` : ``}
                                </td>
                                <td style={{ fontSize: '.9em', paddingLeft: '2%', float: 'left', width: '47%', textAlign: 'center' }}>
                                    {parseInt(otherTeamStatObject.puntReturns) === 1 ? `${otherTeamStatObject.puntReturns} PRet` : `${otherTeamStatObject.puntReturns} PRet`},
                                    {parseInt(otherTeamStatObject.puntReturnYards) === 1 ? ` ${otherTeamStatObject.puntReturnYards} yrd` : ` ${otherTeamStatObject.puntReturnYards} yds`}
                                    {parseInt(otherTeamStatObject.puntReturnTDs) > 0 ? ` , ${otherTeamStatObject.puntReturnTDs} td` : ``}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            )
        }

    }

    render() {

        return this.returnGameStatsCard()
    }

}

GameStatsCard.defaultProps = {
    teamName: null,
    gameStats: null,
    currentTeamInfo: null,
    gameData: null,
    currentTeamGameStats: null,
    otherTeamGameStats: null

}

export default GameStatsCard