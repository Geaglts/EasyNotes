import React, { useContext } from 'react';
import { Context } from '../../../Context';

import MainForm from './MainForm';
import MainList from './MainList';

import '../../../styles/pages/FreeNotes/containers/Main.scss';

function Main() {
  const { darkTheme } = useContext(Context);
  const themeClass = darkTheme ? 'freeNotes-dark' : 'freeNotes-white';

  return (
    <main className={`freeNotes__container ${themeClass}`}>
      <MainForm />
      <MainList />
    </main>
  );
}

export default Main;
