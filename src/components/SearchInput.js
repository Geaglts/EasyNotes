import React, { useState } from 'react';

import styles from '@styles/Components/SearchInput.module.scss';

const SearchInput = () => {
  const [searchContext, setSearchContext] = useState(0);

  const handleChangeContext = () => {
    setSearchContext((prev) => (prev === 1 ? 0 : 1));
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="ingresa el nombre de la nota..."
      />
      <button onClick={handleChangeContext} className={styles.context}>
        {searchContext === 0 ? 'local' : 'global'}
      </button>
      <button className={styles.clear}>X</button>
    </div>
  );
};

export default SearchInput;
