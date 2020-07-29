/* ***********************************************************************
 * heapSort.js
 * -----------------------------------------------------------------------
 * HeapSort algorithm implementation focused on generating an array
 * of animations of the sorting algorithm.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import { AnimationState } from '../helpers/animator';

/* getHeapSortAnimations
 * -------------------------------------------------------------
 * Performs heap sort and returns an array of animations.
 * -------------------------------------------------------------
 * Input:   (array): An array of unsorted integer values
 * Output:  Array of animations
 */
export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) { return animations; }
    heapSort(array, animations);
    return animations;
}

/* heapSort
 * -------------------------------------------------------------
 * Heap sort implementation focused on returning animations that
 * later can be interpreted to visualize the algorithm.
 * -------------------------------------------------------------
 * Input:   (array): An array of unsorted integer values
 *          (animations): Array to push animations to
 * Output:  None (modifies the animations array by reference)
 */
function heapSort(array, animations) {
  // Build a max heap
  heapify(array, animations);
  let end = array.length - 1;
  while (end > 0) {
    // Push SWAP animation and then swap the actual elements
    animations.push({ animationState: AnimationState.SELECT, data: [end, 0] });
    animations.push({ animationState: AnimationState.SWAP, data: { indexOne: end, indexTwo: 0 }});
    //animations.push({ animationState: AnimationState.NORMAL, data: [end, 0] });
    animations.push({ animationState: AnimationState.SORTED, data: [end] });
    [array[end], array[0]] = [array[0], array[end]];
    end = end - 1;
    // Sift the new first-element to its appropriate index
    siftDown(array, 0, end, animations);
    // If last element
    if (end === 0) { animations.push({ animationState: AnimationState.SORTED, data: [end] }); }
  }
}

/* heapify
 * -------------------------------------------------------------
 * Builds a heap of the input elements.
 * -------------------------------------------------------------
 * Input:   (array): An array of unsorted integer values
 *          (animations): Array to push animations to
 * Output:  None
 */
function heapify(array, animations) {
  let count = array.length - 1;
  let start = Math.floor(count - 1 / 2);
  while (start >= 0) {
    siftDown(array, start, count, animations);
    start = start - 1;
  }
}

/* siftDown
 * -------------------------------------------------------------
 * Sift elements to their appropiate places in the heap.
 * -------------------------------------------------------------
 * Input:   (array): An array of unsorted integer values
 *          (start): Start index
 *          (end): End index
 *          (animations): Array to push animations to
 * Output: None (changes animations by reference)
 */
function siftDown(array, start, end, animations) {
  let root = start;
  while (2 * root + 1 <= end) {
    // Get left child of root
    let child = 2 * root + 1;
    // Keep track on child to swap with
    let swap = root;
    animations.push({ animationState: AnimationState.SELECT, data: [swap, child] });
    animations.push({ animationState: AnimationState.NORMAL, data: [swap, child] });
    if (array[swap] < array[child]) {
      swap = child;
    }
    // If there is a right child that is greater
    if (child + 1 <= end) { 
      animations.push({ animationState: AnimationState.SELECT, data: [swap, child + 1] }); 
      animations.push({ animationState: AnimationState.NORMAL, data: [swap, child + 1] });
      if (array[swap] < array[child + 1]) {
        swap = child + 1;
      }
    }
    // If the largest element is the root, we are done
    if (swap === root) {
      return;
    } else {
      // Push SWAP animation and then swap the actual elements
      animations.push({ animationState: AnimationState.SWAP, data: { indexOne: root, indexTwo: swap }});   
      animations.push({ animationState: AnimationState.NORMAL, data: [root, swap] });
      [array[root], array[swap]] = [array[swap], array[root]];
      root = swap;
    }
  }
}