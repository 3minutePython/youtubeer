import React, { Component } from 'react';
import '../css/App.css';
import Youtube from './Youtube';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        {/* <header className="App-header">
          <h1 className="App-title">Super Karaoke</h1>
        </header> */}
        
        <Youtube />
      </div>
    );
  }
}

export default App;
