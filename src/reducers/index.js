/* ***********************************************************************
 * index.js (reducers)
 * -----------------------------------------------------------------------
 * Combines all reducers.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import { combineReducers } from 'redux';

// Reducers
import { algorithmsReducer } from './algorithms';
import { setAlgorithmReducer } from './setAlgorithm';
import { setSimulationRunning } from './setSimulationRunning';
import { displayArrayReducer } from './displayArray';
import { setAnimationSpeedReducer } from './setAnimationSpeed';

export default combineReducers({
    algorithms: algorithmsReducer,
    selectedAlgorithm: setAlgorithmReducer,
    simulationRunning: setSimulationRunning,
    displayArray: displayArrayReducer,
    animationSpeed: setAnimationSpeedReducer  
});