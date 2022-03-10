import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import 'styles/pages/Categories.scss';

import { Layout } from 'containers/Layout/Layout';
import { CardContainer, CardTitle, CardSubtitle } from 'components/Card/Card';
import { ConfirmButton } from 'components/Button';
import { Loading } from 'components/Loading';
import Button from 'components/Button';

import { Context } from 'context';
import { removeCategory, getCategories } from 'actions/categories.actions';

const Categories = () => {
  const { theme } = useContext(Context);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uiIsLoading = useSelector((state) => state.ui.loading);
  const categoryList = useSelector((state) => state.categories.categories);

  useEffect(() => {
    if (categoryList.length === 0) {
      dispatch(getCategories());
    }
  }, []);

  const onDeleteCategory = (categoryId) => () => {
    dispatch(removeCategory(categoryId));
  };

  const onGoBack = () => {
    navigate(-1);
  };

  if (uiIsLoading) {
    return (
      <Layout center>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout padding="16px 24px">
      <Button label="Regresar" classNames={['Categories-GoBackButton']} onClick={onGoBack} />
      <h2 className={`Categories-${theme}-Title`}>Categories</h2>
      <div className={`Categories-${theme}-List ${theme}`}>
        {categoryList.map((category) => {
          return (
            <CardContainer key={`Categories_${category.id}_${category.createdAt}`} height="100px" width="auto">
              <CardTitle label={category.name} />
              <CardSubtitle label={category.description} />
              <div className="Categories-CardMenuBottom">
                <ConfirmButton Icon={AiFillDelete} onConfirm={onDeleteCategory(category.id)} />
              </div>
            </CardContainer>
          );
        })}
      </div>
    </Layout>
  );
};

export default Categories;
