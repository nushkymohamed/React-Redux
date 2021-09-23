import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../Components/Footer/Footer';
import { userRoles } from '../../config/constants';
import { RootStore } from '../../redux/store';

const FooterContainer = () => {
  const { user, isUserLoginFinalized } = useSelector(
    (state: RootStore) => state?.auth
  );
  const { isFullScreen } = useSelector((state: RootStore) => state.theater);

  return user?.roles.includes(userRoles?.student) && isUserLoginFinalized ? (
    <Footer />
  ) : null;
};

export default FooterContainer;
