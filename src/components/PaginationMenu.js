import { useSelector } from 'react-redux';

import arrowLeft from '@icons/left-arrow.svg';
import arrowRight from '@icons/right-arrow.svg';

import styles from '@styles/Components/PaginationMenu.module.scss';

const PaginationMenu = ({ children, previous = () => {}, next = () => {} }) => {
  const { page, totalPages } = useSelector(
    (state) => state.userNotesReducer.pagination
  );

  return (
    <div className={styles.container}>
      {page > 1 && (
        <img
          src={arrowLeft}
          alt="Página anterior"
          onClick={previous}
          className={styles.changePageButton}
        />
      )}
      {children}
      {page !== (totalPages ? totalPages : 1) && (
        <img
          src={arrowRight}
          alt="Página siguiente"
          onClick={next}
          className={styles.changePageButton}
        />
      )}
    </div>
  );
};

export default PaginationMenu;
