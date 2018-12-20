import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllWords } from './api-calls'

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            words: ''
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
          <h1 className="App-title">{ words }</h1>
        </header>
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
