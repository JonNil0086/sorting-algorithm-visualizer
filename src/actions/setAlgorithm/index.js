/* ***********************************************************************
 * index.js (actions/setAlgorithm)
 * -----------------------------------------------------------------------
 * Contains available actions for the setAlgorithmReducer.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

// Available action types
export const SET_ALGORITHM  = 'SET_ALGORITHM';

/* setAlgorithm (action)
 * -------------------------------------------------------------
 * Action used to set a the current sorting algorithm that is
 * to be used.
 * -------------------------------------------------------------
 * Input:    (algorithm): The name of the algorithm to set
 * Output:   Type, Payload
 */
export const setAlgorithm = (algorithm) => {
    return {
        type: SET_ALGORITHM,
        payload: algorithm
    };
};