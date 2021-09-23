import React, { FC, useEffect, useMemo, useState } from 'react';
import { product, productTypes } from '../../redux/product/productReducer';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiFilter2Fill } from 'react-icons/ri';
import { IoIosAdd } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import SingleProductContainer from '../../Containers/ProductContainter/SingleProductContainer';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

interface ProductListProps {
  products: productTypes['products'];
  size: number;
  page: number;
  totalRecords: number;
  productsLoading: productTypes['productsLoading'];

  onSearch(search: string): void;
  onPageChange(page: number): void;
}

const ProductList: FC<ProductListProps> = ({
  products,
  size,
  page,
  totalRecords,
  onSearch,
  onPageChange,
  productsLoading,
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    onSearch(search);
  }, [search]);

  const addProduct = () => {
    history.push('/admin/create-product');
  };

  const pageCount = useMemo(() => {
    return Math.ceil(totalRecords / size);
  }, [totalRecords]);

  return (
    <div className="createContent products-page">
      <div className="container">
        <div className="createContent__wrapper">
          <div className="createContent__header">
            <h2 className="page-title">{t('Products')}</h2>
            <button
              onClick={addProduct}
              className="btn btn--primary btn--green btn--roundEdges"
              type="button"
            >
              <IoIosAdd className="icon color-white verySmall-icon" />{' '}
              {t('Add Product')}
            </button>
          </div>
          <div className="createContent__body">
            <div className="createContent__body--header">
              <input
                placeholder={t('Search')}
                value={search}
                onChange={e => setSearch(e?.target?.value)}
                className="form-input--search"
              />
            </div>
          </div>
          {Object.keys(products)?.length ? (
            <div className="createContent__body--content">
              <div className="productContent--wrapper">
                {products[page] ? (
                  products[page]?.map((product: product) => (
                    <SingleProductContainer
                      product={product}
                      key={product._id}
                    />
                  ))
                ) : (
                  <LoadingScreen />
                )}
              </div>
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => onPageChange(selected + 1)}
                containerClassName={'react-paginate'}
                activeClassName={'active'}
              />
            </div>
          ) : productsLoading ? (
            <LoadingScreen />
          ) : (
            <div className="createContent__body--content empty">
              {t('No Products Available')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
