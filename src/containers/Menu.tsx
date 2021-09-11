import { useContext } from 'react';
import { Context } from '../Context';
import '../styles/Components/Menu.scss';
import { FaMoon, FaSun } from 'react-icons/fa';

import { Toggle } from '../components/Toggle';

function Menu() {
  const { darkTheme, changeTheme } = useContext(Context);

  return (
    <div className="Menu">
      <p
        className="Menu__Title"
        style={{ color: darkTheme ? '#c7c7c7' : '#141414' }}
      >
        Change Theme: {darkTheme ? <FaMoon /> : <FaSun />}
      </p>
      <Toggle onClick={changeTheme} status={darkTheme} />
    </div>
  );
}

export { Menu };
