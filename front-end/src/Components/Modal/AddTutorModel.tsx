import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import sortIcon from '../../assets/images/svg-images/sort-arrow.svg';
import { uuidv4 } from '../../Helper';
import { singleCountryType } from '../../redux/common/commonReducer';
import {
  filterSingleGradeType,
  filterSingleSubjectType,
} from '../../redux/filters/filtersReducer';
import { reelTutors } from '../../redux/product/productReducer';
import {
  UserListPaginated,
  UserType,
} from '../../redux/userManagement/userManagementReducer';
import NoContent from '../CreateProduct/NoContent/NoContent';
import Modal from './Modal';

type AddTutorModeProps = {
  onClickAway: Function;
  userData: UserListPaginated;
  page: number;
  onPageClick: (clickedPage: number) => void;
  setSearchText: (searchQuery: string) => void;
  totalRecords: number;
  userGrades: filterSingleGradeType[] | null;
  userCountries: singleCountryType[] | null;
  userSyllabuses: filterSingleSubjectType[] | null;
  addSelectedUsers: Function;
  existingUsers: reelTutors[];
  userSubjects: filterSingleSubjectType[];
};

const AddTutorMode: FC<AddTutorModeProps> = ({
  onClickAway,
  userData,
  onPageClick,
  setSearchText,
  page,
  totalRecords,
  userCountries,
  userGrades,
  userSyllabuses,
  addSelectedUsers,
  existingUsers,
  userSubjects,
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
        name: 'Syllabus',
        id: uuidv4(),
      },
      {
        name: 'Subject',
        id: uuidv4(),
      },
    ];

    return titles;
  }, []);

  const pageCount = useMemo(() => {
    return Math.ceil(totalRecords / 10);
  }, [totalRecords]);

  const getCountryDetails = (countryCode: string | undefined) => {
    if (!countryCode) return null;
    return userCountries?.find(country => country.countryCode === countryCode);
  };
  const getGradeDetails = (subjectIds: string[]) => {
    if (!subjectIds) return null;
    const subjects = userSubjects?.filter(subject =>
      subjectIds?.includes(subject?._id)
    );
    const gradeIds = subjects?.map(sub => sub.gradeId);

    const grade = userGrades?.find(grade => gradeIds?.includes(grade?._id));

    return grade?.name;
  };

  const getSubjectsNames = (subjectIds: string[]) => {
    if (!subjectIds) return null;
    const subjects = userSubjects?.filter(subject =>
      subjectIds?.includes(subject?._id)
    );
    let name: string = '';
    if (subjects?.length) {
      subjects?.forEach(sub => {
        name = name + sub?.name + ' / ';
      });
    }
    return name && name.slice(0, name.length - 2);
  };

  const getSyllabusDetails = (subjectIds: string[]) => {
    if (!subjectIds) return null;
    const subjects = userSubjects?.filter(subject =>
      subjectIds?.includes(subject?._id)
    );
    const gradeIds = subjects?.map(sub => sub.gradeId);

    const grade = userGrades?.find(grade => gradeIds?.includes(grade?._id));

    return (
      (userSyllabuses &&
        userSyllabuses.find(syllabus => syllabus?._id === grade?.syllabusId)
          ?.name) ||
      ''
    );
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
            id={`tutorSelect_${user?._id}`}
            name="selectTutor"
            value="selectTutor"
            checked={selectedUserIds.includes(user._id)}
            onChange={e => {
              addOrRemoveUser(user._id, e.target.checked);
            }}
          />
          <label htmlFor={`tutorSelect_${user?._id}`}></label>
        </div>
        <div className="createTable-table__table--column">
          {user.firstName} {user.lastName}
        </div>
        <div className="createTable-table__table--column">{user?.email}</div>
        <div className="createTable-table__table--column">
          {getGradeDetails(user?.subjectIds || [])}
        </div>
        <div className="createTable-table__table--column">
          {getSyllabusDetails(user?.subjectIds || [])}
        </div>
        <div className="createTable-table__table--column">
          {getSubjectsNames(user?.subjectIds || [])}
        </div>
      </div>
    );
  };

  return (
    <Modal
      onClickAway={onClickAway}
      customClassName={'addTutorPopUp mainTutorTable'}
    >
      <div className="popup--content table--addTutor">
        <div>
          <h3>{t('Add Tutor')}</h3>
          <div className="createTable-table__table--searchBar-filters form">
            <input
              type="text"
              id="search"
              name="search"
              className="form-input form-input--search"
              placeholder={t('Search Tutor')}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
        </div>
        {eligibleUsers.length ? (
          <>
            <div className="createTable-table__table--header">
              <div className="createTable-table__table--row">
                <div className="createTable-table__table--column">
                  <input
                    className="form-input--checkbox"
                    type="checkbox"
                    id="selector"
                    name="selectAll"
                    value="selectAll"
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
            <div className="createTable-table__table--footer">
              <div className="createTable-table__table--footer-left">
                {pageCount > 0 && eligibleUsers.length ? (
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={({ selected }) => onPageClick(selected + 1)}
                    containerClassName={'react-paginate'}
                    activeClassName={'active'}
                    forcePage={page - 1}
                  />
                ) : null}
              </div>
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
          </>
        ) : (
          <NoContent message={t('No eligible tutors')} />
        )}
      </div>
    </Modal>
  );
};

export default AddTutorMode;
