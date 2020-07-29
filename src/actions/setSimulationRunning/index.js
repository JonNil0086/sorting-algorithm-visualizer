/* ***********************************************************************
 * index.js (actions/setSimulationRunning)
 * -----------------------------------------------------------------------
 * Contains available actions for the setSimulationRunningReducer.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

// Available action types
export const CHANGE_SIMULATION_STATE  = 'CHANGE_SIMULATION_STATE';

/* setSimulationRunning (action)
 * -------------------------------------------------------------
 * Action used to set if the simulation is running or not.
 * -------------------------------------------------------------
 * Input:    (simulationRunning): Bool determining if the
 *              simulation is running or not
 * Output:   Type, Payload
 */
export const setSimulationRunning = (simulationRunning) => {
    return {
        type: CHANGE_SIMULATION_STATE,
        payload: simulationRunning
    };
};