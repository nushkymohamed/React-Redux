import React, { useEffect, useState } from 'react';
import useApi from '../../Hooks/useApi';

import {
  PAYMENT_SERVICE,
  productConstant,
  PRODUCT_SERVICE,
} from '../../config/constants';
import {
  GET_PRODUCT_FAILED,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUBSCRIPTION_STATS_FAILED,
  GET_PRODUCT_SUBSCRIPTION_STATS_REQUEST,
  GET_PRODUCT_SUBSCRIPTION_STATS_SUCCESS,
  GET_PRODUCT_SUCCESS,
} from '../../redux/product/productTypes';
import ProductList from '../../Components/Product/ProductList';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store';
import {
  GET_CURRENCY_FAILED,
  GET_CURRENCY_REQUEST,
  GET_CURRENCY_SUCCESS,
} from '../../redux/common/commonTypes';
import { productSubscription } from '../../redux/product/productReducer';

const ViewProductContainer = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(productConstant.productPage);
  const [productRequest] = useApi();
  const [currencyRequest] = useApi();
  const [productSubscriptionRequest] = useApi();

  const {
    products,
    productTotalRecords,
    productSize,
    productsLoading,
    productSubscriptionDetails,
  } = useSelector((state: RootStore) => state.products);

  const onSearch = (value: string) => {
    setSearch(value);
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

  const getProducts = (page: number) => {
    productRequest(
      `/products?page=${page}&size=${productSize}`,
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

  const getCurrencies = (currencyIds: string[]) => {
    currencyRequest(
      `/currencies?page=1&size=${currencyIds.length}&currencyIds=${currencyIds}`,
      GET_CURRENCY_REQUEST,
      GET_CURRENCY_SUCCESS,
      GET_CURRENCY_FAILED,
      {},
      {},
      'GET',
      false,
      PAYMENT_SERVICE,
      {}
    );
  };

  const getProductSubscriptionStats = (productIds: string[]) => {
    productSubscriptionRequest(
      `/user-subscriptions/stats/product-user-subscription-stat?productIds=${productIds}&page=1&size=${productIds.length}`,
      GET_PRODUCT_SUBSCRIPTION_STATS_REQUEST,
      GET_PRODUCT_SUBSCRIPTION_STATS_SUCCESS,
      GET_PRODUCT_SUBSCRIPTION_STATS_FAILED,
      {},
      {},
      'GET',
      false,
      PAYMENT_SERVICE,
      {}
    );
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  useEffect(() => {
    let currencyIds: string[] = [];
    let productIds: string[] = [];

    const currentSubDetails = productSubscriptionDetails.map(
      (info: productSubscription) => info.productId
    );

    Object.values(products).forEach(productPage => {
      productPage.forEach(product => {
        if (
          !productIds.includes(product._id) &&
          !currentSubDetails.includes(product._id)
        ) {
          productIds.push(product._id);
        }
        if (product.currencyId && !currencyIds.includes(product.currencyId)) {
          currencyIds.push(product.currencyId);
        }
      });
    });
    if (currencyIds.length) {
      getCurrencies(currencyIds);
    }

    if (productIds.length) {
      getProductSubscriptionStats(productIds);
    }
  }, [products]);

  return (
    <ProductList
      products={products}
      page={page}
      size={productSize}
      totalRecords={productTotalRecords}
      onSearch={onSearch}
      onPageChange={onClickPage}
      productsLoading={productsLoading}
    />
  );
};

export default ViewProductContainer;
