import Choices from './c/Choices.js'
import Header from './c/Header.js'
import Timer from './c/Timer.js';
import Title from './c/Title.js';
import React from 'react';
import Question from './c/Question.js'
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentQuestion: null,
      currentAnswer: false,
      currentQuestionNum: 1,
      choiceOrder: [],
      data: [],
      originalData: [],
      seconds: 120,
      setAnswer: [],
      result: false
    };
    this.intervalHandle = setInterval(this.tick, 1000);
  }
  
  // Count
  tick = () => {
    let seconds = this.state.seconds;
    if (seconds === 0) this.clickSubmit();
    seconds--; 
    this.setState({
      seconds: seconds
     });
  }

  // handleClick will store the answer
  handleClick = (e) => {
    let answergotit = parseInt(e.target.value) === this.state.currentQuestion.correct_index ? true : false;
    this.setState({
      currentAnswer: answergotit
    });
  }

  clickSubmit = () =>{
    let currentQuestionNum = this.state.currentQuestionNum;
    let result = this.state.result;

    //Question num increment until 4, when user solve 4th question, show the result
    if(currentQuestionNum < 4){
      currentQuestionNum ++;
    } else if(currentQuestionNum === 4){
      result = true;
    }

    // save answers
    const currentAnswer = this.state.currentAnswer;
    const prevAnswer = this.state.setAnswer;

    // get a next question
    let questions = this.state.data.slice();
    const random1 = Math.floor(Math.random() * questions.length);
    const currentQuestion = questions[random1];
    this.setState({
      currentQuestion: currentQuestion,
      currentAnswer: false,
      currentQuestionNum: currentQuestionNum,
      data: [...questions.slice(0,random1), ...questions.slice(random1+1)], 
      seconds: 120,
      setAnswer: [...prevAnswer, currentAnswer],
      result: result
    })
  }
  
  // Display results
  renderResult = () => {
    return this.state.setAnswer.map((answer, key) => {
      return answer === false ? 
      <div className="answer" key={key+1}>Question {key+1} is Correct</div> : 
      <div className="answer" key={key+1}>Question {key+1} is wrong</div> 
    })
  }
  
  //when user click restart, reset all
  restart = () =>{
    let questions = this.state.originalData;
    const random1 = Math.floor(Math.random() * questions.length);
    const currentQuestion = questions[random1];
    let choiceOrder = [];
    while (choiceOrder.length < 4){
        let ranNum = Math.floor(Math.random() * 4);
        if(choiceOrder.indexOf(ranNum) === -1){
          choiceOrder.push(ranNum);
        }
    };

    this.setState({
      currentQuestion: currentQuestion,
      currentAnswer: false,
      currentQuestionNum: 1,
      choiceOrder: choiceOrder,
      data: [...questions.slice(0,random1), ...questions.slice(random1+1)],
      seconds: 120,
      setAnswer: [],
      result: false
    })
  }

  // fetch data from api & choose the first question randomly & choose random numbers for choices
  componentDidMount(){
    fetch('http://interview.workwhilejobs.com/quiz/questions')
        .then(res => res.json())
        .then((data) => {
          let questions = data.slice(),
              choiceOrder = [];
          const random1 = Math.floor(Math.random() * questions.length);
          const currentQuestion = questions[random1];
          while (choiceOrder.length < 4){
              let ranNum = Math.floor(Math.random() * 4);
              if(choiceOrder.indexOf(ranNum) === -1){
                choiceOrder.push(ranNum);
              }
          };

          this.setState({
            originalData: data,
            data: [...questions.slice(0,random1), ...questions.slice(random1+1)], 
            currentQuestion: currentQuestion,
            choiceOrder: choiceOrder
          })
        })
        .catch(console.log)
  }

  render(){
    // if empty -> return nothing
    if(this.state.currentQuestion === null){
      console.log('this?')
      return null;
    } 
    // get the current question
    const questions = this.state.currentQuestion
    const {question, answers, correct_index} = questions
    
    // if user submit the last question show the result. Otherwise show questions
    if(this.state.result === true){
      return (
        <div className="container result">
          <h2>Result</h2>    
          {this.renderResult()}
          <div className="submit"> 
            <button className="submit-button" onClick={this.restart}>Restart</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container">
          <Header/>
          <Timer seconds={this.state.seconds}/>
          <Title totalQ="4" currentQ={this.state.currentQuestionNum} />
          <Question question={question}/>
          <Choices choices={answers} correctAnswer={correct_index} handleClick={this.handleClick} choiceOrder={this.state.choiceOrder}/>
          <div className="submit">
            <button className="submit-button" onClick={()=>{this.clickSubmit({questions})}}>Submit</button>
          </div>
        </div>
      );
    }
  }
}

export default App;
