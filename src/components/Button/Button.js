import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';


const Button = (props) => (
  <div className={props.className} id={props.id} onClick={props.clickHandle} >
    {props.children}
  </div>
);

Button.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  clickHandle: PropTypes.func,
  children: PropTypes.any

};

export default Button;
