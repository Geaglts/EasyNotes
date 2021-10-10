import React from 'react';
import AddNoteForm from '../../../containers/AddNoteForm';

import '../../../styles/pages/FreeNotes/containers/MainForm.scss';

function MainForm() {
  return (
    <section className="mainForm__container">
      <h1>Crea tus notas fácil y rápido.</h1>
      <p>
        Escribe lo que gustes, y si cierras el navegador no te preocupes, tus notas
        estarán en aquí hasta que tú decidas eliminarlas.
      </p>
      <AddNoteForm />
    </section>
  );
}

export default MainForm;
