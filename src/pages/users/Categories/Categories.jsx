import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { Helmet } from 'react-helmet';

import { Layout } from '@containers/Layout/Layout';
import { CardContainer, CardTitle, CardSubtitle } from '@components/Card/Card';
import { ConfirmButton } from '@components/Button';
import { Loading } from '@components/Loading';
import Button from '@components/Button';
import { APP_NAME } from '@constants';

import UpdateCategoryModal from './components/UpdateCategoryModal';

import { useAuth } from '@hooks/useAuth';

import { Context } from '@context';
import { removeCategory, getCategories } from '@actions/categories.actions';

import styles from '@styles/pages/users/categories/Categories.module.scss';

const Categories = () => {
  const { theme } = useContext(Context);
  const [updateModalStatus, setUpdateModalStatus] = useState({ isActive: false });
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uiIsLoading = useSelector((state) => state.ui.loading);
  const categoryList = useSelector((state) => state.categories.categories);
  const { verifyToken } = useAuth();

  useEffect(() => {
    verifyToken().then((isValid) => {
      if (!isValid) {
        navigate('/login');
      } else {
        if (categoryList.length === 0) {
          dispatch(getCategories());
        }
      }
    });
  }, []);

  const onDeleteCategory = (categoryId) => () => {
    dispatch(removeCategory(categoryId));
  };

  const onClickUpdateCategory = (category) => {
    if (!category) return;
    setUpdateModalStatus({
      ...updateModalStatus,
      isActive: true,
    });
    setCategoryToUpdate(category);
  };

  const onGoBack = () => {
    verifyToken().then((isValid) => {
      if (!isValid) {
        navigate('/login');
      } else {
        navigate(-1);
      }
    });
  };

  if (uiIsLoading) {
    return (
      <Layout center>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout padding="16px 0">
      <Helmet>
        <title>{APP_NAME} | Mis categorías</title>
      </Helmet>
      <Button label="Regresar" classNames={[styles.goBack]} onClick={onGoBack} />
      <h2 className={styles.title}>Categories</h2>
      <div className={styles.categoriesContainer}>
        {categoryList.map((category) => {
          return (
            <CardContainer
              key={`Categories_${category.id}_${category.createdAt}`}
              height="100px"
              width="auto"
            >
              <CardTitle label={category.name} />
              <CardSubtitle label={category.description} />
              <div className={styles.bottomButtons}>
                <ConfirmButton
                  Icon={AiFillDelete}
                  onConfirm={onDeleteCategory(category.id)}
                />
                <button
                  className={styles.updateButton}
                  onClick={() => onClickUpdateCategory(category)}
                >
                  <BiRefresh />
                </button>
              </div>
            </CardContainer>
          );
        })}
      </div>
      <UpdateCategoryModal
        active={updateModalStatus.isActive}
        onClose={() =>
          setUpdateModalStatus({
            ...updateModalStatus,
            isActive: false,
          })
        }
        category={categoryToUpdate}
      />
    </Layout>
  );
};

export default Categories;
