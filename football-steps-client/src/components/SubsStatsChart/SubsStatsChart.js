import React, { Component } from 'react';
import SubstitutionButton from '../SubstitutionButton/SubstitutionButton.js';
import './SubsStatsChart.css'
import twoWayArrow from './TwoWayArrow_ezgif.png';
import { connect } from 'react-redux'
import { toggleShowSetSubstitutionsAction, toggleShowSimulationResultsAction } from '../../actions/GameSimulation_Actions'

class SubsStatsChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //Format Properties
            chartHeight: 0,
            pixelsForChartHeight: 200,
            positionSubItemMarginTop: this.props.innerWindowType === "Mobile" ? "5px" : "10px",
            chartContainerMarginTop: this.props.innerWindowType === "Mobile" ? "10px" : "20px",
            boxShadow: this.props.innerWindowType === "Mobile" ? "none" : "0px 6px 18px -2px rgba(125,125,125,.4)",
            //View Properties
            teamAClassButton: "statChartButton_NotSelected",
            positionSubButton: "statChartButton_IsSelected",
            teamBClassButton: "statChartButton_NotSelected",
            statsChartToShow: "positionSubChart",

            //Substitutions
            subTeamAOffensePassing: this.props.teamAData.subData.offense.passing,
            subTeamAOffenseRushing: this.props.teamAData.subData.offense.passing,
            subTeamADefense: this.props.teamAData.subData.defense.defense,
            subTeamBOffensePassing: this.props.teamBData.subData.offense.passing,
            subTeamBOffenseRushing: this.props.teamBData.subData.offense.passing,
            subTeamBDefense: this.props.teamBData.subData.defense.defense

        }

        this.statsChart = React.createRef();

    }

    componentDidMount() {
        this.statsChart.current.addEventListener('load', this.openChart(this.state.pixelsForChartHeight, this.props.componentOrderCSSDelay));

    }

    componentDidUpdate() {
        this.statsChart.current.addEventListener('load', this.openChart(this.state.pixelsForChartHeight, 1));


    }

    componentWillUnmount() {
        this.statsChart.current.removeEventListener('load', () => { })
    }


    //Click handler for general SubstitutionButton component
    handleStatsChartClick = (event) => {
        /*Close chart, then set the selected chart data*/
        if (this.state.statsChartToShow !== event.target.id) {
            this.closeChart(event);
        }

    }


    //Open the chart 0 height
    openChart = async (newHeight, delayMultiplier) => {

        setTimeout(() => {
            if (this.statsChart.current) {
                this.statsChart.current.style.height = `${newHeight}px`
            }

        }, 250 * delayMultiplier)

    }


    closeChart = async (event) => {
        //Close the chart
        this.statsChart.current.style.height = `0px`

        //this.updateChartTab(event.target.id)
        if (event !== null) {
            //Wait a few moments while the chart closes. After, update the state (which will reset the component height)
            setTimeout(() => {
                this.updateChartTab(event.target.id)

            }, 500)
        }

    }


    updateChartTab = (eventID) => {
        if (eventID === "teamAStatsChart") {
            this.setState({
                teamAClassButton: "statChartButton_IsSelected",
                positionSubButton: "statChartButton_NotSelected",
                teamBClassButton: "statChartButton_NotSelected",
                statsChartToShow: "teamAStatsChart"
            });

        } else if (eventID === "positionSubChart") {
            this.setState({
                teamAClassButton: "statChartButton_NotSelected",
                positionSubButton: "statChartButton_IsSelected",
                teamBClassButton: "statChartButton_NotSelected",
                statsChartToShow: "positionSubChart"
            });

        } else if (eventID === "teamBStatsChart") {
            this.setState({
                teamAClassButton: "statChartButton_NotSelected",
                positionSubButton: "statChartButton_NotSelected",
                teamBClassButton: "statChartButton_IsSelected",
                statsChartToShow: "teamBStatsChart"
            });

        }

    }


    //Function to format substitution team information based on the info provided to parameters 
    returnSubstitutions = (subA, subB) => {
        let subInfoToReturn = null
        let teamASubData = null
        let teamBSubData = null


        //If there is a substitiion for teamA, set the html/jsx
        if (subA !== null) {
            teamASubData = (
                <div style={{ width: '40%', float: 'left', }}>
                    {this.props.teamAData.data.school}
                    <img src={twoWayArrow} alt="Arrow" style={{ width: '.75em', marginTop: '.25em', paddingLeft: '10px', paddingRight: '10px' }} />
                    {subA}
                </div>
            )
        } else {
            teamASubData = (<div style={{ width: '50%', float: 'left', color: 'rgba(100,100,100, .35)' }}>No Substitution</div>)
        }


        //If there is a substitiion for teamB, set the html/jsx
        if (subB !== null) {
            teamBSubData = (
                <div style={{ width: '40%', float: 'right' }}>
                    {this.props.teamBData.data.school}
                    <img src={twoWayArrow} alt="Arrow" style={{ width: '.75em', marginTop: '.25em', paddingLeft: '10px', paddingRight: '10px' }} />
                    {subB}
                </div>
            )
        } else {
            teamBSubData = (<div style={{ width: '50%', float: 'right', color: 'rgba(100,100,100, .35)' }}>No Substitution</div>)
        }


        //If there are no substitutions, override the substitution for each individual team
        if (subA === null && subB === null) {
            subInfoToReturn = (<div style={{ color: 'rgba(100,100,100, .75)' }}>No Substitutions</div>)
        } else {
            subInfoToReturn = (
                <div style={{ width: '100%', paddingLeft: '1%', paddingRight: '1%' }}>
                    {teamASubData}{teamBSubData}
                </div>
            )
        }

        return subInfoToReturn

    } //End of returnSubstitutions


    //Send the command up to the parent component to run the resetSubs function
    resetSubs = () => {

        if (
            this.props.teamAData.subData.offense.passing !== null || this.props.teamBData.subData.offense.passing !== null ||
            this.props.teamAData.subData.offense.rushing !== null || this.props.teamBData.subData.offense.rushing !== null ||
            this.props.teamAData.subData.defense.defense !== null || this.props.teamBData.subData.defense.defense !== null
        ) {
            this.props.resetSubs()
        }

    }

    showSetSubstitutions = () => {
        this.props.toggleShowSetSubstitutionsAction(1)
        this.props.toggleShowSimulationResultsAction(0)
    }


    //Buttons/Tabs for Stats or Substitutions chart
    returnStatChartButton = () => {
        if (this.props.teamAData === null || this.props.teamBData === null) {
            return (<div></div>)

        } else {
            return (
                <span>
                    <button className={this.state.teamAClassButton} id="teamAStatsChart" onClick={(event) => { this.handleStatsChartClick(event) }} >{this.props.teamAData.data.school}<br />Statistics</button>
                    <button className={this.state.positionSubButton} id="positionSubChart" onClick={(event) => { this.handleStatsChartClick(event) }} >Position<br />Substitutions</button>
                    <button className={this.state.teamBClassButton} id="teamBStatsChart" onClick={(event) => { this.handleStatsChartClick(event) }} >{this.props.teamBData.data.school}<br />Statistics</button>

                </span>
            )

        }
    }


    //Main information for the Stats and Subs chart
    returnStatsChart = () => {
        let dataToReturn = null

        if (this.state.statsChartToShow === null) {
            dataToReturn = null

        } else if (this.state.statsChartToShow === "positionSubChart") {
            //Position substitutions
            dataToReturn = (
                <div>
                    {/* positionSubChart: Chart for substitutions chart */}
                    <div className="positionSubstitutionChartItem" style={{ marginTop: `${this.state.positionSubItemMarginTop}` }} >
                        <div className="chartItemTitle" >Offensive Passing Subs</div>
                        {this.returnSubstitutions(this.props.teamAData.subData.offense.passing, this.props.teamBData.subData.offense.passing)}
                    </div>

                    <div className="positionSubstitutionChartItem" style={{ marginTop: `${this.state.positionSubItemMarginTop}` }}  >
                        <div className="chartItemTitle" >Offensive Rushing Subs</div>
                        {this.returnSubstitutions(this.props.teamAData.subData.offense.rushing, this.props.teamBData.subData.offense.rushing)}
                    </div>

                    <div className="positionSubstitutionChartItem" style={{ marginTop: `${this.state.positionSubItemMarginTop}` }}  >
                        <div className="chartItemTitle" >Defensive Subs</div>
                        {this.returnSubstitutions(this.props.teamAData.subData.defense.defense, this.props.teamBData.subData.defense.defense)}
                    </div>


                    {/* positionSubChart: Buttons for Setting/Resetting Substitutions */}
                    <div style={{ marginTop: `${this.state.positionSubItemMarginTop}` }}  >
                        <SubstitutionButton
                            buttonText="Reset Subs"
                            handleClick={this.resetSubs} />

                        <SubstitutionButton
                            buttonText="Substitute"
                            handleClick={this.showSetSubstitutions} />

                    </div>

                </div>

            )

        } else if (this.state.statsChartToShow === "teamAStatsChart") {
            //Team A stats chart
            dataToReturn = <div>{this.props.teamAData.data.school}</div>

        } else if (this.state.statsChartToShow === "teamBStatsChart") {
            //Team B stats chart
            dataToReturn = <div>{this.props.teamBData.data.school}</div>

        }


        return (
            <div className="statSelectionChart" ref={this.statsChart} style={{ height: `${this.state.chartHeight}px` }} >
                {dataToReturn}
            </div>
        )

    }  //End of returnStatsChart


    render() {
        return (
            <div className="statSelectionChartContainer" style={{ width: "96%", marginTop: `${this.state.chartContainerMarginTop}`, marginLeft: '2%', marginRight: '2%' }}>
                {/* Chart Tab Headers Buttons */}
                {this.returnStatChartButton()}

                {/* Chart Data To Show */}
                {this.returnStatsChart()}

            </div >
        )
    }

}


SubsStatsChart.defaultProps = {
    innerWindowType: null
}

const MapStateToProps = (state) => {
    return {
        innerWindowType: state.innerWindowType,
        teamAData: state.teamAData === null ? null : state.teamAData,
        teamBData: state.teamBData === null ? null : state.teamBData
    }
}

export default connect(MapStateToProps, { toggleShowSetSubstitutionsAction, toggleShowSimulationResultsAction })(SubsStatsChart);