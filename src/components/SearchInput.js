import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styles from '@styles/Components/SearchInput.module.scss';

const SearchInput = ({ onLocalFilter, onGlobalFilter, globalMode }) => {
  const [searchContext, setSearchContext] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchValue('');
    dispatch(onLocalFilter(null));
    if (searchContext === 1) {
      setLoading(true);
      dispatch(globalMode());
      setLoading(false);
    } else {
      dispatch(globalMode(true));
      dispatch(onLocalFilter(null));
      setSearchValue('');
    }
  }, [searchContext]);

  const handleChangeContext = () => {
    setSearchContext((prev) => (prev === 1 ? 0 : 1));
  };

  const onChangeSearchedValue = async (evt) => {
    setSearchValue(evt.target.value);
    dispatch(onLocalFilter(evt.target.value));
  };

  const clearSearchedValue = () => {
    setSearchValue('');
    dispatch(onLocalFilter(null));
    if (searchContext === 0) {
      dispatch(globalMode(true));
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
        {!loading && searchContext === 0 ? 'local' : 'global'}
      </button>
    </div>
  );
};

export default SearchInput;
