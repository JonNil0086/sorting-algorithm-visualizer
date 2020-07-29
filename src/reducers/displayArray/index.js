/* ***********************************************************************
 * index.js (reducers/displayArray)
 * -----------------------------------------------------------------------
 * File containing a reducer used for changing / modifying the 
 * "display array".
 * The display array is used for visualization of the sorting algorithms
 * and contains relevant data about how they should be displayed.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import { AnimationState } from '../../helpers/animator';
import { ArrayType } from '../../helpers/arrayGenerator'

import { 
    SET_DISPLAY_ARRAY,
    CHANGE_BAR_STATE,
    SWAP,
    REPLACE,
    SET_SUBLIST,
    MERGE_SUBLIST,
} from '../../actions/displayArray';

// Initial state
const INITIAL_STATE = (
    {
        // The actual array containining data for a bar
        array:  [
                    { // Example of an element
                        // The primary value that the bar has
                        value: 0,
                        // The current state of the bar (determines the render color)
                        state: AnimationState.NORMAL,
                        // If the bar should be rendered partially, i.e., represents
                        // two values at the same time (useful for displaying sublists)
                        isSublist: false,
                        // The sublist value, used if isSublist is set to true
                        sublistValue: 0
                    }
                ],
        // The type of the array (if values are 1, 2, 3, ..., n or random values between minValue and maxValue)
        type: ArrayType.RANDOM,
        // The minimum value that the array contains
        minValue: 0,
        // The maximum value that the array contains
        maxValue: 0
    }
);

/* displayArrayReducer
 * -------------------------------------------------------------
 * Reducer for modifying the display array.
 * -------------------------------------------------------------
 * Input:    (displayArray): The display array
 *           (action): The action (payload of information)
 * Output:   object (see INITIAL_STATE) / payload
 */
export const displayArrayReducer = (displayArray = INITIAL_STATE, action)  => {
    switch(action.type) {
        case SET_DISPLAY_ARRAY:
            return action.payload;
        case CHANGE_BAR_STATE:
            { // Expects { animationState: ?, data: [ind1, ind2, ...] }
                let newArray = displayArray.array.slice();
                for(let i = 0; i < action.payload.data.length; i++) {        
                    newArray[action.payload.data[i]] = { 
                        value: newArray[action.payload.data[i]].value,
                        state: action.payload.animationState,
                        isSublist: newArray[action.payload.data[i]].isSublist,
                        sublistValue: newArray[action.payload.data[i]].sublistValue
                    };
                }
                return {
                    array: newArray,
                    type: displayArray.type,
                    minValue: displayArray.minValue,
                    maxValue: displayArray.maxValue
                };
            }
        case SWAP:
            { // Expects {animationState: ?, data: { indexOne: ?, indexTwo: ? }
                let newArray = displayArray.array.slice();
                const tmp = newArray[action.payload.data.indexOne];
                newArray[action.payload.data.indexOne] = {
                    value: newArray[action.payload.data.indexTwo].value,
                    state: action.payload.animationState,
                    isSublist: newArray[action.payload.data.indexTwo].isSublist,
                    sublistValue: newArray[action.payload.data.indexTwo].sublistValue
                };
                newArray[action.payload.data.indexTwo] = {
                    value: tmp.value,
                    state: action.payload.animationState,
                    isSublist: tmp.isSublist,
                    sublistValue: tmp.sublistValue
                };
                return {
                    array: newArray,
                    type: displayArray.type,
                    minValue: displayArray.minValue,
                    maxValue: displayArray.maxValue
                };
            }
        case REPLACE:
            { // Expects { animationState: ?, data: { index: ?, value: ? }}
                let newArray = [
                    ...displayArray.array.slice(0, action.payload.data.index),
                    { value: action.payload.data.value, state: action.payload.animationState },
                    ...displayArray.array.slice(action.payload.data.index + 1)
                ];
                return {
                    array: newArray,
                    type: displayArray.type,
                    minValue: displayArray.minValue,
                    maxValue: displayArray.maxValue
                };
            }
        case SET_SUBLIST:
            { // Expects { animationState: ?, data: [ {index: ?, value: ?}, {index: ?, value: ?}] }
                let newArray = displayArray.array.slice();
                for(let i = 0; i < action.payload.data.length; i++) {        
                    newArray[action.payload.data[i].index] = { 
                        value: newArray[action.payload.data[i].index].value,
                        state: newArray[action.payload.data[i].index].state,
                        isSublist: true,
                        sublistValue: action.payload.data[i].value
                    };
                }
                return {
                    array: newArray,
                    type: displayArray.type,
                    minValue: displayArray.minValue,
                    maxValue: displayArray.maxValue
                };
            }
        case MERGE_SUBLIST:
            { // Expects { animationState: ?, data: [ind1, ind2,...] }
                let newArray = displayArray.array.slice();
                for(let i = 0; i < action.payload.data.length; i++) {        
                    newArray[action.payload.data[i]] = { 
                        value: newArray[action.payload.data[i]].sublistValue,
                        state: newArray[action.payload.data[i]].state,
                        isSublist: false,
                        sublistValue: 0
                    };
                }
                return {
                    array: newArray, 
                    type: displayArray.type, 
                    minValue: displayArray.minValue, 
                    maxValue: displayArray.maxValue 
                };
            }
        default:
            return displayArray;
    }
}