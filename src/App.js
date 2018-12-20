import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllWords } from './api-calls'

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            words: []
        }
    }

  componentDidMount(){
      getAllWords().then(( { data: { express: words } } ) => this.setState({ words }))
  }

  render() {
    const { words } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome To My Little Word Game</h1>
        </header>
          <div>
              { words.map( (word) => ( <h3> { word } </h3>) ) }
          </div>
      </div>
    );
  }
}

export default App;
