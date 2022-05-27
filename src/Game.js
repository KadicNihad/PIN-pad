import React, { Component } from "react";

class Result extends Component {

    constructor(props){
        super(props);
        this.state = {
            randomNumber: Math.floor(Math.random() *20 + 1),
            guesses: "",
            lowOrHi: "",
            guessCount: 10,
            classLastResult: "",
            classButtonNewGame: 'd-none'
        };

        this.checkGuess = this.checkGuess.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount(){
        this.guessNumber.focus();
    }

    componentDidUpdate(){
        if(this.state.classButtonNewGame === "btn btn-primary mt-2"){
            this.startNewGame.focus();
        }
    }

    reset() {
        this.setState({
            lowOrHi: "",
            classLastResult: "",
            guessCount:10,
            guesses:''
        });
    }
    

    checkGuess(event){

        event.preventDefault();
        let guessValue = event.target.guessNumber.value;
        let randomValue = this.state.randomNumber;
        event.target.guessNumber.value = "";
        
            let num = this.state.guesses.includes(guessValue);

            if(guessValue ==='') {
                alert('Please insert a number')
            }else if(num){
                alert('You have already entered this number! Try again')
            }
            else {
                if(guessValue !== "") {
                    this.setState((prevState) => ({
                        guesses: prevState.guesses === "" ? [ guessValue] : [...prevState.guesses,',',guessValue],
                        guessCount: prevState.guessCount - 1
                    }));
            }
            console.log(randomValue);

             if (this.state.guessCount < 1) {
                this.setState({
                    lowOrHi: "GAME OVER!",
                    classLastResult: "mt-2 p-1 bg-warning",
                    classButtonNewGame: "btn btn-primary mt-2"
                });

                this.submitNumber.setAttribute("disabled", "disabled");
                this.guessNumber.setAttribute("disabled", "disabled");
                this.resetNumber.setAttribute("disabled", "disabled");
                this.clearInput.setAttribute("disabled", "disabled");

            } else if (guessValue > randomValue) {
                this.setState({
                    lowOrHi: "Last guess was too high!",
                    classLastResult: "mt-2 p-2 bg-danger text-white"
                });
            } else if (guessValue < randomValue) {
                this.setState({
                    lowOrHi: "Last guess was too low!",
                    classLastResult: "mt-2 p-2 bg-info text-white"
                })
            }
            else {
                this.setState({
                    lowOrHi: "Congratulations! You got it right!",
                    classLastResult: "mt-2 text-white p-1 bg-success",
                    classButtonNewGame: "btn btn-primary mt-2"
                });

                this.submitNumber.setAttribute("disabled", "disabled");
                this.guessNumber.setAttribute("disabled", "disabled");
                this.resetGame.setAttribute("disabled", "disabled");
                this.clearInput.setAttribute("disabled", "disabled");
            } 
        }
    }
    render () {
        return (
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                <form className="form-inline" onSubmit={this.checkGuess}>
                        <label className="mt-2">Enter a guess:</label>
                        <input name="guessNumber" type="number" min="1" max="20" ref={(input) => {this.guessNumber = input;}} className="form-control mt-2"/>
                        <button type="submit" ref={(button) => {this.submitNumber = button;}} className="btn btn-primary mt-2">Submit guess</button> &nbsp;
                        <button type="reset" className="btn btn-primary mt-2" ref={(button) => {this.resetGame = button;}} onClick={this.reset}>reset</button>&nbsp;
                        <button className="btn btn-primary mt-2" ref={(button) => {this.clearInput = button;}} type="reset">Clear</button>
                </form>
                <div>
                    <p className="mt-2 p-2 bg-primary text-white" style={{borderRadius:'8px'}}>Previous numbers: {this.state.guesses}</p>
                    <p className="bg-primary mt-2 p-2 text-white"style={{borderRadius:'8px'}} >Remaininig attempts: {this.state.guessCount}</p>
                    <p className={this.state.classLastResult} style={{borderRadius:'8px'}}>{this.state.lowOrHi}</p>
                    <button ref={(button) => {this.startNewGame = button;}} className={this.state.classButtonNewGame} onClick={this.props.newGame}>
                        Start new game
                    </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Result;