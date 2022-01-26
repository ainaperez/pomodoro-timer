import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DrumPad.scss';

class DrumPad extends Component{

  constructor(props){
    super(props)

    this.makeSound = this.makeSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activateKeyStyle = this.activateKeyStyle.bind(this);

  }

  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyPress);
  }
 
  makeSound(){
    const sound = document.getElementById(this.props.keyPress);
    sound.currentTime = 0;
    sound.play();
    this.props.displayName(this.props.id);
    this.activateKeyStyle();
    //this.activatePad();
    //setTimeout(() => this.activatePad(), 100);
  }

  handleKeyPress(event){
    const letter = event.key; 
    const letterUppercase = letter.toUpperCase(); //transform to uppercase to be able to compare to keyPress
    if(letterUppercase === this.props.keyPress){
      this.makeSound();
      
    }

  }

  activateKeyStyle(){
    const pad = document.getElementById(this.props.id);
    console.log(pad)
    pad.classList.add('active');
    setTimeout(()=>{pad.classList.remove('active')}, 100)

  }

  render(){
    return(
      <div className='drum-pad' id={this.props.id} onClick={this.makeSound}>
      <audio className='clip' id={this.props.keyPress} src={this.props.url}>{this.props.keyPress}</audio>
      <p>{this.props.keyPress}</p>
    </div>
    )
  }

  
};

DrumPad.propTypes = {};

DrumPad.defaultProps = {};

export default DrumPad;
