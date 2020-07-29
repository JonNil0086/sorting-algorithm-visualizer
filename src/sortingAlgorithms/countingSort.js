/* ***********************************************************************
 * countingSort.js
 * -----------------------------------------------------------------------
 * Counting sort algorithm implementation focused on generating an array
 * of animations of the sorting algorithm.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import { AnimationState } from '../helpers/animator';

/* getCountingSortAnimations
 * -------------------------------------------------------------
 * Calls counting sort in order to sort the input array and
 * create an animation array used to visualize the algorithm.
 * -------------------------------------------------------------
 * Input:    (data): An object containing the array to sort and
 *              the maximum value that the array can contain
 * Output:   Array of animations
 */
export function getCountingSortAnimations(data) {
    const animations = [];
    if (data.array.length <= 1) { return animations; }
    countingSort(data.array, data.maxValue, animations);
    return animations;
}

/* countingSort
 * -------------------------------------------------------------
 * Counting sort implementation modified to fill an array of
 * animations that can be used to visualizer the algorithm.
 * -------------------------------------------------------------
 * Input:    (array): An array of unsorted integer values
 *           (maxValue): The maximum value that the array can 
 *              contain
 *           (animations): Array of animations
 * Output:   None (modifies the animations array by reference)
 */
function countingSort(array, maxValue, animations) {
    // Create the count array containing a spot for each number that can occur
    let countArray = new Array(maxValue).fill(0);
    // Store the count of each number
    for(let i = 0; i < array.length; ++i) {
        animations.push({ animationState: AnimationState.SELECT, data: [i] });
        ++countArray[array[i]];
        animations.push({ animationState: AnimationState.NORMAL, data: [i] });
    }
    // Make sure that numbers are at correct indices
    for(let i = 1; i <= countArray.length-1; ++i) {
        countArray[i] += countArray[i-1];
    }
    // Build the output array
    for(let i = array.length - 1; i >= 0; i--) {      
        animations.push({ animationState: AnimationState.SELECT, data: [countArray[array[i]]-1] });
        animations.push({ animationState: AnimationState.REPLACE, data: { index: countArray[array[i]]-1, value: array[i]} });
        animations.push({ animationState: AnimationState.SORTED, data: [countArray[array[i]]-1] });
        --countArray[array[i]];
    }
}