import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ButtonBox.scss';

import Button from '../Button/Button';

const Numbers = [
  [
    {
      id: 'clear', 
      value: 'C'
    },
    {
    id: 'add',
    value: '+'
  }], 
  [{
    id: 'one', 
    value: 1
  }, 
  {
    id: 'two', 
    value: 2
  }, 
  {
    id: 'three', 
    value: 3
  }, 
  {
    id: 'subtract',
    value: '-'
  }],

  [{
    id: 'four', 
    value: 4
  }, 
  {
    id: 'five', 
    value: 5
  }, 
  {
    id: 'six', 
    value: 6
  }, 
  {
    id: 'multiply',
    value: '*'
  }],
 
  [{
    id: 'seven', 
    value: 7
  }, 
  {
    id: 'eight', 
    value: 8
  }, 
  {
    id: 'nine', 
    value: 9
  }, 
  {
    id: 'divide',
    value: '/'
  }],
  [
  {
    id: 'zero', 
    value: 0
  }, 
  {
    id: 'decimal', 
    value: '.'
  }, 
  {
    id: 'equals', 
    value: '='
  }
]
  
  
  
]

class ButtonBox extends Component {

  constructor(props){
    super(props)
    this.state={
      num: 0,
    }

  
  }
  
  render(){

    const NumberButtons = Numbers.flat().map((number, i) =>{
        return <Button 
                key={i} 
                id={number.id} 
                value={number.value} 
                handle={number.value === '=' ? this.props.displayResult : 
                        number.value === 'C' ? this.props.resetDisplay : 
                        this.props.displayOperations
                } /> })
        
    return(

    <div className="ButtonBox">
      <div className='Space1'></div>
      <div className='Space2'></div>
      {NumberButtons}
      
    </div>
    )
  }
    
};

ButtonBox.propTypes = {};

ButtonBox.defaultProps = {};

export default ButtonBox;
