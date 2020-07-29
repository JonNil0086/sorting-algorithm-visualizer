/* ***********************************************************************
 * visualizer.js
 * -----------------------------------------------------------------------
 * This component is responsible for rendering the visual display of the
 * sorting algorithms.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import React from 'react';
import { connect } from 'react-redux';

import './visualizer.css';
import { AnimationState } from '../../helpers/animator';
import { ArrayType } from '../../helpers/arrayGenerator';

// Constant default colors
const COLOR_DEFAULT     = "rgb(128, 229, 255)";
const COLOR_SELECTED    = "rgb(255, 51, 0)";
const COLOR_SWAPPED     = "rgb(153, 255, 153)";
const COLOR_REPLACE     = "rgb(153, 255, 153)";
const COLOR_MOVE        = "rgb(217, 102, 255)";
const COLOR_MARKED      = "rgb(166, 77, 255)";
const COLOR_SORTED      = "rgb(0, 204, 102)";
const COLOR_SUBLIST     = "rgb(0, 163, 204)";

// Display mode enum used for ways to display the bars
const DisplayMode = Object.freeze({
    "NONE": 0,      //< Not set
    "UP": 1,        //< Bars from bottom -> top
    "CENTER": 2,    //< Bars centered
    "DOWN": 3       //< Bars from top -> bottom
});

class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMode: DisplayMode.UP
        };
    }

   /* render
    * -------------------------------------------------------------
    * Renders the component.
    * -------------------------------------------------------------
    * Input:    None
    * Output:   None
    */
    render() {
        return(
            <div id="visualizer-container">
                <div id="bar-container" style={
                    this.state.displayMode === DisplayMode.UP ? {alignItems: "flex-end"} :
                    this.state.displayMode === DisplayMode.CENTER ? {alignItems: "center"} :
                    this.state.displayMode === DisplayMode.DOWN ? {alignItems: "flex-start"} : {alignItems: "flex-end"}}>
                    { this.renderArrayElements() }
                </div>
                <div id="visualizer-button-container">
                    <button className="visualizer-button" onClick={() => this.setState({displayMode: DisplayMode.UP})}>
                        <i className="fas fa-2x fa-chevron-up"></i>
                    </button>
                    <button className="visualizer-button" onClick={() => this.setState({displayMode: DisplayMode.CENTER})}>
                        <i className="fas fa-2x fa-compress-alt"></i>
                    </button>
                    <button className="visualizer-button" onClick={() => this.setState({displayMode: DisplayMode.DOWN})}>
                        <i className="fas fa-2x fa-chevron-down"></i>
                    </button>           
                </div>
            </div>
        );
    }

   /* renderArrayElements
    * -------------------------------------------------------------
    * Sub-method used to render all array bars that are 
    * used / changed to display sorting.
    * -------------------------------------------------------------
    * Input:    None
    * Output:   None
    */
    renderArrayElements() {
        const arrayLength = this.props.displayArray.array.length;
        const barMargin = arrayLength < 100 ? 1: 0;
        const barWidth = 100 / arrayLength;
        const barHeighMultiplier = 
            this.props.displayArray.type === ArrayType.SEQUENCE ? (100 / (arrayLength + this.props.displayArray.minValue)) :
            this.props.displayArray.type === ArrayType.RANDOM ? (100 / this.props.displayArray.maxValue) :
            (100 / arrayLength);
        const styleAlignItems = this.state.displayMode === DisplayMode.UP ? 'flex-start':
            this.state.displayMode === DisplayMode.CENTER ? 'center':
            this.state.displayMode === DisplayMode.DOWN ? 'flex-end': 'flex-start';
        return this.props.displayArray.array.map((obj, index) => {
            const bg =  obj.state === AnimationState.SELECT ? COLOR_SELECTED : 
                        obj.state === AnimationState.SWAP ? COLOR_SWAPPED : 
                        obj.state === AnimationState.REPLACE ? COLOR_REPLACE :
                        obj.state === AnimationState.MOVE ? COLOR_MOVE : 
                        obj.state === AnimationState.MARKED ? COLOR_MARKED : 
                        obj.state === AnimationState.SORTED ? COLOR_SORTED : COLOR_DEFAULT;
            const barStyle = { 
                width:          `${barWidth}%`,
                height:         `${barHeighMultiplier * obj.value}%`,
                marginLeft:     `${barMargin}px`,
                marginRight:    `${barMargin}px`,
                backgroundColor: bg,
                alignItems:      styleAlignItems
            };
            if (obj.isSublist) {
                let gradient = "linear-gradient(to top, ";
                // Extra and value default as 100% of the bar being the sublist
                let extra = COLOR_SUBLIST + "0%, " + COLOR_SUBLIST + "100%)";
                // Percentage of the bar that should be colored as a sublist
                const subListPercentage = obj.sublistValue >= obj.value ? 100 : (obj.sublistValue / obj.value) * 100;
                if (subListPercentage !== 100) {
                    switch(this.state.displayMode) {
                        case DisplayMode.UP:
                            extra = COLOR_SUBLIST + "0%, " + COLOR_SUBLIST + (subListPercentage) + "%, " +
                                    bg + (subListPercentage) + "%, " + bg + "100%)";
                            break;
                        case DisplayMode.CENTER:
                            let sublistHalf = (100 - subListPercentage) / 2;
                            extra = bg + "0%, " + bg + sublistHalf + "%, " +
                                    COLOR_SUBLIST + sublistHalf + "%, " + COLOR_SUBLIST + (100 - sublistHalf) + "%, " +
                                    bg + (1 - subListPercentage) + "%, " + bg + "100%)";
                            break;
                        case DisplayMode.DOWN:
                            extra = bg + "0%, " + bg + (100 - subListPercentage) + "%, " + 
                                    COLOR_SUBLIST + (100 - subListPercentage) + "%, " + COLOR_SUBLIST + "100%)";
                            break;
                        default:
                            break;
                    }
                } else {
                    barStyle['height'] = `${barHeighMultiplier * obj.sublistValue}%`;
                }
                gradient += extra;
                barStyle['backgroundImage'] = gradient;
            }
            return(
                <div className="bar-value"
                    key={index}
                    style={barStyle}>
                </div>
            );
        });
    }
}

/****************************************
 * REDUX MANAGEMENT BELOW 
 ****************************************/
const mapStateToProps = (state) => {
    return {
        displayArray: state.displayArray
    };
}
export default connect(mapStateToProps, {
})(Visualizer);