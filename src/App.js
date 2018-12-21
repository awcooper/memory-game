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
          mode: 'order'
      }
   };

   componentDidMount(){
       getAllWords().then(( { data: { words } } ) => this.setState({ words }))
   }

    handleChange(event) {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[`${name}`]: value}, () => console.log(this.state))
    }

   getRandomElements(n, l){
       //Get n random elements from list l
       const shuffled = l.sort(() => .5 - Math.random());
       return shuffled.slice(0,n);
   }

   playGame = () => {
       setTimeout(() => {
           this.setState({gamePhase: 'play'});
           this.tickInterval = setInterval(this.tick.bind(this), 1000);

       }, 1000)
   };

   buildGame = () => {
       const { words, numberOfWords, time } = this.state;
       this.setState({
           timeRemaining: time,
           gamePhase: 'getReady',
           currentGameWords: this.getRandomElements(numberOfWords,words)
       }, this.playGame);
   };


   tick(){
       const { time } = this.state;
       this.setState( { time: time - 1 });
       if (time === 0) {
           clearInterval(this.tickInterval);
           this.setState({gamePhase: 'settings'});
       }
   }

   render() {
     const { time, numberOfWords, gamePhase, currentGameWords, mode } = this.state;
     return (
       <div className="App">
         <header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <h1 className="App-title">Welcome To My Little Word Game</h1>
        </header>
           <div>
               { gamePhase == 'settings' && ( <div id="settings">
                   <h3> Time: </h3><input
                       type="number"
                       name="time"
                       min="1"
                       max="300"
                       value="10"
                       value={time}
                       onChange={this.handleChange.bind(this)}
                   />
                   <h3> Words: </h3> <input
                       type="number"
                       name="numberOfWords"
                       min="1"
                       max="300"
                       value={numberOfWords}
                       onChange={this.handleChange.bind(this)}
                    />
                   <h3> Mode: </h3> <select name="mode" onChange={this.handleChange.bind(this)}>
                       <option value="order">order</option>
                       <option value="any">any</option>
                   </select>
                   <button name="start" onClick={this.buildGame}>START</button>
               </div> )}
               { gamePhase === 'play'  && (
                   <div id="gameBox">
                       { time }
                       <input
                        type="text"
                        name="input"
                        onChange={this.handleChange.bind(this)}
                    />
                       { mode == 'order' ? (
                           <ol>
                               {currentGameWords.map((word, i) => <li key={i}>{word}</li>)}
                           </ol> ) : (
                           <ul>
                               {currentGameWords.map((word, i) => <li key={i}>{word}</li>)}
                           </ul> )
                       }
                  </div>
                  )
              }
               { gamePhase === 'getReady'  && (
                   <h3>Get READY</h3>
               )
               }
          </div>
      </div>
    );
  }
}

export default App;
