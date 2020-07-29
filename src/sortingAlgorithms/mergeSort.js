/* ***********************************************************************
 * mergeSort.js
 * -----------------------------------------------------------------------
 * MergeSort algorithm implementation focused on generating an array
 * of animations of the sorting algorithm.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import { AnimationState } from '../helpers/animator';

/* getMergeSortAnimations
 * -------------------------------------------------------------
 * Performs merge sort and returns an array of animations.
 * -------------------------------------------------------------
 * Input:    (array): An array of unsorted integer values
 *           (animations): Array of animations
 * Output:   Array of animations
 */
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) { return animations; }
  mergeSort(array.slice(), array.slice(), animations, 0, array.length - 1);
  return animations;
}

/* mergeSort
 * -------------------------------------------------------------
 * Merge sort implementation focused on returning animations 
 * that later can be interpreted to visualize the 
 * merge sort algorithm.
 * -------------------------------------------------------------
 * Input:    (firstArray): Array reference
 *           (secondArray): Array reference
 *           (animations): Array to push animations to
 *           (startIndex): Start index where the partition of
 *              the array begins
 *           (endIndex): End index where the partition of 
 *              the array ends
 * Output:   None (changes animations by reference)
 */
function mergeSort(firstArray, secondArray, animations, startIndex, endIndex) {
  // Basecase
  if (startIndex === endIndex) { return; }
  // Split the lists into parts, then merge them
  // (we alternate between the arrays and recursively write results to secondArray)
  let centerIndex = Math.floor((startIndex + endIndex) / 2);
  mergeSort(secondArray, firstArray, animations, startIndex, centerIndex);
  mergeSort(secondArray, firstArray, animations, centerIndex + 1, endIndex);
  merge(firstArray, secondArray, animations, startIndex, centerIndex, endIndex);
}

/* merge
 * -------------------------------------------------------------
 * Performs the merge step in the merge sort implementation.
 * -------------------------------------------------------------
 * Input:  (firstArray): Array reference
 *         (secondArray): Array reference
 *         (animations): Array to push animations to
 *         (startIndex): Start index where the partition of
 *            the array begins
 *         (centerIndex): Center index of the array partition
 *         (endIndex): End index where the partition of
 *            the array ends
 * Output: None (modifies the animations array by reference)
 */
function merge(firstArray, secondArray, animations, startIndex, centerIndex, endIndex) {
  // Mark the partion list (the part we are working on)
  const markedPartition = [];
  for (let i = startIndex; i <= (endIndex); i++) { markedPartition.push(i); }
  animations.push({ animationState: AnimationState.MARKED, data: markedPartition });
  // Loop variables
  let k = startIndex;
  let list1_pos = startIndex;
  let list2_pos = centerIndex + 1;
  // Sublist tracker
  const subList = [];
  // Compare while both lists have comparable values
  while(list1_pos <= centerIndex && list2_pos <= endIndex) {
    if (secondArray[list1_pos] <= secondArray[list2_pos]) {  
      animations.push({ animationState: AnimationState.MARKED, data: [k] });
      animations.push({ animationState: AnimationState.SETSUBLIST, data: [{index: k, value: secondArray[list1_pos]}] });
      subList.push({index: k, value: secondArray[list1_pos]});
      firstArray[k++] = secondArray[list1_pos++];
    } else {
      animations.push({ animationState: AnimationState.MARKED, data: [k] });
      animations.push({ animationState: AnimationState.SETSUBLIST, data: [{index: k, value: secondArray[list2_pos]}] });
      subList.push({index: k, value: secondArray[list2_pos]});
      firstArray[k++] = secondArray[list2_pos++];
    }
  }
  // Add leftover elements
  while(list1_pos <= centerIndex) {
    animations.push({ animationState: AnimationState.SETSUBLIST, data: [{index: k, value: secondArray[list1_pos]}] });
    subList.push({index: k, value: secondArray[list1_pos]});
    firstArray[k++] = secondArray[list1_pos++];
  }
  while(list2_pos <= endIndex) {
    animations.push({ animationState: AnimationState.SETSUBLIST, data: [{index: k, value: secondArray[list2_pos]}] });
    subList.push({index: k, value: secondArray[list2_pos]});
    firstArray[k++] = secondArray[list2_pos++];
  }
  // Replace with sublist, then unmark partition
  let indices = [];
  for (let i = 0; i < subList.length; i++) { indices.push(subList[i].index); }
  animations.push({ animationState: AnimationState.MERGESUBLIST, data: indices });
  animations.push({ animationState: AnimationState.NORMAL, data: markedPartition });
  // Mark as sorted if final lap
  if (startIndex + endIndex === firstArray.length - 1) {
    animations.push({ animationState: AnimationState.SORTED, data: markedPartition });
  }
}