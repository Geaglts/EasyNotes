import { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';

import { SimpleInput, SimpleTextArea } from '@components/Input';
import Button from '@components/Button';

import { updateCategory } from '@api/categories';
import FormControl from '@utils/classes/FormControl';

import styles from '@styles/pages/users/categories/UpdateCategoryModal.module.scss';

/**
 * @param {boolean} active
 * @param {() => void} onClose
 */
function UpdateCategoryModal(props) {
  const formRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { encryptData } = new FormControl(formRef.current);
    const response = await updateCategory(props.category.id, encryptData);
    console.log(response);
  };

  if (!props.category) return null;

  return (
    <Modal
      active={props.active}
      changeStatus={props.onClose}
      title={'Actualizar categoría'}
    >
      <form ref={formRef} onSubmit={onSubmit} className={styles.container}>
        <SimpleInput
          placeholder={'título de la categoría'}
          name="name"
          defaultValue={props.category.name}
        />
        <SimpleTextArea
          classes={[styles.description]}
          placeholder={'descripción de la categoría'}
          name="description"
          defaultValue={props.category.description}
        />
        <Button type={'submit'} label={'Actualizar'} />
      </form>
    </Modal>
  );
}

UpdateCategoryModal.defaultProps = {
  active: false,
  onClose: () => {},
};

UpdateCategoryModal.propTypes = {
  active: PropTypes.bool,
  onClose: PropTypes.func,
  category: PropTypes.object,
};

export default UpdateCategoryModal;
