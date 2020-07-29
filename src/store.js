/* ***********************************************************************
 * store.js
 * -----------------------------------------------------------------------
 * Contains the persistent redux store.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import { createStore } from 'redux';
import reducers from './reducers';

// Create and export the store
const store = createStore(reducers);
export default store;