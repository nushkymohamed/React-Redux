import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import LoadingScreen from '../../../Components/LoadingScreen/LoadingScreen';
import { PRODUCT_SERVICE } from '../../../config/constants';
import useApi from '../../../Hooks/useApi';
import { subscriptionsTypes } from '../../../redux/common/commonReducer';
import {
  GET_PRODUCT_FAILED,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
} from '../../../redux/product/productTypes';
import { RootStore } from '../../../redux/store';
import SingleProductContainer from '../../ProductContainter/SingleProductContainer';
import { product } from '../../../redux/product/productReducer';
interface ViewSubscriptionProductsProps {
  selectedSubscription: subscriptionsTypes | null;
}

const ViewSubscriptionProducts: FC<ViewSubscriptionProductsProps> = ({
  selectedSubscription,
}) => {
  const { t } = useTranslation();
  const [productRequestApi] = useApi();

  const { products, productTotalRecords, productSize, productsLoading } =
    useSelector((state: RootStore) => state.products);
  const [page, setPage] = useState(1);

  const getProducts = (page: number) => {
    const productIds = selectedSubscription?.allowedProducts?.map(
      ({ productId }) => productId
    );

    productRequestApi(
      `/products?productIds=${productIds}&page=${page}&size=8`,
      GET_PRODUCT_REQUEST,
      GET_PRODUCT_SUCCESS,
      GET_PRODUCT_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_SERVICE
    );
  };

  const onClickPage = (pageNumber: number) => {
    setPage(pageNumber);
    if (
      !products[pageNumber]?.length ||
      products[pageNumber]?.length < productSize
    ) {
      getProducts(pageNumber);
    }
  };

  useEffect(() => {
    getProducts(1);
  }, []);
  const pageCount = useMemo(() => {
    return Math.ceil(productTotalRecords / productSize);
  }, [productTotalRecords]);
  return (
    <>
      {Object.keys(products)?.length ? (
        <div className="createContent__body--content">
          <div className="productContent--wrapper">
            {products[page] ? (
              products[page]?.map((product: product) => (
                <SingleProductContainer product={product} key={product._id} />
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
            onPageChange={({ selected }) => onClickPage(selected + 1)}
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
    </>
  );
};

export default ViewSubscriptionProducts;
