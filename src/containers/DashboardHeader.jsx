import { useState } from 'react';

import { CardButton } from '@components/Card/Card';
import Modal from '@components/Modal';

import { UserNewNoteForm } from './UserNewNoteForm';
import CategoryForm from './CategoryForm';

import '@styles/Containers/DashboardHeader.scss';

export const DashboardHeader = () => {
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
      <CardButton label="Nueva Categoria" onClick={showMNewCategory} />
      <CardButton label="Nueva nota" onClick={showAddNewNote} />
      <Modal active={modalState} changeStatus={showAddNewNote} title="Nueva nota">
        <UserNewNoteForm afterCreate={afterCreateNote} />
      </Modal>
      <Modal
        active={mNewCategory}
        changeStatus={showMNewCategory}
        title="Nueva categoría"
      >
        <CategoryForm afterSubmit={showMNewCategory} />
      </Modal>
    </section>
  );
};
