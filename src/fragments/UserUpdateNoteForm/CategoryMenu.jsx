import React from 'react';
import classnames from '@utils/classnames';

import styles from '@styles/fragments/UserUpdateNoteForm/CategoryMenu.module.scss';

const CategoryMenu = ({ categories, selectedCategory, onChange, onClose }) => {
  return (
    <div className={styles.category_container}>
      <div className={styles.category_header}>
        <h3 className={styles.category_title}>Categorias</h3>
        <button className={styles.category_close} onClick={onClose}>
          cerrar
        </button>
      </div>
      <div className={styles.category_list}>
        {categories.map(({ id, name }) => {
          const isSelected = selectedCategory.some((category) => category.id === id);

          return (
            <button
              className={classnames(
                styles.category_name,
                styles[isSelected ? 'active' : 'inactive']
              )}
              key={id}
              onClick={() => {
                onChange(id);
              }}
            >
              {name.length < 12 ? name : name.slice(0, 12) + '..'}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMenu;
