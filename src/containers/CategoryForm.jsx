import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SimpleTextArea, SimpleInput } from '@components/Input';
import FormControl from '@utils/classes/FormControl';
import Button from '@components/Button';

import { addCategory } from '@actions/categories.actions';

import validate from '@utils/validate';
import { addCategorySchema } from '@schemas/category.schema';

import '@styles/Containers/CategoryForm.scss';

const CategoryForm = ({ afterSubmit }) => {
  const form = useRef();
  const dispatch = useDispatch();
  const uiError = useSelector((state) => state.ui.error);
  const uiLoading = useSelector((state) => state.ui.loading);
  const [error, setError] = useState({});

  const onAddCategory = async () => {
    const { encryptData, formData } = new FormControl(form.current);
    const validation = await validate({ schema: addCategorySchema, data: formData });
    if (validation.error) {
      const path = validation.errorDetails.path;
      setError({ [path]: validation.message });
      return;
    }
    dispatch(addCategory(encryptData));
    if (!uiError) {
      form.current.reset();
      setError({});
      afterSubmit();
    }
  };

  return (
    <div className="CategoryForm">
      <form ref={form} className="CategoryForm_Form">
        <SimpleInput placeholder="nombre de la categoria" name="name" />
        <SimpleTextArea
          placeholder="descripcion de la categoria"
          name="description"
          classes={['CategoryForm_Form_TextArea']}
        />
        <Button label="Agregar" onClick={onAddCategory} disabled={uiLoading} />
      </form>
    </div>
  );
};

export default CategoryForm;
