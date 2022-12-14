import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { BiRefresh } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineCopy, AiOutlineDelete } from 'react-icons/ai';

import UserUpdateNoteForm from '@containers/UserUpdateNoteForm';
import CheckNotePin from '@containers/CheckNotePin';
import { ConfirmButton } from '@components/Button';

import { Context } from '@context';

import FormControl from '@utils/classes/FormControl';
import { isUrl } from '@utils/isFunctions';
import classnames from '@utils/classnames';

import useCheck from './hooks/useCheck';

import styles from '@styles/Components/skeletons/UserNote.module.scss';

export const UserNote = ({ data }) => {
  const dispatch = useDispatch();
  const decryptedData = FormControl.decryptData(data);
  const [hasAccess, setHasAccess] = React.useState(!Boolean(data.pin));
  const [updateNoteModal, setUpdateNoteModal] = React.useState(false);
  const { theme } = React.useContext(Context);
  const { pinCheck, togglePinCheck, showContent, toggleContentView } = useCheck();

  const toggleData = () => {
    if (!hasAccess) setHasAccess(false);
    toggleContentView();
  };

  const onShowContent = () => {
    toggleData();
  };

  const toggleUpdateNoteModal = () => {
    setUpdateNoteModal(!updateNoteModal);
  };

  const onDeleteNote = () => {
    dispatch(removeNote(data.id));
  };

  const copyContent = () => {
    let textToCopy = '';
    const { content } = decryptedData;
    if (content) textToCopy = content.replace(/--ignore--/gm, '');
    navigator.clipboard.writeText(textToCopy);
  };

  console.log(theme);

  return (
    <>
      <div className={classnames(styles.container, styles[theme])}>
        <h3 className="UserNote__Title">{decryptedData.title}</h3>
        <div className="UserNote__Content">
          {showContent ? (
            <NoteMultiline text={decryptedData.content} hide={onShowContent} />
          ) : (
            <p>{'🔥🎈'.repeat(5)}</p>
          )}
        </div>
        <div className="UserNote__Category--Container">
          {data.categories?.map((category) => {
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
            pin={data.pin}
            visibility={pinCheck}
            changeVisibility={togglePinCheck}
          >
            {(showValidation) => {
              return (
                <>
                  {showContent ? (
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
          decryptTitle={decryptedData.title}
          decryptedContent={decryptedData.content}
          title={decryptedData.title}
          pin={data.pin && FormControl.decryptValue(data.pin)}
          noteId={data.id}
          categories={data.categories}
        />
      </div>
    </>
  );
};

UserNote.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    categories: PropTypes.string.isRequired,
    pin: PropTypes.string.isRequired,
  }),
};

export default UserNote;
