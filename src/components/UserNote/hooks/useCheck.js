import { useState } from 'react';

const useCheck = () => {
  const [pinCheck, setPinCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const togglePinCheck = () => {
    setPinCheck(!pinCheck);
  };

  const toggleContentView = () => {
    setShowContent(!showContent);
  };

  return { pinCheck, togglePinCheck, showContent, toggleContentView };
};

export default useCheck;
