import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StatCard, StatCardTitle, StatCardContent, CardButton } from 'components/Card/Card';
import { UserNewNoteForm } from './UserNewNoteForm';
import Modal from 'components/Modal';

import 'styles/Containers/DashboardHeader.scss';

export const DashboardHeader = () => {
  const userNotes = useSelector((store) => store.userNotesReducer);
  const [modalState, setModalState] = useState(false);

  const showAddNewNote = () => {
    setModalState(!modalState);
  };

  const afterCreateNote = () => {
    showAddNewNote();
  };

  return (
    <section className="DashboardHeader">
      <StatCard>
        <StatCardTitle label="Notas creadas:" />
        <StatCardContent label={userNotes.loading ? 0 : userNotes.numberOfNotes} />
      </StatCard>
      <CardButton label="Nueva nota" onClick={showAddNewNote} />
      <Modal active={modalState} changeStatus={showAddNewNote}>
        <UserNewNoteForm afterCreate={afterCreateNote} />
      </Modal>
    </section>
  );
};
