import { Link } from 'react-router-dom';
import '../styles/pages/Home.scss';
import TakingNotesImage from '../assets/images/taking_notes.svg';

function Home() {
  return (
    <main className="HomePage__Page">
      <div className="Introduction__Section">
        <section>
          <h1>
            <span>Bienvenido a </span>EasyNotes
          </h1>
          <p>
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
