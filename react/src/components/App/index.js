import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import './App.css';
import Main from '../Main';
import Footer from '../Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <h1>
              KRS
            </h1>
            <h2>
            Wyszukiwarka
            </h2>
        </div>
        <Main />
        <div>
        <Footer />
        </div>
      </div>
    );
  }
}

export default App;
