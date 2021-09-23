import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ViewProduct from '../../Components/Product/ViewProduct';
import {
  product,
  productSubscription,
} from '../../redux/product/productReducer';
import { RootStore } from '../../redux/store';

interface SingleProductContainerProps {
  product: product;
}

const SingleProductContainer: FC<SingleProductContainerProps> = ({
  product,
}) => {
  const [subscribers, setSubscribers] = useState(0);
  const [noOfUsers, setNoOfUsers] = useState(0);

  const { productSubscriptionDetails } = useSelector(
    (state: RootStore) => state.products
  );

  useEffect(() => {
    const details = productSubscriptionDetails.find(
      (info: productSubscription) => info.productId === product._id
    );

    if (details) {
      setNoOfUsers(details?.userCount);
      setSubscribers(details?.userCount);
    }
  }, [productSubscriptionDetails]);

  return (
    <ViewProduct
      product={product}
      noOfUsers={noOfUsers}
      users={subscribers}
    />
  );
};

export default SingleProductContainer;
