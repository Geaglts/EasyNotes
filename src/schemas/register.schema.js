import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required('Su nombre es requerido'),
  lastName: Yup.string().required('Sus apellidos son requeridos'),
  email: Yup.string().email('Este no es un correo electrónico válido').required('Su correo es requerido'),
  alias: Yup.string().min(3, 'El alias debe tener al menos 3 caracteres'),
  password: Yup.string().min(8, 'Su contraseña debe tener al menos 8 caracteres').required('Su contraseña es requerida'),
});
