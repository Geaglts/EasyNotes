import { useEffect, useState } from 'react';

function useFormError() {
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFormErrors([]);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [formErrors]);

  const addErrors = (errors = [{ message: 'Ocurrio un error', type: 'warning' }]) => {
    setFormErrors([...formErrors, ...errors]);
  };

  return { formErrors, addErrors };
}

export default useFormError;
