/* ***********************************************************************
 * bubbleSort.js
 * -----------------------------------------------------------------------
 * Bubble sort algorithm implementation focused on generating an array
 * of animations of the sorting algorithm.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import { AnimationState } from '../helpers/animator';

/* getBubbleSortAnimations
 * -------------------------------------------------------------
 * Calls bubble sort in order to sort the input array and
 * create an animation array used to visualize the algorithm.
 * -------------------------------------------------------------
 * Input:    (array): An array of unsorted integer values
 * Output:   Array of animations
 */
export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) { return animations; }
  bubbleSort(array, animations);
  return animations;
}

/* bubbleSort
 * -------------------------------------------------------------
 * Bubble sort implementation modified to fill an array of
 * animations that can be used to visualizer the algorithm.
 * -------------------------------------------------------------
 * Input:    (array): An array of unsorted integer values
 *           (animations): Array to push animations to
 * Output:   None (modifies the animations array by reference)
 */
function bubbleSort(array, animations) {
  let n = array.length;
  let swapped = false;
  do {
    swapped = false;
    n = n - 1;
    for(let i = 0; i < n; i++) {
      animations.push({ animationState: AnimationState.SELECT, data: [i, i + 1] });
      if (array[i] > array[i + 1]) {
        animations.push({ animationState: AnimationState.SWAP, data: {indexOne: i, indexTwo: i + 1} });
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;     
      }
      animations.push({ animationState: AnimationState.NORMAL, data: [i, i + 1] });     
    }
    if(swapped === false) {
      // Rest of elements are in order. Mark them as sorted.
      for(let j = 0; j < n+1; j++) { 
        animations.push({ animationState: AnimationState.SORTED, data: [j] }); 
      }
    } else {    
      animations.push({ animationState: AnimationState.SORTED, data: [n] });
    }
  } while(swapped);
}