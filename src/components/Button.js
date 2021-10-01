import React from 'react';
import '../styles/Components/Button.scss';

function Button({ label, ...rest }) {
  return (
    <button type="button" className="Button" {...rest}>
      {label}
    </button>
  );
}

export default Button;
