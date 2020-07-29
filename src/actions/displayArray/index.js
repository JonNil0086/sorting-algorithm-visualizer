/* ***********************************************************************
 * index.js (actions/displayArray)
 * -----------------------------------------------------------------------
 * Contains available actions for the displayArrayReducer.
 * Note: AnimationState resides in animator.js.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

// Available action types
export const SET_DISPLAY_ARRAY  = 'SET_DISPLAY_ARRAY';
export const CHANGE_BAR_STATE   = 'CHANGE_BAR_STATE';
export const SWAP               = 'SWAP';
export const REPLACE            = 'REPLACE';
export const SET_SUBLIST        = 'SET_SUBLIST';
export const MERGE_SUBLIST      = 'MERGE_SUBLIST';

/* setDisplayArray (action)
 * -------------------------------------------------------------
 * Action used to set a new display array.
 * -------------------------------------------------------------
 * Input:    (array):       Array to set
 *           (type):        Type of the array
 *           (minValue):    Minimum int value in the array
 *           (maxValue):    Maximum int value in the array
 * Output:   Type, Payload
 */
export const setDisplayArray = (array, type, minValue, maxValue) => {
    return {
        type: SET_DISPLAY_ARRAY,
        payload: { array, type, minValue, maxValue }
    };
};

/* changeBarState (action)
 * -------------------------------------------------------------
 * Changes the state of array elements (bars) by indices.
 * Possible states are: 
 *      AnimationState.NORMAL
 *      AnimationState.SELECT
 *      AnimationState.MARKED
 *      AnimationState.SORTED
 * -------------------------------------------------------------
 * Input:    (animation): { 
 *              animationState: AnimationState,
 *              data: [ind1, ind2, ...]
 *           }
 * Output:   Type, Payload
 */
export const changeBarState = (animation) => {
    return {
        type: CHANGE_BAR_STATE,
        payload: animation
    };
};

/* swap (action)
 * -------------------------------------------------------------
 * Swaps position of two array elements(indices).
 * -------------------------------------------------------------
 * Input:    (animation): { 
 *              animationState: AnimationState.SWAP,
 *              data: [indexOne: ?, indexTwo: ?] (bar indices to swap)
 *           }
 * Output:   Type, Payload
 */
export const swap = (animation) => {
    return {
        type: SWAP,
        payload: animation
    };
};

/* replace (action)
 * -------------------------------------------------------------
 * Replaces an array element value with another.
 * -------------------------------------------------------------
 * Input:    (animation): { 
 *              animationState: AnimationState.REPLACE,
 *              data: [index: ?, value: ?]
 *           }
 * Output:   Type, Payload
 */
export const replace = (animation) => {
    return {
        type: REPLACE,
        payload: animation
    };
};

/* setSubList (action)
 * -------------------------------------------------------------
 * Sets sublist values for indices.
 * -------------------------------------------------------------
 * Input:    (animation): { 
 *              animationState: AnimationState.SETSUBLIST,
 *              data: [{index: ?, value: ?}, {index: ?, value: ?}]
 *           }
 * Output:   Type, Payload
 */
export const setSubList = (animation) => {
    return {
        type: SET_SUBLIST,
        payload: animation
    };
};

/* mergeSublist (action)
 * -------------------------------------------------------------
 * Merges an existing sublist into the primary values.
 * -------------------------------------------------------------
 * Input:    (animation): { 
 *              animationState: AnimationState.MERGESUBLIST,
 *              data: [ind1, ind2, ...]
 *           }
 * Output:   Type, Payload
 */
export const mergeSublist = (animation) => {
    return {
        type: MERGE_SUBLIST,
        payload: animation
    };
};