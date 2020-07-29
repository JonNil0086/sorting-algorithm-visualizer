/* ***********************************************************************
 * arrayGenerator.js
 * -----------------------------------------------------------------------
 * Used to create display arrays and dispatch them to redux store.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import { setDisplayArray } from '../actions'

import { AnimationState } from './animator';

// Array type enum
export const ArrayType = Object.freeze({
    "NONE": 0,      //< No type set.
    "RANDOM": 1,    //< Values are generated randomly.
    "SEQUENCE": 2   //< Values are generated in sequence, then shuffled.
});

/* generateNewArray
 * -------------------------------------------------------------
 * Generates a new display array and dispatches it.
 * -------------------------------------------------------------
 * Input:    (min): Minimum value that can be generated
 *           (max): Maximum value that can be generated
 *           (amount): Amount of values to generate
 *           (arrayType): What kind of array to generate
 *           (dispatch): Used to dispatch actions
 * Output:   None (dispatches the resulting array)
 */
export function generateNewArray(min, max, amount, arrayType=ArrayType.RANDOM, dispatch) {
    const newArray = [];
    switch(arrayType) {
        case ArrayType.RANDOM:
            for (let i = 0; i < amount; i++) {
                newArray.push({ 
                    value: generateRandomInt(min, max),
                    state: AnimationState.NORMAL 
                });
            }
            break;
        case ArrayType.SEQUENCE:
            for (let i = 0; i < amount; i++) {
                if (min + i >= max) { break; }
                newArray.push({
                    value: min + i,
                    state: AnimationState.NORMAL
                });
            }
            shuffleArray(newArray);
            break;
        default:
            newArray.push({
                value: 0, 
                state: AnimationState.NORMAL
            });
            break;
    }
    dispatch(setDisplayArray(newArray, arrayType, min, max));
}

/* generateRandomInt
 * -------------------------------------------------------------
 * Used in order to generate a random integer between 
 * minValue(inclusive) and maxValue(inclusive).
 * -------------------------------------------------------------
 * Input:    (minValue): The minimum number that can be generated
 *           (maxValue): The maximum number that can be generated
 * Output:   A random integer between minValue and maxValue
 */
function generateRandomInt(minValue, maxValue) {
    minValue = Math.ceil(minValue);
    maxValue = Math.floor(maxValue);
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

/* shuffleArray
 * -------------------------------------------------------------
 * Shuffles an array of integers.
 * -------------------------------------------------------------
 * Input:    (array): The array to shuffle
 * Output:   None (shuffles array by reference)
 */
function shuffleArray(array) {
    for(let i = array.length - 1; i > 0; i--) {
        const swap = Math.floor(Math.random() * (i + 1));
        [array[i], array[swap]] = [array[swap], array[i]];
    }
}