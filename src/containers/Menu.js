import React, { useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import '../styles/Containers/Menu.scss';
import { FaMoon, FaSun } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';

import { Toggle } from '../components/Toggle';

function Menu() {
  const { darkTheme, changeTheme } = useContext(Context);

  const theme = darkTheme ? ' dark' : ' white';

  return (
    <nav className={'menu__container' + theme}>
      <Link to="/" className="menu__container--title">
        EasyNotes
      </Link>
      <ul className="menu__list">
        <li className="menu__list--item">
          <Link to="/fast">Nota rapida</Link>
        </li>
        <li className="menu__list--item">
          {darkTheme ? <FaMoon /> : <FaSun />}
          <Toggle onClick={changeTheme} status={darkTheme} />
        </li>
        <li className="menu__list--item menu__list--button">
          <button className="show_menu">
            <BiMenu />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export { Menu };
