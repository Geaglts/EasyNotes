import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { StatCard, StatCardTitle, StatCardContent, CardButton } from 'components/Card/Card';
import Modal from 'components/Modal';
import { UserNewNoteForm } from './UserNewNoteForm';
import CategoryForm from './CategoryForm';

import 'styles/Containers/DashboardHeader.scss';

export const DashboardHeader = () => {
  const userNotes = useSelector((store) => store.userNotesReducer);
  const [modalState, setModalState] = useState(false);
  const [mNewCategory, setMNewCategory] = useState(false);

  const showAddNewNote = () => {
    setModalState(!modalState);
  };

  const showMNewCategory = () => {
    setMNewCategory(!mNewCategory);
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
      <CardButton label="Nueva Categoria" onClick={showMNewCategory} />
      <CardButton label="Nueva nota" onClick={showAddNewNote} />
      <Modal active={modalState} changeStatus={showAddNewNote} title="Agregar una nueva nota">
        <UserNewNoteForm afterCreate={afterCreateNote} />
      </Modal>
      <Modal active={mNewCategory} changeStatus={showMNewCategory} fullScreen>
        <CategoryForm />
      </Modal>
    </section>
  );
};
