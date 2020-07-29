/* ***********************************************************************
 * quickSort.js
 * -----------------------------------------------------------------------
 * QuickSort algorithm implementation focused on generating an array
 * of animations of the sorting algorithm.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import { AnimationState } from '../helpers/animator';

/* getQuickSortAnimations
 * -------------------------------------------------------------
 * Quick sort implementation focused on returning animations
 * that later can be interpreted to visualize the algorithm.
 * -------------------------------------------------------------
 * Input:    (array): An array of unsorted integer values
 * Output:   Array of animations
 */
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) { return animations; }
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

/* quickSort
 * -------------------------------------------------------------
 * Quick sort implementation. Uses the Lomuto partition scheme.
 * Modified to run appropiate animations properly.
 * -------------------------------------------------------------
 * Input:   (array): The array to sort
 *          (lo): Index determining where the array starts
 *          (hi): Index determining where the array ends
 *          (animations): Animation array to add animations to
 * Output:  None (changes array by calling sub-functions)
 */
function quickSort(array, lo, hi, animations) {
  if (lo <= hi) {
    let p = partition(array, lo, hi, animations);
    quickSort(array, lo, p - 1, animations);
    quickSort(array, p + 1, hi, animations);
  }
}

/* partition
 * -------------------------------------------------------------
 * Reorder the array so that all values less then the pivot
 * comes before the pivot, and all values greater then then the
 * pivot comes after the pivot.
 * -------------------------------------------------------------
 * Input:   (array): The array to partition
 *          (lo): Index determining where the array starts
 *          (hi): Index determining where the array ends
 *          (animations): Animation array to add animations to
 * Output:  Next index used for partitioning
 */
function partition(array, lo, hi, animations) {
  let pivot = array[hi];
  let i = lo;
  animations.push({ animationState: AnimationState.MARKED, data: [hi] });
  for(let j = lo; j < hi; j++) {
    animations.push({ animationState: AnimationState.SELECT, data: [i, j] });
    if(array[j] < pivot) {      
      animations.push({ animationState: AnimationState.SWAP, data: {indexOne: i, indexTwo: j} });
      [array[i], array[j]] = [array[j], array[i]];
      animations.push({ animationState: AnimationState.NORMAL, data: [i, j] });
      i = i + 1;
    } else {
      animations.push({ animationState: AnimationState.NORMAL, data: [i, j] });
    }
  }
  // Push animations  
  animations.push({ animationState: AnimationState.SELECT, data: [i, hi] });
  animations.push({ animationState: AnimationState.SWAP, data: {indexOne: i, indexTwo: hi} });
  animations.push({ animationState: AnimationState.NORMAL, data: [hi] });
  animations.push({ animationState: AnimationState.SORTED, data: [i] });
  // Swap the elements
  [array[i], array[hi]] = [array[hi], array[i]];
  return i;
}