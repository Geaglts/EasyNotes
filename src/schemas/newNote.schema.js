import * as Yup from 'yup';

export const newNoteSchema = Yup.object().shape({
  title: Yup.string()
    .required('El título es requerido')
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(128, 'El título no puede tener más de 128 caracteres'),
  content: Yup.string()
    .required('La contenido es requerido')
    .min(3, 'La contenido debe tener al menos 3 caracteres'),
});
