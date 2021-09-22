import { useContext } from 'react';
import { Context } from '../Context';

import ErrorImage from '../assets/images/error.svg';
import '../styles/Components/Error.scss';

interface ErrorProps {
  errorMessage: string;
}

function Error(props: ErrorProps) {
  const { darkTheme } = useContext(Context);

  return (
    <div className={`Error${darkTheme ? ' ErrorDark' : ''}`}>
      <div className="Error__Image">
        <img src={ErrorImage} alt="Imagen de error en la aplicacion" />
      </div>
      <div className="Error__Content">
        <h2>Tenemos problemas por aqui 😔</h2>
        <p>Ya estamos trabajando en eso 🙌</p>
        <p>{props.errorMessage}</p>
      </div>
    </div>
  );
}

export default Error;
