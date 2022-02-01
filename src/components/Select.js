import React from 'react';
import 'styles/Components/select.scss';

export const Select = ({ children, label, ...rest }) => {
  return (
    <div className="Select">
      <select className="Select__List" {...rest}>
        <option value="select_init_value">{label}</option>
        {children}
      </select>
    </div>
  );
};
