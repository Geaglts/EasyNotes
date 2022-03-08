import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import 'styles/pages/Categories.scss';

import { Layout } from 'containers/Layout/Layout';
import { CardContainer, CardTitle, CardSubtitle } from 'components/Card/Card';

import { Context } from 'context';

const Categories = () => {
  const { theme } = useContext(Context);
  const categoryList = useSelector((state) => state.categories.categories);

  return (
    <Layout padding="16px 24px">
      <h2 className={`Categories-${theme}-Title`}>Categories</h2>
      <div className={`Categories-${theme}-List ${theme}`}>
        {categoryList.map((category) => {
          return (
            <CardContainer key={`Categories_${category.id}_${category.createdAt}`} height="110px" width="auto">
              <CardTitle label={category.name} />
              <CardSubtitle label={category.description} />
              <div className="Categories-CardMenuBottom">Hola</div>
            </CardContainer>
          );
        })}
      </div>
    </Layout>
  );
};

export default Categories;
