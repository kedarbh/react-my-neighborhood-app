import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar'
import Map from './Components/Map/Map'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <Map />
      </div>
    );
  }
}

export default App;
