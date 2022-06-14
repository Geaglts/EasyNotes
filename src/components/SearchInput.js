import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styles from '@styles/Components/SearchInput.module.scss';

const SearchInput = ({ onLocalFilter }) => {
  const [searchContext, setSearchContext] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchValue('');
    dispatch(onLocalFilter(null));
  }, [searchContext]);

  const handleChangeContext = () => {
    setSearchContext((prev) => (prev === 1 ? 0 : 1));
  };

  const onChangeSearchedValue = async (evt) => {
    setSearchValue(evt.target.value);
    if (searchContext === 0) {
      dispatch(onLocalFilter(evt.target.value));
    }
  };

  const clearSearchedValue = () => {
    setSearchValue('');
    if (searchContext === 0) {
      dispatch(onLocalFilter(null));
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="ingresa el nombre de la nota..."
        onChange={onChangeSearchedValue}
        value={searchValue}
      />
      {searchValue !== '' && (
        <button className={styles.clear} onClick={clearSearchedValue}>
          X
        </button>
      )}
      <button onClick={handleChangeContext} className={styles.context}>
        {searchContext === 0 ? 'local' : 'global'}
      </button>
    </div>
  );
};

export default SearchInput;
