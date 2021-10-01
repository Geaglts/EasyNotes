import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { allNotes } from '../redux/actions/NotesActions';
import '../styles/Containers/NoteList.scss';

import Note from '../components/Note';
import { Context } from '../Context';
import { Message } from '../components/Message';

import { NoteSkeleton } from '../components/skeletons/Note';
import Error from '../components/Error';

function NoteList({ limit, notes = [], loading, error, allNotes = () => {} }) {
  const { darkTheme } = useContext(Context);

  useEffect(() => {
    allNotes();
  }, []);

  const loadNotes = () => {
    if (notes.length === 0) {
      return <Message textMessage="No tienes notas creadas 🦔" />;
    } else {
      return notes.splice(0, limit || notes.length).map((note) => {
        return <Note key={note._id} {...note} />;
      });
    }
  };

  return (
    <div className={`NoteList ${darkTheme ? 'NoteListDark' : ''}`}>
      <h1 className="NoteList__Title">NoteList</h1>
      {loading && <NoteSkeleton />}
      {error && <Error errorMessage={error} />}
      {!loading && !error && loadNotes()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.noteReducer;
};

export default connect(mapStateToProps, { allNotes })(NoteList);
