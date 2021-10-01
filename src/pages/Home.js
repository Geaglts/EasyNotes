import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import '../styles/pages/Home.scss';

import TakingNotesImage from '../assets/images/taking_notes.svg';

function Home() {
  const { darkTheme } = useContext(Context);

  return (
    <main
      className="HomePage__Page"
      style={{ backgroundColor: darkTheme ? '#1c1b22' : '#fff' }}
    >
      <div className="Introduction__Section">
        <section>
          <h1>
            <span style={{ color: darkTheme ? '#fff' : '#475ded' }}>
              Bienvenido a{' '}
            </span>
            EasyNotes
          </h1>
          <p style={{ color: darkTheme ? '#fff' : '#1c1b22' }}>
            Crea notas rapidas y seguras de forma rapida y sencilla totalmente
            gratis.
          </p>
          <Link to="/fast">¡Crear mi primera nota!</Link>
        </section>
        <section>
          <img src={TakingNotesImage} alt="Persona tomando notas en easy notes" />
        </section>
      </div>
    </main>
  );
}

export default Home;
