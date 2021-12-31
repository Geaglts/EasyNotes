import React, { useState } from 'react';
import 'styles/Components/InputForm.scss';
import { BsEyeSlash, BsEye } from 'react-icons/bs';

const InputForm = ({ labelName, isPassword = false, type = 'text', ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <label className="InputLabel">
      {labelName && labelName}
      <div className="InputForm__Container">
        <input className="InputForm" {...rest} type={isPassword ? (showPassword ? 'text' : 'password') : type} />
        {isPassword && (
          <span onClick={handleShowPassword} className="InputShowPasswordIcon">
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </span>
        )}
      </div>
    </label>
  );
};

export default InputForm;
