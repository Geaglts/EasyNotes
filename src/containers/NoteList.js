import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { allNotes } from '../redux/actions/notes.actions';
import '../styles/Containers/NoteList.scss';

import Note from '../components/Note';
import { Context } from '../Context';
import { Message } from '../components/Message';

import { NoteSkeleton } from '../components/skeletons/Note';
import Error from '../components/Error';

function NoteList(props) {
  const { notes, loading, error, onLoadNotes } = props;
  const { darkTheme } = useContext(Context);

  useEffect(() => {
    onLoadNotes();
  }, []);

  return (
    <div className={`NoteList ${darkTheme ? 'NoteListDark' : ''}`}>
      <h1 className="NoteList__Title">NoteList</h1>
      {loading && <NoteSkeleton />}
      {error && <Error errorMessage={error} />}
      {!loading && !error && notes.length === 0 && (
        <Message textMessage="No tienes notas para mostrar" />
      )}
      {!loading &&
        !error &&
        notes.length > 0 &&
        notes.map((note) => {
          return <Note key={note._id} {...note} />;
        })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.noteReducer;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadNotes() {
      dispatch(allNotes());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
