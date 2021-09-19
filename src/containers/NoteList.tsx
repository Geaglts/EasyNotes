import { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { allNotes } from '../redux/actions/NotesActions';
import '../styles/Containers/NoteList.scss';

import { Notes } from '../types';

import Note from '../components/Note';
import { Context } from '../Context';
import { Message } from '../components/Message';

import { NoteSkeleton } from '../components/skeletons/Note';

interface NoteListProps {
  limit?: number;
  notes?: Notes;
  loading?: boolean;
  error?: string | null;
  allNotes?: () => void;
}

function NoteList({
  limit,
  notes = [],
  loading,
  error,
  allNotes = () => {},
}: NoteListProps) {
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
      {error && <Message textMessage={error} />}
      {!loading && !error && loadNotes()}
    </div>
  );
}

const mapStateToProps = (state: NoteListProps) => {
  return state.notes;
};

export default connect(mapStateToProps, { allNotes })(NoteList);
