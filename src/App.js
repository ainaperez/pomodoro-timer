import './App.scss';
import ButtonBox from './components/ButtonBox/ButtonBox';
import { Component } from 'react';


class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      display : [],
    }
    
    this.displayOperations = this.displayOperations.bind(this);
    this.displayResult = this.displayResult.bind(this);
    this.resetDisplay = this.resetDisplay.bind(this);
  }
  
  displayOperations = (e) => {
    e.preventDefault(); 
    console.log(e.target.innerHTML)

    this.setState(prevState => ({
      display: [...prevState.display, e.target.innerHTML]
    }))
  }

  displayResult(){
    const result = eval(this.state.display.join(''));
    console.log(result)
    this.setState({display: [result]})
  }

  resetDisplay(){
    this.setState({display: []})
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
          <div id='display' className='Display'>{displayString}</div>
          <ButtonBox 
            displayOperations={this.displayOperations} 
            displayResult={this.displayResult}
            resetDisplay={this.resetDisplay} />
        </main>
        
      </div>
    );
  }

  
}

export default App;
