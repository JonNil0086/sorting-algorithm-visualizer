/* ***********************************************************************
 * index.js (reducers/setAlgorithm)
 * -----------------------------------------------------------------------
 * File containing a reducer used to define the current selected 
 * sorting algorithm.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import { 
    SET_ALGORITHM
} from '../../actions/setAlgorithm';

const INITIAL_STATE = (null);

/* setAlgorithmReducer
 * -------------------------------------------------------------
 * Reducer used to define the current selected 
 * sorting algorithm.
 * -------------------------------------------------------------
 * Input:    (selectedAlgorithm): The algorithm to set
 *           (action): The action (payload of information)
 * Output:   selectedAlgorithm / payload
 */
export const setAlgorithmReducer = (selectedAlgorithm = INITIAL_STATE, action) => {
    if (action.type === SET_ALGORITHM) {
        return action.payload;
    }
    return selectedAlgorithm;
};