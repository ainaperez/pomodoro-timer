import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';


const Button = (props) => (

  <div className="Button" id={props.id} onClick={props.handle} >
    {props.value}
  </div>
    
  
);

Button.propTypes = {};

Button.defaultProps = {};

export default Button;
