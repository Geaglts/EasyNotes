import { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import {
  AiOutlineCopy,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineDelete,
} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import '../styles/Components/Note.scss';

import { removeNote } from '../redux/actions/userNotes.actions';
import { removeNote as removeFastNote } from '../redux/actions/notes.actions';

import UserUpdateNoteForm from '@containers/UserUpdateNoteForm';
import CheckNotePin from '@containers/CheckNotePin';

import { Context } from '../Context';
import Button, { ConfirmButton } from './Button';
import Modal from './Modal';

import { noteStorage } from '../storage';

import capitalize from '@utils/capitalize';
import FormControl from '@utils/classes/FormControl';
import { isUrl } from '@utils/isFunctions';

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
    noteStorage.copy(`${title}\n${content}`);
  };

  return (
    <div className={`Note ${darkTheme ? 'NoteDark' : ''}`}>
      <div className="Note__Header">
        <p className="Note__Header--title">{capitalize(title)}</p>
        <div className="Note__Header--buttons">
          <Button
            label="Eliminar"
            title="Eliminar"
            onClick={handleConfirmRemoveModal}
            style={deleteButtonStyles(darkTheme)}
          />
          <Button
            label="Copiar"
            title="Copiar"
            onClick={handleCopy}
            style={copyButtonStyles(darkTheme)}
          />
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
          <p className="RemoveNoteModal-description">
            Esto eliminará la nota permanentemente, ¿Estás segura de realizar esta
            acción?
          </p>
          <button onClick={handleDelete} className="RemoveNoteModal-confirm">
            Sí, elimínala
          </button>
        </div>
      </Modal>
    </div>
  );
}

export const UserNote = ({ id, title, content, categories, pin }) => {
  const { theme } = useContext(Context);
  const [checkNotePin, setCheckNotePin] = useState(false);
  const dispatch = useDispatch();
  const { title: decryptTitle, content: decryptedContent } = FormControl.decryptData(
    { title, content }
  );
  const [hasAccess, setHasAccess] = useState(!Boolean(pin));
  const [decryptContent, setDecryptContent] = useState({ show: false, value: null });
  const [updateNoteModal, setUpdateNoteModal] = useState(false);

  const toggleData = () => {
    if (!hasAccess) setHasAccess(false);
    const { content: dc } = FormControl.decryptData({ content });
    setDecryptContent((prevState) => {
      let show = !prevState.show;
      let value = dc;
      if (show) return { show, value };
      return { show, value: null };
    });
  };

  const onShowContent = () => {
    toggleData();
  };

  const toggleCheckNodePinModal = () => {
    setCheckNotePin(!checkNotePin);
  };

  const toggleUpdateNoteModal = () => {
    setUpdateNoteModal(!updateNoteModal);
  };

  const onDeleteNote = () => {
    dispatch(removeNote(id));
  };

  const copyContent = () => {
    navigator.clipboard.writeText(
      decryptContent.value ? decryptContent.value.replace(/--ignore--/gm, '') : ''
    );
  };

  return (
    <>
      <div className={`UserNote ${theme}`}>
        <h3 className="UserNote__Title">{decryptTitle}</h3>
        <div className="UserNote__Content">
          {decryptContent.show ? (
            <NoteMultiline text={decryptContent.value} hide={onShowContent} />
          ) : (
            <p>{'🔥🎈'.repeat(5)}</p>
          )}
        </div>
        <div className="UserNote__Category--Container">
          {categories?.map((category) => {
            const name = FormControl.decryptData({ name: category.name }).name;
            return (
              <p className="UserNote__Category" key={category.id}>
                {name}
              </p>
            );
          })}
        </div>
        <div className="UserNote__Options">
          <CheckNotePin
            pin={pin}
            visibility={checkNotePin}
            changeVisibility={toggleCheckNodePinModal}
          >
            {(showValidation) => {
              return (
                <>
                  {decryptContent.show ? (
                    <AiOutlineEyeInvisible onClick={onShowContent} />
                  ) : (
                    <AiOutlineEye onClick={showValidation(onShowContent)} />
                  )}
                  <AiOutlineCopy size={23} onClick={copyContent} />
                  <ConfirmButton
                    onConfirm={showValidation(onDeleteNote)}
                    Icon={AiOutlineDelete}
                  />
                  <BiRefresh
                    onClick={showValidation(toggleUpdateNoteModal)}
                    title="Actualizar nota"
                  />
                </>
              );
            }}
          </CheckNotePin>
        </div>
        <UserUpdateNoteForm
          show={updateNoteModal}
          toggleShow={toggleUpdateNoteModal}
          decryptTitle={decryptTitle}
          decryptedContent={decryptedContent}
          title={decryptTitle}
          pin={pin && FormControl.decryptData({ pin }).pin}
          noteId={id}
          categories={categories}
        />
      </div>
    </>
  );
};

const NoteMultiline = ({ text, hide = () => {} }) => {
  const lines = text.split(/[\r\n]|\n/);

  if (!lines) {
    return (
      <p className="NoteMultiline">
        <span>🍟</span>
        <AiOutlineCopy className="NoteMultiline__CopyButton" />
      </p>
    );
  }

  const copyToClipboard = (content) => () => {
    navigator.clipboard.writeText(content);
  };

  return lines.map((line, index) => {
    const ignoreLine = line.includes('--ignore--');

    if (line.length > 0) {
      if (!ignoreLine) {
        if (isUrl(line)) {
          return (
            <p key={`NoteMultiline-${index}`} className="NoteMultiline">
              <a href={line} target={'_blank'} className="NoteMultiline">
                {line}
              </a>
              <AiOutlineCopy
                className="NoteMultiline__CopyButton"
                onClick={copyToClipboard(line)}
              />
            </p>
          );
        }
        return (
          <p key={`NoteMultiline-${index}`} className="NoteMultiline">
            {line.replace('--ignore--', '')}
            {!ignoreLine && (
              <AiOutlineCopy
                className="NoteMultiline__CopyButton"
                onClick={copyToClipboard(line)}
              />
            )}
          </p>
        );
      }
      return (
        <p key={`NoteMultiline-${index}`} className="NoteMultiline">
          {line.replace('--ignore--', '')}
        </p>
      );
    } else {
      return <br key={`NoteMultiline-${index}`} />;
    }
  });
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
      dispatch(removeFastNote(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Note);
