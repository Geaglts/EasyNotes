import * as Yup from 'yup';

export const addCategorySchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido').min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: Yup.string().required('La descripción es requerida').min(3, 'La descripción debe tener al menos 3 caracteres'),
});
