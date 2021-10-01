import React, { useContext } from 'react';
import { Context } from '../Context';

import '../styles/Components/Container.scss';

function Container(props) {
  const { darkTheme } = useContext(Context);

  return (
    <main style={{ backgroundColor: darkTheme ? '#1c1b22' : '#fff' }}>
      <div className="Container">
        <h1 className="Container__Title">EasyNotes</h1>
        {props.children}
      </div>
    </main>
  );
}

export default Container;
