import React, { useContext } from 'react';
import { Context } from '@context';
import { Helmet } from 'react-helmet';
import { APP_NAME } from '@constants';

import AddNoteForm from '@containers/AddNoteForm';
import NoteList from '@containers/NoteList';

import '@styles/pages/FreeNotes.scss';

function FreeNotes() {
  const { darkTheme } = useContext(Context);
  const themeClass = darkTheme ? 'freeNotes-dark' : 'freeNotes-white';

  return (
    <>
      <Helmet>
        <title>{APP_NAME} | Crea una nota rápida</title>
      </Helmet>
      <main className={`freeNotes__container ${themeClass}`}>
        <section className="mainForm__container">
          <h1>Crea tus notas fácil y rápido.</h1>
          <p>
            Escribe lo que gustes, y si cierras el navegador no te preocupes, tus
            notas estarán en aquí hasta que tú decidas eliminarlas.
          </p>
          <AddNoteForm />
        </section>
        <section className="freenotes__mainlist">
          <NoteList />
        </section>
      </main>
    </>
  );
}

export default FreeNotes;
