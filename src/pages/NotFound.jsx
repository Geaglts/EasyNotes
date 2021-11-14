import React, { useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import 'styles/pages/NotFound.scss';

import notFoundImage from '../assets/images/not_found.svg';

const NotFound = () => {
  const { darkTheme } = useContext(Context);
  const theme = darkTheme ? ' dark-theme' : ' white-theme';

  return (
    <main className={`NotFound${theme}`}>
      <img className="image" src={notFoundImage} alt="not found easy notes" />
      <h1 className="title">No pudimos encontrar los que buscabas</h1>
      <Link className="link" to="/">
        Ir al inicio
      </Link>
    </main>
  );
};

export default NotFound;
