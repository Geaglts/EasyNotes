import { connect } from 'react-redux';
import { useContext } from 'react';
import '../styles/Containers/NoteList.scss';

import { Context } from '../Context';
import Note from '../components/Note';
import { Message } from '../components/Message';

import { Notes } from '../types';

interface NoteListProps {
  limit?: number;
  notes?: Notes;
}

function NoteList({ limit, notes = [] }: NoteListProps) {
  const { darkTheme } = useContext(Context);

  return (
    <div className={`NoteList ${darkTheme ? 'NoteListDark' : ''}`}>
      <h1 className="NoteList__Title">NoteList</h1>
      {notes.length === 0 && <Message textMessage="No tienes notas creadas 🦔" />}
      {notes.splice(0, limit || notes.length).map((note) => {
        return <Note key={note._id} {...note} />;
      })}
    </div>
  );
}

const mapStateToProps = (state: NoteListProps) => {
  return state.notes;
};

export default connect(mapStateToProps, null)(NoteList);
