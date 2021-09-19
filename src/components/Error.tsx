import ErrorImage from '../assets/images/error.svg';

interface ErrorProps {
  errorMessage: string;
}

function Error(props: ErrorProps) {
  return (
    <div className="Error">
      <div className="ErrorImage">
        <img src={ErrorImage} alt="Imagen de error en la aplicacion" />
      </div>
      <div className="ErrorContent">
        <h2>Tenemos problemas por aqui 😔</h2>
        <p>Pero no te preocupes, ya estamos trabajando en eso 🙌</p>
        <p>{props.errorMessage}</p>
      </div>
    </div>
  );
}

export default Error;
