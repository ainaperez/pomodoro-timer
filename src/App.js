import './App.scss';
import ButtonBox from './components/ButtonBox/ButtonBox';
import { React, Component } from 'react';

const operatorsRegex = /[+/\-*]/g;

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      display : [0],
      expression:[0]
    }
    
    this.handleDigits = this.handleDigits.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this)
    this.displayResult = this.displayResult.bind(this);
    this.resetDisplay = this.resetDisplay.bind(this);
  }
  
  handleDigits (e){
    e.preventDefault(); 

    const input = e.target.innerHTML;
    console.log(input);

    this.setState(prevState =>{
      const prevDisplay = prevState.display,
            prevExpress =  prevState.expression,
            lastCharacter = prevExpress[prevExpress.length-1] ;
  
      if(!operatorsRegex.test(input)){ //if input is a number
        console.log('hey')
        return this.handleNumbers(prevDisplay, prevExpress, lastCharacter, input)
      
      }else{ //if input is an operator   
        return this.handleOperators(prevDisplay, prevExpress, lastCharacter, input)
      }
  })
}

handleNumbers(prevDisplay, prevExpress, lastCharacter, input){
  //If it's starting point and starts from 0
  if(prevExpress.length === 1 && prevExpress[0] === 0){

    if(input == '.'){ //allow 0.xxx
      return ({display: [...prevDisplay, ...prevExpress],
              expression: [0, input]})
    }else if(input == '0'){ //don't repeat 0
    return ({
      expression: [0]})
    }else{ //presses number   
      return ({display: [input],
        expression: [input]})
      }
  }else if(lastCharacter.match(/[+*/-]/)){
    return ({display: [...prevDisplay, input],
            expression: [input]})
  }else{//if input has already started
    //check if decimal has already been entered
    if(input == '.' && /\./.test(prevExpress.join(''))){
      console.log('already a decimal')
    }else{//we enter number
      return ({display: [...prevDisplay, input],
        expression: [...prevExpress, input]})
    }
}
}
  handleOperators(prevDisplay, prevExpress, lastCharacter, input){
    if(prevDisplay.length >=1 && prevExpress.length === 1 && prevExpress[0] === 0){
      return ({display: [...prevDisplay, input],
        expression: [input]});
    }
    else if(!lastCharacter.match(/[+*/-]/)){ //If we are following a number
      return ({display: [...prevDisplay, input],
              expression: [input]})
    }
    //if last character was an operator, and input is not '-', prevent repetition
    else if(lastCharacter.match(/[+*/-]/) && input !== '-'){
      return ({expression: [...prevExpress]})
    }
    //if input is '-' but is following a * or a /
    else if(input == '-'){
      if(/\/*/.test(lastCharacter)){   
        return ({display: [...prevDisplay, input],
          expression: [...prevExpress, input]})  
      }else{
        console.log('cannot enter - after + or -');
      }
    }   
  }

  displayResult(){
    const display = this.state.display;
    if(/[+*/\-.]$/.test(display.join(''))){
      display.pop();
    }
    this.setState({display: [eval(display.join(''))], 
                   expression: [0]});
  }

  resetDisplay(){
    this.setState({display: [0], 
                    expression: [0]});
  }

  
  render(){

    const displayExpression = this.state.expression.join('');
    const displayString = this.state.display.join('');

    return (
      <div className='App'>
        <header className='App-header'>
          <p>Javascript Calculator</p>
        </header>
        <main id='wrapper' className='App-main'>
          <div className='Calculator'>
          <div className='Display'>
            <p id='display' >{displayString}</p>
            <p>{displayExpression}</p>
          </div>  
          <ButtonBox 
            displayOperations={this.handleDigits} 
            displayResult={this.displayResult}
            resetDisplay={this.resetDisplay} />
            </div>
        </main>
        
      </div>
    );
  }

  
}

export default App;
