import React, { Component } from 'react';
import './CalculatedBar.css';

class CalculatedBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataA: this.props.dataA,
            dataB: this.props.dataB,
            dataAColor: this.props.dataAColor,
            dataBColor: this.props.dataBColor,
            innerBarFloat: "left",
            innerBarColor: "white",
            innerBarStyleIsLoaded: false,
            innerBarStyle: {
                width: "0%",
                float: "left",
                backgroundColor: "rgb(125,125,125)",
                transition: "all 2s",
                height: "100%",
                transitionDuration: "1s"
            }
        }

        this.outerBarRef = React.createRef();

    }

    componentDidMount() {
        this.outerBarRef.current.addEventListener('load', this.calculateBarData())

    }

    componentWillUnmount() {
        window.removeEventListener('load', () => { })
    }

    //Update the CSS of the inner bar to 
    calculateBarData = () => {

        let totalData = null;
        totalData = this.props.dataA + this.props.dataB;

        let localInnerBarFloat = "left";
        let localInnerWidthPercentage = 0;
        let localInnerBarColor = "white"


        if (this.props.dataA >= this.props.dataB) {
            localInnerBarFloat = "left"
            localInnerBarColor = this.props.dataAColor
            localInnerWidthPercentage = this.props.dataA / totalData * 100
        } else {
            localInnerBarFloat = "right"
            localInnerBarColor = this.props.dataBColor
            localInnerWidthPercentage = this.props.dataB / totalData * 100
        }

        //After setting variables, delay the state update by just a moment so everything does not look instantaneous
        setTimeout(() => {
            this.setState({
                innerBarFloat: localInnerBarFloat,
                innerWidthPercentage: localInnerWidthPercentage,
                innerBarColor: localInnerBarColor,
                innerBarStyleIsLoaded: true,
                innerBarStyle: {
                    float: localInnerBarFloat,
                    width: `${Math.round(localInnerWidthPercentage).toString()}%`,
                    backgroundColor: localInnerBarColor,
                    transition: "all 2s",
                    height: "100%",
                    transitionDuration: "2s"
                }
            })
        },
            150 * this.props.componentOrderCSSDelay)
    }


    JSXtoReturn = () => {
        return (
            <div className="calculatedBarOutter" ref={this.outerBarRef}>
                <div className="calculatedBarInner" style={this.state.innerBarStyle} ></div>
            </div>
        )
    }


    render() {
        return (this.JSXtoReturn())
    }

}

export default CalculatedBar;
