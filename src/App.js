import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllWords } from './api-calls'

class App extends Component {

  constructor(props){
      super(props);
      this.state = {
          words: [],
          numberOfWords: 10,
          time: 60, //Time in seconds
          gamePhase: 'settings',
          currentGameWords: [],
      }
   };

   componentDidMount(){
       getAllWords().then(( { data: { words } } ) => this.setState({ words }))
   }

    handleChange(event) {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[`${name}`]: value})
    }

   getRandomElements(n, l){
       //Get n random elements from list l
       const shuffled = l.sort(() => .5 - Math.random());
       return shuffled.slice(0,n);
   }

   buildGame = () => {
       const { words, numberOfWords, time } = this.state;
       this.setState({
           timeRemaining: time,
           gamePhase: 'play',
           currentGameWords: this.getRandomElements(numberOfWords,words)
       });
   };

   render() {
     const { time, numberOfWords, gamePhase, currentGameWords } = this.state;
     return (
       <div className="App">
         <header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <h1 className="App-title">Welcome To My Little Word Game</h1>
        </header>
           <div>
               { gamePhase == 'settings' && ( <div id="settings">
                   <input
                       type="number"
                       name="time"
                       min="1"
                       max="300"
                       value="10"
                       value={time}
                       onChange={this.handleChange.bind(this)}
                   />
                   <br/>
                   <input
                       type="number"
                       name="numberOfWords"
                       min="1"
                       max="300"
                       value={numberOfWords}
                       onChange={this.handleChange.bind(this)}
                    />
                   <br/>
                   <button name="start" onClick={this.buildGame}>START</button>
                   <h3> { time } </h3>
                   <h3> { numberOfWords } </h3>
               </div> )}
               { gamePhase === 'play'  && (
                   <div id="gameBox">
                    <input type="text" name="input"/>
                     <ol>
                         { currentGameWords.map( (word, i) => <li key={i}>{ word }</li>) }
                     </ol>
                  </div>
                  )
              }
          </div>
      </div>
    );
  }
}

export default App;
