import { useState, FormEvent } from 'react';

import { HandleChange } from '../types';

interface useFormProps {
  initialState: object;
  submit: (values: any) => void;
}

function useForm({ initialState, submit }: useFormProps) {
  const [values, setValues] = useState(initialState || {});
  const handleChange = (name: string) => (event: HandleChange) => {
    setValues({ ...values, [name]: event.currentTarget.value });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(values);
    setValues(initialState);
  };
  const propsByName = (name: string) => ({
    onChange: handleChange(name),
    name,
    id: name,
    value: (<any>values)[name],
  });
  return { values, propsByName, handleSubmit };
}

export default useForm;
