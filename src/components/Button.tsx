import { useContext } from 'react';
import { Context } from '../Context';
import { ButtonHTMLAttributes } from 'react';
import '../styles/Components/Button.scss';

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: String;
}

function Button({ label, ...rest }: ButtonInterface) {
  const { darkTheme } = useContext(Context);
  return (
    <button type="button" className="Button" {...rest}>
      {label}
    </button>
  );
}

export default Button;
