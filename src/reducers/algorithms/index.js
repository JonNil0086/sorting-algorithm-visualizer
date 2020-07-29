/* ***********************************************************************
 * index.js (reducers/algorithms)
 * -----------------------------------------------------------------------
 * File containing a reducer containing a static list of 
 * sorting algorithms.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

const INITIAL_STATE = (
    [
        { name: 'Selection Sort' },
        { name: 'Bubble Sort' },
        { name: 'Insertion Sort' },
        { name: 'Merge Sort' },
        { name: 'Quick Sort' },
        { name: 'Heap Sort' },
        { name: 'Counting Sort' }
    ]
);

/* algorithmsReducer (reducer)
 * -------------------------------------------------------------
 * Reducer containing names of all supported sorting algorithms.
 * -------------------------------------------------------------
 * Input:    None
 * Output:   INITIAL_STATE
 */
export const algorithmsReducer = () => {
    return INITIAL_STATE;
}