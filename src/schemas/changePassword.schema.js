import * as Yup from 'yup';

export const changePasswordSchema = Yup.object().shape({
  newPassword: Yup.string().min(8, 'Su nueva contraseña debe tener al menos 8 caracteres').required('Su contraseña es requerida'),
});
