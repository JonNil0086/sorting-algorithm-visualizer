/* ***********************************************************************
 * animator.js
 * -----------------------------------------------------------------------
 * The purpose of the animator is to execute a sorting algorithm
 * and to dispatch the animations returned by the sorting algorithm in
 * order for the visualizer to display them.
 * Thus, the flow is as follows:
 *      1. Run the given sorting algorithm, resulting in a returned
 *          array of animations.
 *      2. Dispatch each animation with the help of a timer, resulting in
 *          that the visualizer displays the animations.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

// Redux imports
import store from '../store';
import { swap, replace, changeBarState, setSimulationRunning, setSubList, mergeSublist }  from '../actions'
// Algoritm imports
import { getSelectionSortAnimations }   from '../sortingAlgorithms/selectionSort.js';
import { getBubbleSortAnimations }      from '../sortingAlgorithms/bubbleSort.js';
import { getInsertionSortAnimations }   from '../sortingAlgorithms/insertionSort.js';
import { getMergeSortAnimations }       from '../sortingAlgorithms/mergeSort.js';
import { getQuickSortAnimations }       from '../sortingAlgorithms/quickSort.js';
import { getHeapSortAnimations }        from '../sortingAlgorithms/heapSort.js';
import { getCountingSortAnimations }    from '../sortingAlgorithms/countingSort.js';

// Animation state enum used to determine what action to dispatch as well as the animation state of bars
export const AnimationState = Object.freeze({
    "NORMAL": 0,    "SELECT": 1,    "SWAP": 2,
    "REPLACE": 3,   "MARKED": 4,    "SORTED": 5,
    "SETSUBLIST": 6,"MERGESUBLIST": 7
});

// Used to store current store value states
let simRunning = false;
let animationSpeed = 1000;

/* startSorting
 * -------------------------------------------------------------
 * Runs a sorting algorithm and sends the animations created by
 * the sorting algorithm for dispatch (redux).
 * -------------------------------------------------------------
 * Input:    (algorithmName): The name of the sorting algorithm
 *              to run
 *           (dispatch): Dispatch function to dispatch actions
 * Output:   None
 */
export function startSorting(algorithmName, dispatch) {
    let displayArray = store.getState().displayArray;
    let array = displayArray.array.map((item) => {
        return item.value;
    });
    let algorithmInput = array;
    let sortingFunction = null;
    switch(algorithmName) {
        case "Selection Sort":
            sortingFunction = getSelectionSortAnimations;
            break;
        case "Bubble Sort":
            sortingFunction = getBubbleSortAnimations;
            break;
        case "Insertion Sort":
            sortingFunction = getInsertionSortAnimations;
            break;
        case "Merge Sort":
            sortingFunction = getMergeSortAnimations;
            break;
        case "Quick Sort":
            sortingFunction = getQuickSortAnimations;
            break;
        case "Heap Sort":
            sortingFunction = getHeapSortAnimations;
            break;
        case "Counting Sort":
            sortingFunction = getCountingSortAnimations;
            algorithmInput = {
                array: array,
                maxValue: displayArray.maxValue
            };
            break;
        default:
            return;
    }
    // Run the sorting algorithm to get the animations
    simRunning = true;
    let animations = sortingFunction(algorithmInput);
    // Subscribe to relevant redux store variables
    animationSpeed = store.getState().animationSpeed;
    const unsubscribeListener = store.subscribe(() => {
        if (store.getState().simulationRunning === false) {
            simRunning = false;
        } 
        if (store.getState().animationSpeed !== animationSpeed) {
            animationSpeed = store.getState().animationSpeed;
        }
    });
    // Run the animations (send reversed array to be able to use pop instead of shift for performance.)
    animate(animations.reverse(), unsubscribeListener, dispatch);
}

/* animate
 * -------------------------------------------------------------
 * Runs the animations by dispatching them with a timer.
 * -------------------------------------------------------------
 * Input:    (animations): Array of animations prepared for dispatch
 *           (unsubscribeListener): Used to listen if the user
 *              wants to stop the animations or not
 *           (dispatch): Dispatch function to dispatch actions
 * Output:   None (dispatches animations)
 */
function animate(animations, unsubscribeListener, dispatch) {
    // Basecase
    if (animations.length === 0 || simRunning === false) {
        dispatch(setSimulationRunning(false));
        unsubscribeListener();
        return;
    }
    // Dispatch animation(s)
    const animation = animations.pop();
    switch(animation.animationState) {
        case AnimationState.NORMAL:
        case AnimationState.SELECT:
        case AnimationState.MARKED:
        case AnimationState.SORTED:
            dispatch(changeBarState(animation));
            break;
        case AnimationState.SWAP:          
            dispatch(swap(animation));
            break;
        case AnimationState.REPLACE:
            dispatch(replace(animation));
            break;
        case AnimationState.SETSUBLIST:     
            dispatch(setSubList(animation));
            break;
        case AnimationState.MERGESUBLIST:        
            dispatch(mergeSublist(animation));
            break;
        default:
            return;
    }
    // Set a timer to call the method again
    setTimeout(() => {
        animate(animations, unsubscribeListener, dispatch);
    }, animationSpeed);       
}