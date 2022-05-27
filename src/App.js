import React, { Component } from 'react';
import Result from "./Game";
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            gameKey: true
        };

        this.newGame = this.newGame.bind(this);
    }

    newGame(){
        this.setState((prevState) => ({
            gameKey: !prevState.gameKey
        }));
    }

  render() {
    return (
      <div className="container">
        <Result key={this.state.gameKey} newGame={this.newGame}/>
      </div>
    );
  }
}

export default App;