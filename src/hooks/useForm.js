import { useState } from 'react';

function useForm({ initialState, submit }) {
  const [values, setValues] = useState(initialState || {});
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.currentTarget.value });
  };
  const cantSubmit = () => {
    for (let key in values) {
      const value = values[key];
      if (value === '' || value === NaN) return true;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    submit(values);
    setValues(initialState);
  };
  const propsByName = (name) => ({
    onChange: handleChange(name),
    name,
    id: name,
    value: values[name],
  });
  return { values, propsByName, handleSubmit, cantSubmit };
}

export default useForm;
