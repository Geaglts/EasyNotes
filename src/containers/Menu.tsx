import '../styles/Components/Menu.scss';
import { FaMoon, FaSun } from 'react-icons/fa';

import { Toggle } from '../components/Toggle';

function Menu() {
  return (
    <div className="Menu">
      <p className="Menu__Title">
        Change Theme: <FaSun />
      </p>
      <Toggle />
    </div>
  );
}

export { Menu };
