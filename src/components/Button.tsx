import { ButtonHTMLAttributes } from 'react';
import '../styles/Components/Button.scss';

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: String;
}

function Button({ label, ...rest }: ButtonInterface) {
  return (
    <button className="Button" {...rest}>
      {label}
    </button>
  );
}

export default Button;
