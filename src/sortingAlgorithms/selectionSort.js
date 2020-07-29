/* ***********************************************************************
 * selectionSort.js
 * -----------------------------------------------------------------------
 * Selection sort algorithm implementation focused on generating an array
 * of animations of the sorting algorithm.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import { AnimationState } from '../helpers/animator';

/* getSelectionSortAnimations
 * -------------------------------------------------------------
 * Calls selection sort in order to sort the input array and
 * create an animation array used to visualize the algorithm.
 * -------------------------------------------------------------
 * Input:    (array): An array of unsorted integer values
 * Output:   Array of animations
 */
export function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) { return animations; }
    selectionSort(array, animations);
    return animations;
}

/* selectionSort
 * -------------------------------------------------------------
 * Selection sort implementation modified to fill an array of
 * animations that can be used to visualizer the algorithm.
 * -------------------------------------------------------------
 * Input:    (array): An array of unsorted integer values
 *           (animations): Array of animations
 * Output:   None (modifies the animations array by reference)
 */
function selectionSort(array, animations) {
    let arrayLength = array.length;
    for(let i = 0; i < arrayLength - 1; i++) {
        let jMin = i;
        // We mark the current smallest element
        animations.push({ animationState: AnimationState.MARKED, data: [jMin] });
        for(let j = i + 1; j < arrayLength; j++) {
            animations.push({ animationState: AnimationState.SELECT, data: [j] });
            if (array[j] < array[jMin]) {
                // Change the marking to the new smallest item
                animations.push({ animationState: AnimationState.NORMAL, data: [jMin] });
                animations.push({ animationState: AnimationState.MARKED, data: [j] });
                jMin = j;
            } else {  
                animations.push({ animationState: AnimationState.NORMAL, data: [j] });
            }
        }
        if (jMin !== i) {
            animations.push({ animationState: AnimationState.SELECT, data: [i, jMin] });
            animations.push({ animationState: AnimationState.SWAP, data: {indexOne: i, indexTwo: jMin} });
            animations.push({ animationState: AnimationState.NORMAL, data: [i, jMin] });
            [array[i], array[jMin]] = [array[jMin], array[i]];
        }
        animations.push({ animationState: AnimationState.SORTED, data: [i] });
    }
    // Last element is in order
    animations.push({ animationState: AnimationState.SORTED, data: [arrayLength-1] });
}