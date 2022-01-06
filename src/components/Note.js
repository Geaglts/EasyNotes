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
import FormControl from 'utils/classes/FormControl';
import { AiOutlineCopy, AiOutlineEye } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

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

export const UserNote = ({ title, content }) => {
  const { title: decryptTitle } = FormControl.decryptData({ title });
  const [decryptContent, setDecryptContent] = useState({ show: false, value: null });

  const onShowContent = () => {
    const { content: dc } = FormControl.decryptData({ content });
    setDecryptContent((prevState) => {
      let show = !prevState.show;
      let value = dc;
      if (show) return { show, value };
      return { show, value: null };
    });
  };

  return (
    <div className="UserNote">
      <h3 className="UserNote__Title">{decryptTitle}</h3>
      <div className="UserNote__Content">
        {decryptContent.show ? <NoteMultiline text={decryptContent.value} /> : <abbr title={content}>{content.slice(0, 18)}</abbr>}
      </div>
      <div className="UserNote__Options">
        <AiOutlineEye onClick={onShowContent} />
        <MdDeleteForever />
      </div>
    </div>
  );
};

const NoteMultiline = ({ text }) => {
  const copyToClipboard = (content) => () => {
    navigator.clipboard.writeText(content);
  };

  return text.split('\r\n').map((line, index) => (
    <p key={`NoteMultiline-${index}`} className="NoteMultiline">
      {line}
      <AiOutlineCopy className="NoteMultiline__CopyButton" onClick={copyToClipboard(line)} />
    </p>
  ));
};

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
