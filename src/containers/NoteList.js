import { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { allNotes } from '../redux/actions/notes.actions';

import SearchButton from '../components/SearchButton';
import Note from '../components/Note';
import { Context } from '../Context';
import { Message } from '../components/Message';

import { NoteSkeleton } from '../components/skeletons/Note';
import Error from '../components/Error';

import '../styles/Containers/NoteList.scss';

function filterList(searchedValue) {
  const lowerSearchedValue = searchedValue.toLowerCase().trim();
  return (note) => {
    const { title, content } = note;
    const lowerTitle = title.toLowerCase();
    const lowerContent = content.toLowerCase();

    return (
      lowerTitle.includes(lowerSearchedValue) ||
      lowerContent.includes(lowerSearchedValue)
    );
  };
}

function NoteList(props) {
  const { notes, loading, error, onLoadNotes } = props;
  const [searchedValue, setSearchedValue] = useState('');
  const { darkTheme } = useContext(Context);

  useEffect(() => {
    onLoadNotes();
  }, []);

  const onChangeSearchButton = (event) => {
    setSearchedValue(event.target.value);
  };

  return (
    <div className={`NoteList ${darkTheme ? 'NoteListDark' : ''}`}>
      <div className="NoteList__header">
        <h1 className="NoteList__Title">Todas tus notas</h1>
        <SearchButton
          inputPlaceholder="Como iba la nota?"
          onChange={onChangeSearchButton}
          value={searchedValue}
        />
      </div>
      <div className="NoteList__List--Container">
        {loading && <NoteSkeleton />}
        {error && <Error errorMessage={error} />}
        {!loading && !error && notes.length === 0 && (
          <Message textMessage="No tienes notas para mostrar" />
        )}
        {!loading &&
          !error &&
          notes.length > 0 &&
          notes.filter(filterList(searchedValue)).map((note) => {
            return <Note key={note._id} {...note} />;
          })}
      </div>
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
