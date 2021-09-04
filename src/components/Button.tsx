import '../styles/Components/Button.scss';

interface ButtonInterface {
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
