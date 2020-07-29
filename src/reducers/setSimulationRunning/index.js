/* ***********************************************************************
 * index.js (reducers/setSimulationRunning)
 * -----------------------------------------------------------------------
 * File containing a reducer used to define if the simulation is running 
 * or not.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import {
    CHANGE_SIMULATION_STATE
} from '../../actions/setSimulationRunning';

const INITIAL_STATE = false;

/* setSimulationRunning (reducer)
 * -------------------------------------------------------------
 * Reducer used for managing if the simulation is running.
 * -------------------------------------------------------------
 * Input:    (simulationRunning): bool if the simulation is 
 *              running or not
 * Output:   simulationRunning / payload
 */
export const setSimulationRunning = (simulationRunning = INITIAL_STATE, action) => {
    if (action.type === CHANGE_SIMULATION_STATE) {
        return action.payload;
    }
    return simulationRunning;
};