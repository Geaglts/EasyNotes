import React, { useRef, useState } from 'react';
import axios from 'axios';

import 'styles/Containers/CategoryForm.scss';

import InputForm from 'components/InputForm';
import FormControl from 'utils/classes/FormControl';
import Button from 'components/Button';

import validate from 'utils/validate';
import { addCategorySchema } from 'schemas/category.schema';

const CategoryForm = ({ afterSubmit }) => {
  const form = useRef();
  const [error, setError] = useState({});

  const onAddCategory = async () => {
    const { encryptData, formData } = new FormControl(form.current);
    const validation = await validate({ schema: addCategorySchema, data: formData });
    if (validation.error) {
      const path = validation.errorDetails.path;
      setError({ [path]: validation.message });
      return;
    }
    const response = await axios.post('/api/v1/categories', encryptData);
    if (response.data.body) {
      form.current.reset();
      setError({});
      afterSubmit();
    }
  };

  return (
    <div className="CategoryForm">
      <h2 className="CategoryForm_Title">Nueva categoria</h2>
      <form ref={form} className="CategoryForm_Form">
        <InputForm placeholder="nombre de la categoria" name="name" error={error.name} />
        <InputForm placeholder="descripcion de la categoria" name="description" error={error.description} />
        <Button label="Agregar" onClick={onAddCategory} />
      </form>
    </div>
  );
};

export default CategoryForm;
