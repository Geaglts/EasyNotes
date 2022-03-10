import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import 'styles/pages/Categories.scss';

import { Layout } from 'containers/Layout/Layout';
import { CardContainer, CardTitle, CardSubtitle } from 'components/Card/Card';
import { ConfirmButton } from 'components/Button';
import { Loading } from 'components/Loading';

import { Context } from 'context';
import { removeCategory } from 'actions/categories.actions';

const Categories = () => {
  const { theme } = useContext(Context);
  const dispatch = useDispatch();
  const uiIsLoading = useSelector((state) => state.ui.loading);
  const categoryList = useSelector((state) => state.categories.categories);

  const onDeleteCategory = (categoryId) => () => {
    dispatch(removeCategory(categoryId));
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
      <h2 className={`Categories-${theme}-Title`}>Categories</h2>
      <div className={`Categories-${theme}-List ${theme}`}>
        {categoryList.map((category) => {
          return (
            <CardContainer key={`Categories_${category.id}_${category.createdAt}`} height="110px" width="auto">
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
