import React, { useContext } from 'react';
import 'styles/pages/FreeNotes.scss';
import { Context } from 'context';

import AddNoteForm from 'containers/AddNoteForm';
import NoteList from 'containers/NoteList';

function FreeNotes() {
  const { darkTheme } = useContext(Context);
  const themeClass = darkTheme ? 'freeNotes-dark' : 'freeNotes-white';

  return (
    <main className={`freeNotes__container ${themeClass}`}>
      <section className="mainForm__container">
        <h1>Crea tus notas fácil y rápido.</h1>
        <p>Escribe lo que gustes, y si cierras el navegador no te preocupes, tus notas estarán en aquí hasta que tú decidas eliminarlas.</p>
        <AddNoteForm />
      </section>
      <section className="freenotes__mainlist">
        <NoteList />
      </section>
    </main>
  );
}

export default FreeNotes;
