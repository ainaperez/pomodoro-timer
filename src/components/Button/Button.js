import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';


const Button = (props) => (

  <div className={props.className} id={props.id} onClick={props.handle} >
    {props.value}
  </div>
    
  
);

Button.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  handle: PropTypes.func,
  value: PropTypes.any
};

Button.defaultProps = {};

export default Button;
