import { useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import '../styles/Containers/Menu.scss';
import { FaMoon, FaSun } from 'react-icons/fa';

import { Toggle } from '../components/Toggle';

function Menu() {
  const { darkTheme, changeTheme } = useContext(Context);

  return (
    <nav
      className="Menu__Container"
      style={{ backgroundColor: darkTheme ? '#141414' : 'rgba(71, 93, 237,.8)' }}
    >
      <ul className="Menu">
        <li className="Menu__Item">
          <Link to="/">EasyNotes</Link>
        </li>
        <li className="Menu__Item">
          <Link to="/fast">Nota rapida</Link>
        </li>
        <li className="Menu__Item">
          <a href="https://google.com" target="_blank">
            Quiero ir a google
          </a>
        </li>
        <li className="Menu__Item">
          {darkTheme ? <FaMoon /> : <FaSun />}
          <Toggle onClick={changeTheme} status={darkTheme} />
        </li>
      </ul>
    </nav>
  );
}

export { Menu };
