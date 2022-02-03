import './App.scss';
import ButtonBox from './components/ButtonBox/ButtonBox';
import { Component } from 'react';

const operatorsRegex = /[+\/\-.*]/gm
const operatorsRegex2  = /[+\/.*]/gm
const evaluateNegative  = /[+\-.]/gm


class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      display : [0],
    }
    
    this.displayOperations = this.displayOperations.bind(this);
    this.displayResult = this.displayResult.bind(this);
    this.resetDisplay = this.resetDisplay.bind(this);
  }
  
  displayOperations = (e) => {
    e.preventDefault(); 
    console.log(e.target.innerHTML)

    const value = e.target.innerHTML;

     /*Checking last character added to avoid duplicates 
     with operators and decimal(++,--,**, //, ..)*/
    const lastCharacter = this.state.display[this.state.display.length-1];
      console.log(lastCharacter);

    this.setState(prevState => {
      console.log(prevState.display);

     
      
      /*Check if the display only contains the default value '0'. 
      In that case, when updating the display, 
      the new values will overwrite 0, instead of adding to it. */
      if(prevState.display[0] == 0){ 
       return ({
        display: [e.target.innerHTML]
        })
      }else if(operatorsRegex.test(lastCharacter) && operatorsRegex2.test(value)){
                  return ({display: [...prevState.display]})
                }
      else if(evaluateNegative.test(lastCharacter) && value == '-'){
                  return ({display: [...prevState.display]})        
      }else{
        console.log('normal')
        return ({display: [...prevState.display, e.target.innerHTML]})
      }
      
    })
  }

  displayResult(){
    const result = eval(this.state.display.join(''));
    console.log(result)
    this.setState({display: [result]})
  }

  resetDisplay(){
    this.setState({display: [0]})
  }

  
  render(){

    const displayString = this.state.display.join('');

    console.log(displayString)
    return (
      <div className='App'>
        <header className='App-header'>
          <p>Javascript Calculator</p>
        </header>
  
        <main id='wrapper' className='App-main'>
          <div className='Calculator'>
          <div id='display' className='Display'>{displayString}</div>
          <ButtonBox 
            displayOperations={this.displayOperations} 
            displayResult={this.displayResult}
            resetDisplay={this.resetDisplay} />
            </div>
        </main>
        
      </div>
    );
  }

  
}

export default App;
