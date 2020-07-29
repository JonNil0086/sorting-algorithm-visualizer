/* ***********************************************************************
 * App.js
 * -----------------------------------------------------------------------
 * The app component.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import React from 'react';

import './App.css';
import SettingsBar from './components/settings-bar/settings-bar';
import Visualizer from './components/visualizer/visualizer';

const App = () => {
  return(
    <div className="App">
      <SettingsBar></SettingsBar>
      <Visualizer></Visualizer>
    </div>
  );
};
export default App;