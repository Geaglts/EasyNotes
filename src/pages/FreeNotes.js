import React from 'react';
import Container from '../components/Container';
import AddNoteForm from '../containers/AddNoteForm';
import NoteList from '../containers/NoteList';

function FreeNotes() {
  return (
    <Container>
      <AddNoteForm />
      <NoteList />
    </Container>
  );
}

export default FreeNotes;
