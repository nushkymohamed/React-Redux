import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import sortIcon from '../../assets/images/svg-images/sort-arrow.svg';
import { uuidv4 } from '../../Helper';
import { singleCountryType } from '../../redux/common/commonReducer';
import {
  filterSingleGradeType,
  filterSingleSyllabusType,
} from '../../redux/filters/filtersReducer';
import { accessControlUser } from '../../redux/product/productReducer';
import {
  UserListPaginated,
  UserType,
} from '../../redux/userManagement/userManagementReducer';
import NoContent from '../CreateProduct/NoContent/NoContent';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Modal from './Modal';

type AddUserModalProps = {
  onClickAway: Function;
  userData: UserListPaginated;
  page: number;
  onPageClick?: (clickedPage: number) => void;
  setSearchText: (searchQuery: string) => void;
  totalRecords: number;
  userGrades: filterSingleGradeType[] | null;
  userCountries: singleCountryType[] | null;
  userSyllabuses: filterSingleSyllabusType[] | null;
  addSelectedUsers: Function;
  existingUsers: accessControlUser[];
  userPageSize: number;
  loading: boolean;
};

const AddUserModal: FC<AddUserModalProps> = ({
  onClickAway,
  userData,
  setSearchText,
  page,
  totalRecords,
  userCountries,
  userGrades,
  userSyllabuses,
  addSelectedUsers,
  existingUsers,
  userPageSize,
  loading,
}) => {
  const { t } = useTranslation();
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  const columns = useMemo(() => {
    const titles = [
      {
        name: 'Name',
        id: uuidv4(),
      },
      {
        name: 'Email',
        id: uuidv4(),
      },
      {
        name: 'Grade',
        id: uuidv4(),
      },
      {
        name: 'Country',
        id: uuidv4(),
      },
      {
        name: 'Syllabus',
        id: uuidv4(),
      },
    ];

    return titles;
  }, []);

  const getCountryDetails = (countryCode: string | undefined) => {
    if (!countryCode) return null;
    return userCountries?.find(country => country.countryCode === countryCode);
  };
  const getGradeDetails = (gradeId: string | undefined) => {
    if (!gradeId) return null;
    return userGrades?.find(grade => grade._id === gradeId);
  };
  const getSyllabusDetails = (syllabusId: string | undefined) => {
    if (!syllabusId) return null;
    return userSyllabuses?.find(sullabus => sullabus._id === syllabusId);
  };

  const addOrRemoveUser = (userId: string, selected: boolean) => {
    if (selected) {
      setSelectedUserIds(currentIds => [...currentIds, userId]);
      const newUser = eligibleUsers?.find(u => u._id === userId);
      newUser && setSelectedUsers(currentUsers => [...currentUsers, newUser]);
    } else {
      setSelectedUserIds(currentIds => currentIds.filter(id => id !== userId));
      setSelectedUsers(currentUsers =>
        currentUsers.filter(u => u._id !== userId)
      );
      if (allSelected) commonSelect(false, false);
    }
  };

  const selectAll = () => {
    setSelectedUserIds(eligibleUsers.map(u => u._id));
    setSelectedUsers(eligibleUsers);
  };

  const selectNone = () => {
    setSelectedUserIds([]);
    setSelectedUsers([]);
  };

  const commonSelect = (select: boolean, update = true) => {
    if (select) {
      setAllSelected(true);
      update && selectAll();
    } else {
      setAllSelected(false);
      update && selectNone();
    }
  };

  const eligibleUsers = useMemo(() => {
    const existingUserIds = existingUsers.map(u => u._id);

    return userData[page]?.filter(u => !existingUserIds.includes(u._id)) || [];
  }, [userData, page, existingUsers]);

  const UserRow = ({ user, key }: { user: UserType; key: string }) => {
    return (
      <div className="createTable-table__table--row">
        <div className="createTable-table__table--column">
          <input
            className="form-input--checkbox"
            type="checkbox"
            id={`studentSelect_${user?._id}`}
            onChange={e => {
              addOrRemoveUser(user._id, e.target.checked);
            }}
            checked={selectedUserIds.includes(user._id)}
          />
          <label htmlFor={`studentSelect_${user?._id}`}></label>
        </div>
        <div className="createTable-table__table--column">
          {user.firstName} {user.lastName}
        </div>
        <div className="createTable-table__table--column">{user.email}</div>
        <div className="createTable-table__table--column">
          {getGradeDetails(user.currentGradeId)?.name}
        </div>
        <div className="createTable-table__table--column">
          {getCountryDetails(user.countryCode)?.name}
        </div>
        <div className="createTable-table__table--column">
          {getSyllabusDetails(user.currentSyllabusId)?.name}
        </div>
      </div>
    );
  };

  return (
    <Modal
      onClickAway={onClickAway}
      customClassName={'addTutorPopUp studentSelect'}
    >
      <div className="popup--content table--addTutor table--addUser">
        <div>
          <h3>{t('Add Students')}</h3>
          <div className="createTable-table__table--searchBar-filters form">
            <input
              type="text"
              id="search"
              name="search"
              className="form-input form-input--search"
              placeholder={t('Search by Name/Email')}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
        </div>
        {loading ? (
          <LoadingScreen extraClass="smallContainer" />
        ) : eligibleUsers.length ? (
          <>
            <div className="createTable-table__table--header">
              <div className="createTable-table__table--row">
                <div className="createTable-table__table--column">
                  <input
                    className="form-input--checkbox"
                    id="selector"
                    type="checkbox"
                    name="selectAll"
                    checked={allSelected}
                    onChange={e => commonSelect(e.target.checked)}
                  />
                  <label htmlFor="selector"></label>
                </div>
                {columns?.map(col => {
                  return (
                    <div
                      key={col.id}
                      className="createTable-table__table--column"
                    >
                      <span>
                        <img
                          src={sortIcon}
                          className="icon extra-small-icon marginRight"
                        />
                      </span>
                      {t(col.name)}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="createTable-table__table--body">
              {eligibleUsers?.map(user => (
                <UserRow user={user} key={user._id} />
              ))}
            </div>
          </>
        ) : (
          <NoContent message={t('Search users to add')} />
        )}
        <div className="createTable-table__table--footer">
          <div className="createTable-table__table--footer-left"></div>
          <div className="createTable-table__table--footer-right">
            <button
              type="button"
              onClick={() => {
                addSelectedUsers(selectedUsers);
                onClickAway();
              }}
              className="btn btn--primary"
            >
              {selectedUserIds.length ? t('Add') : t('Close')}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal;
