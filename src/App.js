import React, { Component } from 'react';
import Question from './Question';
import './App.css';
import Confetti from 'react-confetti'
import Button from '@material-ui/core/Button';

const questions = [
  {
    questionTitle: "Fråga ett",
    questionContent: "Hur lång tid hade en soldat på sig att hitta en fru när han väl flyttat in i torpet?",
    answerOne: "ett år",
    answerTwo: "sex månader",
    answerThree: "fyra veckor",
    answerFour: "tre månader",
    correctAnswerIndex: 3
  },
  {
    questionTitle: "Fråga Två",
    questionContent: "Vilket land ingick i en personalunion med Sverige 1814?",
    answerOne: "Norge",
    answerTwo: "Danmark",
    answerThree: "Frankrike",
    answerFour: "Belgien",
    correctAnswerIndex: 0
  },
  {
    questionTitle: "Fråga tre",
    questionContent:"Hur lång tid tog det att gräva Göta kanal?",
    answerOne: "4 år",
    answerTwo: "12 år",
    answerThree: "2 år",
    answerFour: "22 år",
    correctAnswerIndex: 3
  }
];


class App extends Component {
  constructor() {
    super();

    this.state = { lastScreen: false, selected: 0, correctAnswers: 0, questionDone: false, index: -1 };
  }

  select = (index) => {
    this.setState({index});
  }

  onChange = (correct) => {
    const correctAnswers = this.state.correctAnswers + ( correct ? 1 : 0);
    this.setState({questionDone: true, correctAnswers});
  }

  nextQuestion = () => {

    const next = this.state.selected + 1;
    if (next === questions.length) {
      this.setState({lastScreen: true});
    } else {
      this.setState({selected: next, questionDone: false, index: -1});
    }
    
  }

  render() {
    const lastQuestion = this.state.selected === questions.length - 1;
    return (
      <div className="App">

        {this.state.lastScreen ? 
            <React.Fragment>
              
              <div >
                <div style={{fontSize: 25}}>
                  Bra jobbat! Ni är nu klara! Prata med Jonas om möjligheten för klägg.
                </div>

              </div>
              <div >.</div>

            </React.Fragment>
            :
            <Question
              index={this.state.index}
              lastQuestion={lastQuestion}
              onChange={this.onChange}
              select={this.select}
              obj={questions[this.state.selected]}
            >
              {this.state.questionDone ? (
                <React.Fragment>
                  {lastQuestion ? (
                    <React.Fragment>
                       <div>{`Bra jobbat! ${this.state.correctAnswers}/${questions.length} rätt`}</div>
                       <Button variant="contained" onClick={this.nextQuestion}>Avsluta</Button>
                    </React.Fragment>
                   
                  ) : (
                    <Button variant="contained" color="primary" onClick={this.nextQuestion}> { lastQuestion ? "Hämta kod" :  "Nästa fråga"}</Button>
                  )}
                </React.Fragment>
              ) : null}
            </Question>
      }

        
      </div>
    );
  }
}

export default App;
