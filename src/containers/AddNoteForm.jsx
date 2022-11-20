import { useContext, useRef } from 'react';
import { connect } from 'react-redux';
import { MdSpa, MdSort, MdContentCopy } from 'react-icons/md';
import { IoIosAdd } from 'react-icons/io';

import Button from '@components/Button';
import Input from '@components/Input';
import Toast from '@components/Toast';

import { Context } from '@context';
import { addNote } from '@actions/notes.actions';
import useFormError from '@hooks/useFormError';

import { noteStorage } from '@storage';

// Validations
import validate from '@utils/validate';
import { newNoteSchema } from '@schemas/newNote.schema';

import styles from '@styles/Containers/AddNoteForm.module.scss';

function AddNoteForm({ onAddTodo }) {
  const { theme } = useContext(Context);
  const { formErrors, addErrors } = useFormError();
  const form = useRef(null);

  const handleCopy = () => {
    const formData = new FormData(form.current);
    const { title, content } = {
      title: formData.get('title'),
      content: formData.get('content'),
    };
    noteStorage.copy(`${title}\n${content}`);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = { title: formData.get('title'), content: formData.get('content') };
    const validatedData = await validate({ schema: newNoteSchema, data });
    if (!validatedData.approved) {
      const newError = { message: validatedData.message, type: 'danger' };
      addErrors([newError]);
      return;
    }
    onAddTodo(validatedData.data);
    form.current.reset();
  };

  return (
    <>
      <form
        ref={form}
        onSubmit={onSubmitForm}
        className={`${styles.container} ${styles[theme]}`}
      >
        <div className={styles.form_container}>
          <Input
            name="title"
            Icon={<MdSpa />}
            placeholder="¿Cuál es el nombre de tu nota?"
            classNames={[styles.title_input]}
          />
          <Input name="content" Icon={<MdSort />} placeholder="..." rows={5} />
        </div>
        <div className={styles.bottom_buttons}>
          <Button
            type="submit"
            classNames={[styles.add_note_button]}
            title="Agregar nota"
          >
            <IoIosAdd />
          </Button>
          <Button
            onClick={handleCopy}
            classNames={[styles.copy_button]}
            title="Copiar nota"
          >
            <MdContentCopy />
          </Button>
        </div>
      </form>
      <Toast messages={formErrors} />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo(note) {
      dispatch(addNote(note));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddNoteForm);
