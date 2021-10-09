import React from 'react';
import NoteList from '../../../containers/NoteList';

import '../../../styles/pages/FreeNotes/containers/MainList.scss';

function MainList() {
  return (
    <section className="freenotes__mainlist">
      <NoteList />
    </section>
  );
}

export default MainList;
