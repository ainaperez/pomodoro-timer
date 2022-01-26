import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Display.scss';

import chord from '../../assets/audio/RK_DUBT2_Chord_05_E.wav';
import ride from '../../assets/audio/RK_DUT3_Ride_08.wav';
import bass from '../../assets/audio/RK_RT4_Bass_02_D.wav';
import snare from '../../assets/audio/RK_RT5_Snare_01.wav';
import clap from '../../assets/audio/RK_HT2_Clap_01.wav';
import openHH from '../../assets/audio/RK_HT2_Hihat_Open_07.wav';
import closedHH from '../../assets/audio/RK_HT2_Hihat_Closed_01.wav';
import kick1 from '../../assets/audio/RK_IT5_Kick_04.wav';
import kick2 from '../../assets/audio/RK_RT3_Kick_13.wav';

import  DrumPad  from '../DrumPad/DrumPad';


const  drumsArr = [
  {
    keyPress: 'Q',
    id: 'Chord', 
    url: chord,
  }, 
  {
    keyPress: 'W',
    id: 'Ride', 
    url: ride
  },
  {
    keyPress: 'E',
    id: 'Bass', 
    url: bass
  }, 
  {
    keyPress: 'A',
    id: 'Snare', 
    url: snare
  }, 
  {
    keyPress: 'S',
    id: 'Clap', 
    url: clap
  }, 
  {
    keyPress: 'D',
    id: 'Open HH', 
    url: openHH
  }, 
  {
    keyPress: 'Z',
    id: 'kick 1', 
    url: kick1
  }, 
  {
    keyPress: 'X',
    id: 'kick 2', 
    url: kick2
  }, 
  {
    keyPress: 'C',
    id: 'Closed HH', 
    url: closedHH
  }, 
];

class Display extends Component {

  constructor(props){
    super(props); 
    this.state={ 
      drumsArr: drumsArr,
      name: '', };

      this.displayName = this.displayName.bind(this)
    
  }

  displayName(Padname){
    console.log(Padname);
    this.setState({name: Padname});
  }


  render(){

    const drums = drumsArr.map(drum => {

      return <DrumPad id={drum.id} 
                      key={drum.keyPress} 
                      keyPress={drum.keyPress} 
                      url={drum.url}
                      displayName={this.displayName}
                       />
    })

    console.log(this.props.keyPress)

    return(
      <div id='display' className="Display">

        <div className='Pad-grid'>
        {drums}
        </div>

        <div className='Display-text'>
        <p >{this.state.name}</p>
        </div>
      </div>
  )}
}

Display.propTypes = {};

Display.defaultProps = {};

export default Display;
