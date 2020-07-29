/* ***********************************************************************
 * settings-bar.js
 * -----------------------------------------------------------------------
 * Component used to manage the settings bar in the application.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAlgorithm, setSimulationRunning, setAnimationSpeed } from '../../actions';
import './settings-bar.css';
// Helpers
import { startSorting } from '../../helpers/animator';
import { generateNewArray, ArrayType } from '../../helpers/arrayGenerator';

// Number constants (maybe change to max 600, min 20)
const MAX_GENERATED_NUMBER = 700;
const MIN_GENERATED_NUMBER_RANDOM = 20;
const MIN_GENERATED_NUMBER_SEQUENCE = 5;
// The animation speed (in ms)
const MIN_ANIMATION_SPEED = 1000;
const MAX_ANIMATION_SPEED = 1;
// Amount of bars / values to use
const MIN_AMOUNT_BARS = 4;
const MAX_AMOUNT_BARS = 400;

class SettingsBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Amount of bars / values that are generated when a new array is created
            amountBars: 60,
            selectedAlg: "Selection Sort"
        };
    }

   /* componentDidMount
    * -------------------------------------------------------------
    * Used for some initialization.
    * (invoked immediately after the component is mounted)
    * -------------------------------------------------------------
    * Input:    None
    * Output:   None
    */
    componentDidMount() {
        this.props.setAlgorithm(this.props.algorithms[0]);
        this.props.setAnimationSpeed(MAX_ANIMATION_SPEED);
        generateNewArray(MIN_GENERATED_NUMBER_RANDOM, MAX_GENERATED_NUMBER
            , this.state.amountBars, ArrayType.RANDOM, this.props.dispatch);
    }

    /* 
     * Handlers for sliders
     */
    handleOnChangeBars = (e) => { 
        this.setState({amountBars: e.target.value});   
    }
    handleInputOnBlurBars = (e) => {
        this.setState({
            amountBars: e.target.value > MAX_AMOUNT_BARS ? MAX_AMOUNT_BARS:
                        e.target.value < MIN_AMOUNT_BARS ? MIN_AMOUNT_BARS: 
                        e.target.value
        });
    }
    handleOnChangeSpeed = (e) => {
        this.props.setAnimationSpeed(e.target.value);   
    }
    handleInputOnBlurSpeed = (e) => {
        this.props.setAnimationSpeed(
            e.target.value < MAX_ANIMATION_SPEED ? MAX_ANIMATION_SPEED:
            e.target.value > MIN_ANIMATION_SPEED ? MIN_ANIMATION_SPEED:
            e.target.value
        ); 
    }

    /*
     * Handlers for dropdowns
     */
    handleOnChangeAlgorithm = (e) => {
        for(let i = 0; i < this.props.algorithms.length; i++) {
            if(this.props.algorithms[i].name === e.target.value) {
                this.props.setAlgorithm(this.props.algorithms[i]);
                break;
            }
        }
    }

   /* start
    * -------------------------------------------------------------
    * Starts sorting the current array with numbers with the 
    * currently selected sorting algorithm.
    * -------------------------------------------------------------
    * Input:    None
    * Output:   None
    */
    start() {
        this.props.setSimulationRunning(true);
        startSorting(this.props.selectedAlgorithm.name, this.props.dispatch);
    }

   /* stop
    * -------------------------------------------------------------
    * Used to stop the animations / sorting if it is running.
    * -------------------------------------------------------------
    * Input:    None
    * Output:   None
    */
    stop() {
        this.props.setSimulationRunning(false);
        generateNewArray(MIN_GENERATED_NUMBER_RANDOM, MAX_GENERATED_NUMBER
            , this.state.amountBars, ArrayType.RANDOM, this.props.dispatch)
    }

   /* render
    * -------------------------------------------------------------
    * Renders the component
    * -------------------------------------------------------------
    * Input:    None
    * Output:   JSX
    */
    render() {
        return(
            <div id="settingsbar">
                <div id="settingsbar-top">
                    <Slider className="slider bars"
                        text="Bars"
                        disabled={this.props.simulationRunning === true ? true : false}
                        min={MIN_AMOUNT_BARS}
                        max={MAX_AMOUNT_BARS}
                        value={this.state.amountBars}
                        blur={this.handleInputOnBlurBars}
                        change={this.handleOnChangeBars}>
                    </Slider>
                    <SettingsButton
                        text="Random"
                        disabled={this.props.simulationRunning === true ? true : false}
                        passedFunction={() => generateNewArray(MIN_GENERATED_NUMBER_RANDOM, MAX_GENERATED_NUMBER
                                                , this.state.amountBars, ArrayType.RANDOM, this.props.dispatch)}>
                    </SettingsButton>
                    <SettingsButton
                        text="Random Sequence"
                        disabled={this.props.simulationRunning === true ? true : false}
                        passedFunction={() => generateNewArray(MIN_GENERATED_NUMBER_SEQUENCE, MAX_GENERATED_NUMBER
                                                , this.state.amountBars, ArrayType.SEQUENCE, this.props.dispatch)}>
                    </SettingsButton>
                    {this.renderDropdown()}
                </div>
                <div className="divider-horizontal"></div>
                <div id="settingsbar-bottom">
                    <Slider className="slider speed"
                        text="Speed"
                        min={MAX_ANIMATION_SPEED}
                        max={MIN_ANIMATION_SPEED}
                        value={this.props.animationSpeed}
                        blur={this.handleInputOnBlurSpeed}
                        change={this.handleOnChangeSpeed}>
                    </Slider>
                    <SettingsButton
                        text={<i className="far fa-play-circle" >Start</i>}
                        disabled={this.props.simulationRunning === true ? true : false}
                        passedFunction={() => this.start()}>
                    </SettingsButton>
                    <SettingsButton
                        text={<i className="far fa-stop-circle">Stop</i>}
                        disabled={this.props.simulationRunning === true ? false : true}
                        passedFunction={() => this.stop()}>
                    </SettingsButton>
                </div>
            </div>
        );
    }

   /* renderDropdown
    * -------------------------------------------------------------
    * Helps to render dropdowns.
    * -------------------------------------------------------------
    * Input:    None
    * Output:   A dropdown (JSX)
    */
    renderDropdown() {
        const opts = this.props.algorithms.map((algorithm) => { 
            return <option key={algorithm.name} value={algorithm.name}>{algorithm.name}</option>
        });
        return (
            <div className="settings-item-container">
                <select className="dropdown" onChange={this.handleOnChangeAlgorithm}>
                        {opts}
                </select>
            </div>
        );
    }
}

/* Slider
 * -------------------------------------------------------------
 * Used to create a slider with an input box.
 * -------------------------------------------------------------
 * Input:    (props): The properties of the slider
 * Output:   A slider (JSX)
 */
function Slider(props) {
    return(
        <div className="settings-item-container">
            <div className="slider-text">{props.text}</div>
            <input
                type="range"
                className={props.className}
                disabled={props.disabled}
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={props.change}/>
            <input 
                type="number" 
                className="slider-input-box" 
                min={props.min} 
                max={props.max} 
                value={props.value}
                onBlur={props.blur}
                onKeyDown={e => e.key === 'Enter' ? e.target.blur(): false}
                onChange={props.change}/>
        </div>
    );
}

/* SettingsButton
 * -------------------------------------------------------------
 * Used to create a settings button.
 * -------------------------------------------------------------
 * Input:    (props): The properties of the settings button
 * Output:   A settings button (JSX)
 */
function SettingsButton(props) {
    return(
        <div className="settings-item-container">
            <button className="settings-button"
                onClick={props.passedFunction}
                disabled={props.disabled}
                style={{borderBottom: props.borderBottom}}>
                    {props.text}
            </button>
        </div>
    );
}

/****************************************
 * REDUX MANAGEMENT BELOW 
 ****************************************/
const mapStateToProps = (state) => {
    return {
        algorithms: state.algorithms,
        selectedAlgorithm: state.selectedAlgorithm,
        simulationRunning: state.simulationRunning,
        animationSpeed: state.animationSpeed
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({
            setAlgorithm,
            setSimulationRunning,
            setAnimationSpeed},
        dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsBar);