import { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { allNotes } from '../redux/actions/NotesActions';
import '../styles/Containers/NoteList.scss';

import { Context } from '../Context';
import Note from '../components/Note';
import { Message } from '../components/Message';

import { Notes } from '../types';

interface NoteListProps {
  limit?: number;
  notes?: Notes;
  loading?: boolean;
  error?: string | null;
  allNotes?: () => void;
}

const loadNotes = ({ notes = [], limit }: NoteListProps) => {
  if (notes.length === 0) {
    return <Message textMessage="No tienes notas creadas 🦔" />;
  } else {
    return notes.splice(0, limit || notes.length).map((note) => {
      return <Note key={note._id} {...note} />;
    });
  }
};

function NoteList({
  limit,
  notes,
  loading,
  error,
  allNotes = () => {},
}: NoteListProps) {
  const { darkTheme } = useContext(Context);

  useEffect(() => {
    allNotes();
  }, []);

  return (
    <div className={`NoteList ${darkTheme ? 'NoteListDark' : ''}`}>
      <h1 className="NoteList__Title">NoteList</h1>
      {loading && <Message textMessage="Cargando... ✈" />}
      {error && <Message textMessage={error} />}
      {!loading && !error && loadNotes({ limit, notes })}
    </div>
  );
}

const mapStateToProps = (state: NoteListProps) => {
  return state.notes;
};

export default connect(mapStateToProps, { allNotes })(NoteList);
