import { useState, useEffect } from 'react';

const useError = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  const showError = (errorMessage) => {
    setError(errorMessage);
  };

  return { error, showError };
};

export default useError;
