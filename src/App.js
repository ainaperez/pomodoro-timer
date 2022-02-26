import './App.scss';
import Button from './components/Button/Button';
import Sound  from './assets/audio/RK_BT3_Chord_07_Em7.wav'
import { React, Component } from 'react';


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      breakLength : 5, 
      sessionLength: 25, 
      timerLength: 1500, //total length in seconds
      timerOn: false,
      breakOn: false, 
      
    }

    this.timerId = null,
    this.incrementCount = this.incrementCount.bind(this); 
    this.decrementCount = this.decrementCount.bind(this);
    this.countdownHandle = this.countdownHandle.bind(this);
    this.startPauseHandle = this.startPauseHandle.bind(this);
    this.changeSession = this.changeSession.bind(this);
    this.resetHandle = this.resetHandle.bind(this);
    
  }

  incrementCount(e){
    e.preventDefault();

    this.setState(prevState => {
      if(e.target.id == 'break-increment'){
        if(prevState.sessionLength == 60){
          console.log('cannot go any higher');
        }else{
          prevState.breakLength++;
          return ({breakLength: prevState.breakLength})
        }
      }else{
        if(prevState.sessionLength == 60){
          console.log('cannot go any higher');
        }else{
          prevState.sessionLength++
          return ({sessionLength: prevState.sessionLength,
                   timerLength: prevState.sessionLength*60})
         }
      }    
    } )
  }

  decrementCount(e){
    e.preventDefault(); 

    this.setState(prevState => {
      if(e.target.id == 'break-decrement'){
        if(prevState.breakLength == 0){
          console.log('cannot go any lower')
        }else{
          prevState.breakLength--;
          return ({breakLength: prevState.breakLength})
        }
      }else{
        if(prevState.sessionLength == 0){
          console.log('cannot go any lower')
        }else{
          prevState.sessionLength--;
          return ({sessionLength: prevState.sessionLength, 
                   timerLength: prevState.sessionLength*60})
        } 
      }
    } )
  }

  convertTime(Length){
    const min = Math.floor(Length/60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }); 
    const sec = (Length % 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }); 
    return min + ' : ' + sec; 
  }

  countdownHandle(){
    this.setState(prevState => {
        prevState.timerLength--
        console.log(this.state.timerLength)
        this.convertTime(prevState.timerLength);
        return ({timerLength: prevState.timerLength})
    })
    if(this.state.timerLength == 0){
      clearInterval(this.timerId);
      this.playSound();
      this.changeSession();
    }
  }

  changeSession(){
    if(this.state.breakOn){
      this.setState({
        timerLength: this.state.sessionLength*60,
        timerOn: false, 
        breakOn: false
      }, ()=>{
        
        this.startPauseHandle()
      }
      )
    }else{
      this.setState({
        timerLength: this.state.breakLength*60,
        timerOn: false, 
        breakOn: true
      }, ()=>{
        this.startPauseHandle()
      })
    }
  }

  startPauseHandle(){
    console.log(this.state.timerOn)
    if(!this.state.timerOn){
      this.setState({timerOn: true}, 
        ()=>{
          if(this.state.breakOn){
          console.log('break')
          this.timerId = setInterval(this.countdownHandle, 1000, this.state.breakOn); 
          
        }else{
          console.log('session'); 
          this.timerId = setInterval(this.countdownHandle, 1000, this.state.breakOn);   
        }}
      )  
    }else{
      clearInterval(this.timerId);
      this.setState({timerOn: false})
      console.log(this.state.timerOn)
      
    }
  }

  playSound(){
    const sounds = document.getElementById('sound');
    console.log(sounds);
    sounds.play();
  }


  resetHandle(){
    clearInterval(this.timerId);
    this.setState({
        breakLength : 5, 
        sessionLength: 25, 
        timerLength: 1500, //total length in seconds
        timerOn: false,
      })
  }

  render(){

    return (

      <div id='wrapper' className='app-main w-40 m-auto t-cent'>
        <div className='m-auto'>
          <div className='d-flex'>
            <div className='minw-200'>
              <div id='break-label'>
                Break Length
              </div>
                <div className='d-flex'>
                <Button id='break-increment' 
                        className='p-10 br-5 bg-c-1 m-5' 
                        clickHandle={this.incrementCount}>inc</Button>
                <p id='break-length'>{this.state.breakLength}</p>
                <Button id='break-decrement' 
                        className='p-10 br-5 bg-c-2 m-5' 
                        clickHandle={this.decrementCount}>dec</Button>
                </div>
            </div>
            <div className='minw-200'>
              <div id='session-label'>
                Session Length
              </div>
                <div className='d-flex'>
                <Button id='session-increment' 
                        className='p-10 br-5 bg-c-1 m-5' 
                        clickHandle={this.incrementCount}>inc</Button>
                <p id='session-length'>{this.state.sessionLength}</p>
                <Button id='session-decrement' 
                        className='p-10 br-5 bg-c-2 m-5' 
                        clickHandle={this.decrementCount}>dec</Button>
                </div>
            </div>
          </div>

          <h1 id='timer-label'>{this.state.breakOn ? 'Break' : 'Session'}</h1>

          <p id='time-left'>{this.convertTime(this.state.timerLength)}</p>
         
          <Button id='start_stop' 
                  className='w-40 m-auto p-10 br-5 bg-c-1' 
                  clickHandle={this.startPauseHandle}>
                  {this.state.timerOn ? 'stop ' : 'start'}</Button>
          <Button id='reset' 
                  className='w-40 m-auto p-10 br-5 bg-c-2' 
                  clickHandle={this.resetHandle}>reset</Button>
      </div>
      <audio id='sound' src={Sound}></audio>
      </div>
    
    )
  }

  
}

export default App;
