import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Este correo no es valido').required('El correo es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});
