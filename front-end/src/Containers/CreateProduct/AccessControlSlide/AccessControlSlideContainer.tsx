import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiFilter2Fill } from 'react-icons/ri';
import AccessControlTable from './AccessControlTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_USER_SUBSCRIPTIONS_FAILED,
  GET_USER_SUBSCRIPTIONS_REQUEST,
  GET_USER_SUBSCRIPTIONS_SUCCESS,
  GET_USER_SUBSCRIPTION_DETAILS_FAILED,
  GET_USER_SUBSCRIPTION_DETAILS_REQUEST,
  GET_USER_SUBSCRIPTION_DETAILS_SUCCESS,
  RESET_CREATE_PRODUCT,
  UPDATE_ACCESS_CONTROL_USERS_LIST,
  UPDATE_DEFAULT_PRODUCT_ACCESS,
  UPDATE_PRODUCT_USER_ACCESS_BULK,
  UPDATE_PRODUCT_USER_SPECIAL_PRICE_BULK,
} from '../../../redux/product/productTypes';
import { RootStore } from '../../../redux/store';
import AddUserModal from '../../../Components/Modal/AddUserModal';
import useApi from '../../../Hooks/useApi';
import {
  GET_ALL_USERS_FAILED,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_USER_COUNTRIES_FAILED,
  GET_USER_COUNTRIES_REQUEST,
  GET_USER_COUNTRIES_SUCCESS,
  GET_USER_GRADES_FAILED,
  GET_USER_GRADES_REQUEST,
  GET_USER_GRADES_SUCCESS,
  GET_USER_SYLLABUSES_FAILED,
  GET_USER_SYLLABUSES_REQUEST,
  GET_USER_SYLLABUSES_SUCCESS,
} from '../../../redux/userManagement/userManagementTypes';
import {
  CONTENT_SERVICE,
  PAYMENT_SERVICE,
  userTypes,
  USER_SERVICE,
} from '../../../config/constants';
import { FC } from 'react';
import { UserType } from '../../../redux/userManagement/userManagementReducer';
import moment from 'moment';
import {
  singleUserAccess,
  singleUserSpecialPrice,
} from '../../../redux/product/productReducer';
import SpecialPriceModal from '../../../Components/Modal/SpecialPriceModal';
import NoContent from '../../../Components/CreateProduct/NoContent/NoContent';
import InformationalModal from '../../../Components/CreateProduct/InformationalModal/InformationalModal';

interface AccessControlSliderProps {
  goToPrevious: () => void;
  onFormSubmit: (data: any) => void;
}

const AccessControlSlideContainer: FC<AccessControlSliderProps> = ({
  goToPrevious,
  onFormSubmit,
}) => {
  const { t } = useTranslation();
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [showSpecialPricePopup, setShowSpecialPricePopup] = useState(false);
  const [showItemsNotSelectedPopup, setShowItemsNotSelectedPopup] =
    useState(false);
  const [showPublishFailedPopup, setShowPublishFailedPopup] = useState(false);
  const [searchText, setSearchText] = useState('');

  const {
    allUsers,
    allUserCount,
    userGrades,
    userCountries,
    userSyllabuses,
    allUsersLoading,
  } = useSelector((state: RootStore) => state.userManagement);

  const {
    accessControl: { defaultAccess, users },
    countryCodeList,
    userSubscriptions,
    subscriptionDetails,
    productSaveLoading,
    productSaveError,
    productSaveSuccess,
  } = useSelector((state: RootStore) => state.products);

  const dispatch = useDispatch();
  const [getAllUsersApi] = useApi();
  const [getUserGradesApi] = useApi();
  const [getUserCountriesApi] = useApi();
  const [getUserSyllabusesApi] = useApi();
  const [getUserSubscriptionApi] = useApi();
  const [getSubscriptionDetailsApi] = useApi();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [multiSelectedItems, setMultiSelectedItems] = useState<any[]>([]);
  const [tableSearch, setTableSearch] = useState('');

  const setDefaultAccess = (access: boolean) => {
    dispatch({
      type: UPDATE_DEFAULT_PRODUCT_ACCESS,
      payload: { dataWrapper: { data: access } },
    });
  };

  const updateAccessControlUsers = (users: any) => {
    dispatch({
      type: UPDATE_ACCESS_CONTROL_USERS_LIST,
      payload: { dataWrapper: { data: users } },
    });
  };

  const updateAccess = (accessList: singleUserAccess[]) => {
    dispatch({
      type: UPDATE_PRODUCT_USER_ACCESS_BULK,
      payload: { dataWrapper: { data: accessList } },
    });
  };
  const updateSpecialPrice = (priceList: singleUserSpecialPrice[]) => {
    dispatch({
      type: UPDATE_PRODUCT_USER_SPECIAL_PRICE_BULK,
      payload: { dataWrapper: { data: priceList } },
    });
  };

  const handleSingleAccess = (uid: string, access: boolean) => {
    updateAccess([{ uid, access }]);
  };

  const handleSingleSpecialPrice = (uid: string, specialPrice: string) => {
    updateSpecialPrice([{ uid, specialPrice }]);
  };

  const setBulkSpecialPrice = (specialPrice: string) => {
    if (multiSelectedItems.length) {
      const priceList = multiSelectedItems.map(item => {
        return {
          uid: item._id,
          specialPrice,
        };
      });

      updateSpecialPrice(priceList);
    }
  };

  const Headers = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Grade',
        accessor: 'grade',
      },
      {
        Header: 'Access',
        accessor: 'access',
      },
      {
        Header: 'Subscription',
        accessor: 'subscription',
      },
      {
        Header: 'Special Price',
        accessor: 'specialPrice',
      },
      {
        Header: 'Date Joined',
        accessor: 'joinedDate',
      },
    ],
    []
  );
  const userPageSize = 20;

  const getAllUsers = (page: number) => {
    getAllUsersApi(
      `/users?page=${page}&size=${userPageSize}&direction=ASC&countryCodes=${countryCodeList}&type=${
        userTypes.student
      }${searchText ? `&search=${searchText}` : ''}`,
      GET_ALL_USERS_REQUEST,
      GET_ALL_USERS_SUCCESS,
      GET_ALL_USERS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE,
      { page }
    );
  };

  const getGradesForUsers = (gradeIds: string[]) => {
    gradeIds.length &&
      getUserGradesApi(
        `/grades?page=1&size=${gradeIds.length}&gradeIds=${gradeIds}`,
        GET_USER_GRADES_REQUEST,
        GET_USER_GRADES_SUCCESS,
        GET_USER_GRADES_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        {}
      );
  };

  const getCountriesForUsers = (countryCodes: string[]) => {
    countryCodes.length &&
      getUserCountriesApi(
        `/countries?page=1&size=${countryCodes.length}&countryCodes=${countryCodes}`,
        GET_USER_COUNTRIES_REQUEST,
        GET_USER_COUNTRIES_SUCCESS,
        GET_USER_COUNTRIES_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        {}
      );
  };
  const getSyllabusesForUsers = (syllabusIds: string[]) => {
    syllabusIds.length &&
      getUserSyllabusesApi(
        `/syllabuses?page=1&size=${syllabusIds.length}&syllabusIds=${syllabusIds}`,
        GET_USER_SYLLABUSES_REQUEST,
        GET_USER_SYLLABUSES_SUCCESS,
        GET_USER_SYLLABUSES_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        {}
      );
  };

  const getSubscriptionsOfUsers = (userIds: string[]) => {
    userIds.length &&
      getUserSubscriptionApi(
        `/user-subscriptions?userIds=${userIds}&size=${
          userIds.length * 2 //assuming a single user can have maximum 2 subscriptions
        }&page=1`,
        GET_USER_SUBSCRIPTIONS_REQUEST,
        GET_USER_SUBSCRIPTIONS_SUCCESS,
        GET_USER_SUBSCRIPTIONS_FAILED,
        {},
        {},
        'GET',
        false,
        PAYMENT_SERVICE
      );
  };

  const addSelectedUsers = (userList: UserType[]) => {
    setSelectedUsers(currentUsers => [...currentUsers, ...userList]);
    userList.length && getSubscriptionsOfUsers(userList.map(u => u._id));
  };

  const getSubscriptionDetails = (subscriptionIds: string[]) => {
    subscriptionIds.length &&
      getSubscriptionDetailsApi(
        `/subscriptions?subscriptionIds=${subscriptionIds}&size=${subscriptionIds.length}&page=1`,
        GET_USER_SUBSCRIPTION_DETAILS_REQUEST,
        GET_USER_SUBSCRIPTION_DETAILS_SUCCESS,
        GET_USER_SUBSCRIPTION_DETAILS_FAILED,
        {},
        {},
        'GET',
        false,
        PAYMENT_SERVICE
      );
  };

  useEffect(() => {
    if (userSubscriptions.length) {
      const subIds = userSubscriptions.map(
        ({ subscriptionId }) => subscriptionId
      );

      const existingSubs = subscriptionDetails.map(({ _id }) => _id);

      getSubscriptionDetails(subIds.filter(id => !existingSubs.includes(id)));
    }
  }, [userSubscriptions]);

  useEffect(() => {
    if (!selectedUsers.length) return;
    const existingUsers = users.map(u => u._id);
    const formattedNewUsers = selectedUsers
      .filter(u => !existingUsers.includes(u._id))
      .map(user => {
        return {
          ...user,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),

          grade: userGrades?.find(grade => grade._id === user.currentGradeId)
            ?.name,
          access: true,
          subscription:
            getUserSubscriptionDetails(user._id)?.subscriptionName || 'No',
          joinedDate: moment(user.joinedDate).format('DD/MM/YYYY'),
          specialPrice: '',
        };
      });
    updateAccessControlUsers([...users, ...formattedNewUsers]);
    setSelectedUsers([]);
  }, [selectedUsers]);

  const getUserSubscriptionDetails = (uid: string) => {
    const sub = userSubscriptions.find(({ userId }) => uid === userId);
    let userSubDetails = null;
    if (sub) {
      userSubDetails = subscriptionDetails.find(
        ({ _id }) => sub.subscriptionId === _id
      );
    }
    return userSubDetails;
  };

  useEffect(() => {
    if (subscriptionDetails.length) {
      const subDetailsAdded = users.map(u => {
        if (u.subscription !== 'No') return u;
        return {
          ...u,
          subscription:
            getUserSubscriptionDetails(u._id)?.subscriptionName || 'No',
        };
      });

      updateAccessControlUsers(subDetailsAdded);
    }
  }, [subscriptionDetails]);

  useEffect(() => {
    countryCodeList?.length && getAllUsers(1);
  }, [countryCodeList]);

  useEffect(() => {
    if (allUsers[currentPage]?.length) {
      const gradeIdList: string[] = [];
      const countryCodeList: string[] = [];
      const syllabusList: string[] = [];
      allUsers[currentPage].forEach(user => {
        if (user.type === userTypes.student) {
          if (
            user.currentGradeId &&
            !gradeIdList.includes(user.currentGradeId)
          ) {
            gradeIdList.push(user.currentGradeId);
          }
          if (
            user.currentSyllabusId &&
            !syllabusList.includes(user.currentSyllabusId)
          ) {
            syllabusList.push(user.currentSyllabusId);
          }
        }
        if (!countryCodeList.includes(user.countryCode)) {
          countryCodeList.push(user.countryCode);
        }
      });

      const availableGradeData = userGrades?.map(grade => grade._id) || [];
      const availableSyllabusData =
        userSyllabuses?.map(syllabus => syllabus._id) || [];
      const availableCountryData =
        userCountries?.map(country => country.countryCode) || [];

      const filteredGradeIds = gradeIdList.filter(
        grade => !availableGradeData?.includes(grade)
      );
      const filteredCountryCodes = countryCodeList.filter(
        countryCode => !availableCountryData?.includes(countryCode)
      );
      const filteredSyllabusIds = syllabusList.filter(
        syllabus => !availableSyllabusData?.includes(syllabus)
      );

      filteredGradeIds.length && getGradesForUsers(filteredGradeIds);
      filteredCountryCodes.length && getCountriesForUsers(filteredCountryCodes);
      filteredSyllabusIds.length && getSyllabusesForUsers(filteredSyllabusIds);
    }
  }, [allUsers]);

  let searchTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      setCurrentPage(1);
      getAllUsers(1);
    }, 2000);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchText]);

  const onPageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);

    if (
      !allUsers[selectedPage]?.length ||
      allUsers[selectedPage]?.length < userPageSize
    ) {
      getAllUsers(selectedPage);
    }
  };

  const onSetAccessClick = () => {
    if (multiSelectedItems.length) {
      const accessEnabled = multiSelectedItems.every(
        item => item.access === true
      );

      let updatedAccess = [];
      if (accessEnabled) {
        updatedAccess = multiSelectedItems.map(item => {
          return {
            uid: item._id,
            access: false,
          };
        });
      } else {
        updatedAccess = multiSelectedItems.map(item => {
          return {
            uid: item._id,
            access: true,
          };
        });
      }
      updateAccess(updatedAccess);
    }
  };

  const onRemoveClick = () => {
    if (multiSelectedItems.length) {
      multiSelectedItems.length === users.length && setMultiSelectedItems([]);
      const selectedIds = multiSelectedItems.map(item => item._id);

      updateAccessControlUsers(
        users.filter(user => !selectedIds.includes(user._id))
      );
    }
  };

  useEffect(() => {
    if (!productSaveLoading && productSaveError && !productSaveSuccess) {
      setShowPublishFailedPopup(true);
    }
  }, [productSaveError, productSaveLoading, productSaveSuccess]);

  const handleAddUserPopupClose = () => {
    setSearchText('');
  };

  return (
    <div>
      {showAddUserPopup && (
        <AddUserModal
          onClickAway={() => {
            setShowAddUserPopup(false);
            handleAddUserPopupClose();
          }}
          userData={allUsers}
          page={currentPage}
          onPageClick={onPageChange}
          totalRecords={allUserCount}
          userCountries={userCountries}
          userGrades={userGrades}
          userSyllabuses={userSyllabuses}
          setSearchText={setSearchText}
          addSelectedUsers={addSelectedUsers}
          existingUsers={users}
          userPageSize={userPageSize}
          loading={allUsersLoading}
        />
      )}
      {showSpecialPricePopup && (
        <SpecialPriceModal
          onClickAway={() => setShowSpecialPricePopup(false)}
          currentPrice={'0'}
          setBulkSpecialPrice={setBulkSpecialPrice}
        />
      )}
      {showItemsNotSelectedPopup && (
        <InformationalModal
          message={t('You have not selected any users')}
          closeActionText="Close"
          modelCloseAction={() => setShowItemsNotSelectedPopup(false)}
        />
      )}
      {showPublishFailedPopup && (
        <InformationalModal
          message={t('Failed to publish product')}
          closeActionText="Close"
          modelCloseAction={() => setShowPublishFailedPopup(false)}
        />
      )}
      <div className="createTable-table accessControlTable table__createProduct accessControlTable">
        <div className="createTable-table__wrapper">
          <div className="createTable-table__table">
            <div className="createTable-table__table--searchBar"></div>
            <div className="createTable-table__table--searchBar-filters form accessControl">
              <h4>{t('Default Access')}</h4>
              <div className="toggleSwitch">
                <label className="switch" htmlFor="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={defaultAccess}
                    onChange={e => setDefaultAccess(e.target.checked)}
                  />
                  <div
                    className={`slider round ${
                      defaultAccess ? 'Denied' : 'Granted'
                    }`}
                  >
                    <p>{defaultAccess ? t('Granted') : t('Denied')}</p>
                  </div>
                </label>
              </div>
              <input
                type="text"
                id="search"
                name="search"
                className="form-input form-input--search"
                placeholder={t('Search Name')}
                onChange={e => setTableSearch(e.target.value)}
                value={tableSearch}
              />
            </div>

            {users.length ? (
              <AccessControlTable
                columns={Headers}
                data={users}
                handleSingleAccess={handleSingleAccess}
                setMultiSelectedItems={setMultiSelectedItems}
                searchText={tableSearch}
                handleSingleSpecialPrice={handleSingleSpecialPrice}
              />
            ) : (
              <NoContent message={t('No users added')} />
            )}

            {/* Footer */}
            <div className="createTable-table__table--footer">
              <div className="createTable-table__table--footer-left">
                <button
                  className="btn btn--secondary btn--roundEdges"
                  type="button"
                  onClick={() => {
                    multiSelectedItems.length
                      ? setShowSpecialPricePopup(true)
                      : setShowItemsNotSelectedPopup(true);
                  }}
                >
                  {t('Set Special Price')}
                </button>
                <button
                  className="btn btn--primary btn--roundEdges"
                  type="button"
                  onClick={() => {
                    multiSelectedItems.length
                      ? onSetAccessClick()
                      : setShowItemsNotSelectedPopup(true);
                  }}
                >
                  {t('Set Access')}
                </button>
                <button
                  className="btn btn--green btn--roundEdges"
                  type="button"
                  onClick={() => {
                    multiSelectedItems.length
                      ? onRemoveClick()
                      : setShowItemsNotSelectedPopup(true);
                  }}
                >
                  {t('Remove')}
                </button>
              </div>
              <div className="createTable-table__table--footer-right">
                <button
                  className="btn btn--primary btn--roundEdges"
                  type="button"
                  onClick={() => setShowAddUserPopup(true)}
                >
                  {t('Add User')}
                </button>
              </div>
            </div>
            <div className="createTable-table__table--footer">
              <div className="createTable-table__table--footer-left" />
              <div className="createTable-table__table--footer-right">
                <button
                  className="btn btn--secondary btn--marginRight"
                  type="button"
                  onClick={goToPrevious}
                >
                  {t('Back')}
                </button>
                {productSaveLoading ? (
                  <button
                    className="btn btn--primary btn--roundEdges simpleLoading"
                    type="button"
                  >
                    {t('Publishing')}
                  </button>
                ) : (
                  <button
                    className="btn btn--primary"
                    type="button"
                    onClick={onFormSubmit}
                  >
                    {t('Publish')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControlSlideContainer;
