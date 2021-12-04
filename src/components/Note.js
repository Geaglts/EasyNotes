import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { BsFillTrashFill } from 'react-icons/bs';
import '../styles/Components/Note.scss';

import { removeNote } from '../redux/actions/notes.actions';

import { Context } from '../Context';
import Button from './Button';
import Modal from './Modal';

import { noteStorage } from '../storage';

import capitalize from 'utils/capitalize';

function Note({ content, title, _id, onRemoveNote }) {
  const { darkTheme } = useContext(Context);
  const [confirmRemoveModal, setConfirmRemoveModal] = useState(false);

  const handleConfirmRemoveModal = () => {
    setConfirmRemoveModal(!confirmRemoveModal);
  };

  const handleDelete = () => {
    onRemoveNote(_id);
  };

  const handleCopy = () => {
    noteStorage.copy({ title, content });
  };

  return (
    <div className={`Note ${darkTheme ? 'NoteDark' : ''}`}>
      <div className="Note__Header">
        <p className="Note__Header--title">{capitalize(title)}</p>
        <div className="Note__Header--buttons">
          <Button label="Eliminar" onClick={handleConfirmRemoveModal} style={deleteButtonStyles(darkTheme)} />
          <Button label="Copiar" onClick={handleCopy} style={copyButtonStyles(darkTheme)} />
        </div>
      </div>
      <div className="Note__Content">
        {content.split('\n').map((line, index) => {
          return (
            <p className="Note__Content--text" key={index}>
              {capitalize(line)}
            </p>
          );
        })}
      </div>
      <Modal active={confirmRemoveModal} changeStatus={handleConfirmRemoveModal}>
        <div className="RemoveNoteModal">
          <div className="RemoveNoteModal-icon">
            <BsFillTrashFill />
          </div>
          <p className="RemoveNoteModal-description">Esto eliminará la nota permanentemente, ¿Estás segura de realizar esta acción?</p>
          <button onClick={handleDelete} className="RemoveNoteModal-confirm">
            Sí, elimínala
          </button>
        </div>
      </Modal>
    </div>
  );
}

const deleteButtonStyles = (darkMode) => {
  if (darkMode) {
    return {
      color: '#ED4747',
      backgroundColor: '#141414',
      border: '1px solid #ED4747',
      width: 100,
    };
  } else {
    return { color: '#FFDF75', backgroundColor: '#ED4747', width: 100 };
  }
};

const copyButtonStyles = (darkMode) => {
  if (darkMode) {
    return {
      color: '#f8f8f8',
      backgroundColor: '#141414',
      border: '1px solid #f8f8f8',
      width: 100,
    };
  } else {
    return { color: '#FFDF75', backgroundColor: '#475ded', width: 100 };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveNote(id) {
      dispatch(removeNote(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Note);
