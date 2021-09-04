import { useState, FormEvent } from 'react';

import { HandleChange } from '../types';

interface useFormProps {
  initialState: object;
  submit: (values: any) => void;
}

function useForm(props: useFormProps) {
  const [values, setValues] = useState(props.initialState || {});
  const handleChange = (name: string) => (event: HandleChange) => {
    setValues({ ...values, [name]: event.currentTarget.value });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.submit(values);
  };
  const propsByName = (name: string) => ({
    onChange: handleChange(name),
    name,
    id: name,
  });
  return { values, propsByName, handleSubmit };
}

export default useForm;
