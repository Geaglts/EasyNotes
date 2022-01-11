async function validate({ schema, data }) {
  try {
    const approvedValidation = await schema.validate(data, { stripUnknown: true });
    return { data: approvedValidation, message: 'approved', approved: true };
  } catch (error) {
    const { message, ...rest } = JSON.parse(JSON.stringify(error));
    return { data: null, message, approved: false, error: true, errorDetails: rest };
  }
}

export default validate;
