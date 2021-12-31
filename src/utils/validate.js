async function validate({ schema, data }) {
  try {
    const approvedValidation = await schema.validate(data, { stripUnknown: true });
    return { data: approvedValidation, message: 'approved', approved: true };
  } catch (error) {
    const { message } = JSON.parse(JSON.stringify(error));
    return { data: null, message, approved: false, error: true };
  }
}

export default validate;
