/* ***********************************************************************
 * insertionSort.js
 * -----------------------------------------------------------------------
 * Insertion sort algorithm implementation focused on generating an array
 * of animations of the sorting algorithm.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import { AnimationState } from '../helpers/animator';

/* getInsertionSortAnimations
 * -------------------------------------------------------------
 * Calls insertion sort in order to sort the input array and
 * create an animation array used to visualize the algorithm.
 * -------------------------------------------------------------
 * Input:    (array): An array of unsorted integer values
 * Output:   Array of animations
 */
export function getInsertionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) { return animations; }
    insertionSort(array, animations);
    return animations;
}

/* insertionSort
 * -------------------------------------------------------------
 * Insertion sort implementation modified to fill an array of
 * animations that can be used to visualizer the algorithm.
 * -------------------------------------------------------------
 * Input:    (array): An array of unsorted integer values
 *           (animations): Array of animations
 * Output:   None (modifies the animations array by reference)
 */
function insertionSort(array, animations) {
    for(let i = 1; i < array.length; i++) {
        for(let j = i; j > 0; j--) {
            animations.push({ animationState: AnimationState.SELECT, data: [j - 1, j] });
            if (array[j - 1] > array[j]) {
                animations.push({ animationState: AnimationState.SWAP, data: {indexOne: j - 1, indexTwo: j} });
                [array[j - 1], array[j]] = [array[j], array[j - 1]];
                animations.push({ animationState: AnimationState.NORMAL, data: [j - 1, j] });
            } else {
                animations.push({ animationState: AnimationState.NORMAL, data: [j - 1, j] });
                break;
            }
        }
    }
    // Mark all items as sorted
    let markAsSorted = [];
    for(let i = 0; i < array.length; i++) {
        markAsSorted.push(i);
    }
    animations.push({ animationState: AnimationState.SORTED, data: markAsSorted });
}