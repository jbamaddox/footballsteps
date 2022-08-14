import React, { Component } from 'react';
import CalculatedBar from '../CalculatedBar/CalculatedBar.js';
import ExecuteButton from '../ExecuteButton/ExecuteButton.js';
import '../ExecuteButton/ExecuteButton.css';
import './ScoreBoard.css';
import { connect } from 'react-redux'
import { toggleShowChangeTeamAction, toggleShowSimulationResultsAction } from '../../actions/GameSimulation_Actions'

class ScoreBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamAGameData: this.props.teamAGameData,
            teamBGameData: this.props.teamBGameData,
            rowMargin: this.props.innerWindowType === "Mobile" ? "5px" : "15px",
            teamNameFontSize: this.props.innerWindowType === "Mobile" ? "1.25em" : "1.5em",
            teamScoreFontSize: this.props.innerWindowType === "Mobile" ? "1.5em" : "1.75em"
        }

    }


    //Build the string to be used for the defensive stats
    setDefensiveString = (defensiveObject) => {
        let defensiveString = ""

        for (const prop in defensiveObject) {
            if (Math.round(defensiveObject[prop]) > 0 && prop === "fumblesRecovered") {
                defensiveString = defensiveString + `f rec: ${Math.round(defensiveObject[prop])}`
            } else if (Math.round(defensiveObject[prop]) > 0 && prop === "interceptions") {
                defensiveString = defensiveString + `  int: ${Math.round(defensiveObject[prop])}`
            } else if (Math.round(defensiveObject[prop]) > 0 && prop === "sacks") {
                defensiveString = defensiveString + `  sack: ${Math.round(defensiveObject[prop])}`
            }
        }

        if (defensiveString === "") {
            defensiveString = "sack: 0 int: 0"
        }

        return (defensiveString)
    }



    scoreBoardToReturn = () => {
        let dataToReturn = null

        if (this.props.innerWindowType === null) {
            dataToReturn = <div></div>
        } else {
            const teamAPassingPointsRounded = Math.round(this.props.teamAGameData.passing.passingPoints / 6);
            const teamBPassingPointsRounded = Math.round(this.props.teamBGameData.passing.passingPoints / 6);
            const teamARushingPointsRounded = Math.round(this.props.teamAGameData.rushing.rushingPoints / 6);
            const teamBRushingPointsRounded = Math.round(this.props.teamBGameData.rushing.rushingPoints / 6);


            dataToReturn =
                <div className={`scoreBoard_` + this.props.innerWindowType} >
                    <table style={{ width: "100%", marginTop: `${this.state.rowMargin}` }}>
                        <thead>
                            {/*Scores*/}
                            <tr>
                                <td colSpan="2">
                                    <div style={{ margin: "auto", textAlign: "center", fontSize: `${this.state.teamScoreFontSize}` }}
                                    ><strong>{Math.round(this.props.teamAGameData.points)}</strong>
                                    </div>
                                </td>
                                <td colSpan="2">
                                    <div style={{ margin: "auto", textAlign: "center", fontSize: `${this.state.teamScoreFontSize}` }}
                                    ><strong>{Math.round(this.props.teamBGameData.points)}</strong>
                                    </div>
                                </td>
                            </tr>


                        </thead>

                        {/* Button to change teams */}
                        <tbody>
                            <tr>
                                <td colSpan="4">
                                    <div style={{ textAlign: "center", width: '40%', marginLeft: '30%' }} >
                                        <ExecuteButton
                                            buttonText={'Change Teams'}
                                            handleEvent={() => {
                                                this.props.toggleShowChangeTeamAction(1)
                                                this.props.toggleShowSimulationResultsAction(0)
                                            }}
                                            isCancel={null}
                                        />
                                    </div>

                                </td>
                            </tr>


                            {/*Total Yards*/}
                            <tr>
                                <td colSpan="4">
                                    <div style={{ fontSize: "1em", textAlign: "center", marginTop: `${this.state.rowMargin}` }}>Total Yards</div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" style={{ width: "100%" }}>
                                    <div className="calculatedTeamDataOuter" ><strong>{Math.round(this.props.teamAGameData.passing.passingYards + this.props.teamAGameData.rushing.rushingYards)}</strong>  yards</div>
                                    <div className="calculatedTeamDataInner" >
                                        <CalculatedBar
                                            dataA={Math.round(this.props.teamAGameData.passing.passingYards + this.props.teamAGameData.rushing.rushingYards)}
                                            dataB={Math.round(this.props.teamBGameData.passing.passingYards + this.props.teamBGameData.rushing.rushingYards)}
                                            dataAColor={this.props.teamAData.data.color}
                                            dataBColor={this.props.teamBData.data.color}
                                            componentOrderCSSDelay={0} />
                                    </div>
                                    <div className="calculatedTeamDataOuter" ><strong>{Math.round(this.props.teamBGameData.passing.passingYards + this.props.teamBGameData.rushing.rushingYards)}</strong>  yards</div>
                                </td>
                            </tr>


                            {/*Passing Yards*/}
                            <tr>
                                <td colSpan="4">
                                    <div style={{ fontSize: "1em", textAlign: "center", marginTop: `${this.state.rowMargin}` }}>Passing</div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" style={{ width: "100%" }}>
                                    <div className="calculatedTeamDataOuter" ><strong>{Math.round(this.props.teamAGameData.passing.passingYards)}</strong> yds <strong>{teamAPassingPointsRounded}</strong>{` td${teamAPassingPointsRounded > 1 ? 's' : ''}`}</div>
                                    <div className="calculatedTeamDataInner" >
                                        <CalculatedBar
                                            dataA={Math.round(this.props.teamAGameData.passing.passingYards)}
                                            dataB={Math.round(this.props.teamBGameData.passing.passingYards)}
                                            dataAColor={this.props.teamAData.data.color}
                                            dataBColor={this.props.teamBData.data.color}
                                            componentOrderCSSDelay={1} />
                                    </div>
                                    <div className="calculatedTeamDataOuter" ><strong>{Math.round(this.props.teamBGameData.passing.passingYards)}</strong> yds <strong>{teamBPassingPointsRounded}</strong>{` td${teamBPassingPointsRounded > 1 ? 's' : ''}`}</div>
                                </td>
                            </tr>


                            {/*Rushing Yards*/}
                            <tr>
                                <td colSpan="4">
                                    <div style={{ fontSize: "1em", textAlign: "center", marginTop: `${this.state.rowMargin}` }}>Rushing</div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" style={{ width: "100%" }}>
                                    <div className="calculatedTeamDataOuter" ><strong>{Math.round(this.props.teamAGameData.rushing.rushingYards)}</strong> yds <strong>{teamARushingPointsRounded}</strong>{` td${teamARushingPointsRounded > 1 ? 's' : ''}`}</div>
                                    <div className="calculatedTeamDataInner" >
                                        <CalculatedBar
                                            dataA={Math.round(this.props.teamAGameData.rushing.rushingYards)}
                                            dataB={Math.round(this.props.teamBGameData.rushing.rushingYards)}
                                            dataAColor={this.props.teamAData.data.color}
                                            dataBColor={this.props.teamBData.data.color}
                                            componentOrderCSSDelay={2} />
                                    </div>
                                    <div className="calculatedTeamDataOuter" ><strong>{Math.round(this.props.teamBGameData.rushing.rushingYards)}</strong> yds <strong>{teamBRushingPointsRounded}</strong>{` td${teamBRushingPointsRounded > 1 ? 's' : ''}`}</div>
                                </td>
                            </tr>


                            {/*Defense*/}
                            <tr>
                                <td colSpan="4" >
                                    <div style={{ fontSize: "1em", textAlign: "center", marginTop: `${this.state.rowMargin}` }}>Defense</div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style={{ width: "50%" }}>
                                    <div style={{ fontSize: ".9em", width: "85%", float: "right", textAlign: "right", paddingRight: "15%" }}>{this.setDefensiveString(this.props.teamAGameData.defense)}</div>
                                </td>
                                <td style={{ width: "50%" }}>
                                    <div style={{ fontSize: ".9em", width: "85%", float: "left", textAlign: "left", paddingLeft: "15%" }}>{this.setDefensiveString(this.props.teamBGameData.defense)}</div>
                                </td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>


                </div >
        }

        return dataToReturn
    }


    render() {
        if (
            this.props.teamAData === null ||
            this.props.teamBData === null ||
            this.props.teamAGameData === null ||
            this.props.teamBGameData === null) {
            return <div></div>
        }
        else {
            return (this.scoreBoardToReturn())
        }

    }

}


const MapStateToProps = (state) => {
    return {
        innerWindowType: state.innerWindowType,
        teamAData: state.teamAData === null ? null : state.teamAData,
        teamBData: state.teamBData === null ? null : state.teamBData,
        teamAGameData: state.teamAData === null ? null : state.teamAData.gameData,
        teamBGameData: state.teamBData === null ? null : state.teamBData.gameData,
        showHideChangeTeamComponent: state.showHideChangeTeamComponent
    }
}

export default connect(MapStateToProps, { toggleShowChangeTeamAction, toggleShowSimulationResultsAction })(ScoreBoard);