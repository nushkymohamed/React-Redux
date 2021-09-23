import React, { FC } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import user_avatar from '../../assets/images/default-profile-image.png';
import knodify_logo from '../../assets/images/knodify_logo.svg';
import notification from '../../assets/images/svg-images/icon-notification.svg';
import upload_icon from '../../assets/images/svg-images/icon-upload.svg';
import { UserDataTypes } from '../../redux/auth/authReducer';
import { singleNotification } from '../../redux/notifications/NotificationReducer';
import { HEADER_NOTIFICATION_RESET } from '../../redux/notifications/NotificationType';
import NotificationCard from '../Notification/NotificationsCard';

interface HeaderProps {
  gotoHomePage: () => void;
  gotoPage: (arg: string) => void;
  handleLogout: () => void;
  headerItemList: any[];
  isAdminView: boolean;
  isSelectedPage: (path: string) => boolean;
  isUserLoginFinalized: boolean;
  manageOptionsList: any[];
  notifications: singleNotification[];
  userData: UserDataTypes | null;
  userProfileImageUrl: string;
  notificationCount: number;
  isFullScreen: boolean;
}

const Header: FC<HeaderProps> = ({
  gotoHomePage,
  gotoPage,
  handleLogout,
  headerItemList,
  isAdminView,
  isSelectedPage,
  isUserLoginFinalized,
  manageOptionsList,
  notifications,
  userData,
  userProfileImageUrl,
  notificationCount,
  isFullScreen,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { firstName, lastName } = userData || {};
  const LinkItem = ({ item }: any) => (
    <li key={item.label}>
      <a
        href={item.path}
        className={item.className}
        data-tooltip={item.tooltip}
      >
        {t(item.label)}
      </a>
    </li>
  );

  const onClickGotoViewALl = () => {
    history.push('/notifications');
    dispatch({
      type: HEADER_NOTIFICATION_RESET,
    });
  };
  return (
    <div
      className="header"
      style={{ display: `${!isFullScreen ? 'block' : 'none'}` }}
    >
      <div className="container">
        <div className="header__content">
          <div className="header__logo" onClick={gotoHomePage}>
            <img
              src={knodify_logo}
              alt="knodify logo"
              className="header__logo"
            />
          </div>
          {isUserLoginFinalized && (
            <Menu right>
              <div className="header__rightarea">
                <div
                  data-tooltip="Disabled for demo version"
                  className="header__search tooltip-disabled"
                >
                  <input
                    className="form-input form-input--search"
                    type="search"
                    id="search"
                    name="search"
                    placeholder="Search"
                  />
                </div>
                <div className="header__nav navigation">
                  <ul>
                    {headerItemList.map(item => (
                      <li
                        className={`header__nav-item ${
                          isSelectedPage(item.path) ? 'selected' : ''
                        }`}
                        data-tooltip=""
                        key={item.label}
                      >
                        <span onClick={() => gotoPage(item.path)}>
                          {item.label}
                        </span>
                        <span className="admin-nav--icons">
                          <img
                            src="/static/media/icon-edit.2e3bcfd2.svg"
                            alt="edit-icon"
                            className="icon--edit"
                          />
                          <hr />
                          <img
                            src="/static/media/icon-delete.5afc980e.svg"
                            alt="delete-icon"
                            className="icon--delete"
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="header__user">
                  <ul>
                    <li className="header__nav-item notification">
                      <img
                        src={notification}
                        alt="notification-icon"
                        className="notification__icon"
                      />
                      {notificationCount > 0 && (
                        <div className="notification__count">
                          <p>{notificationCount}</p>
                        </div>
                      )}
                      <div className="notifications__dropdown">
                        <h5>{t('Notifications')}</h5>

                        {notifications.length ? (
                          notifications.map(notification => (
                            <NotificationCard notification={notification} />
                          ))
                        ) : (
                          <span className="noMessages">
                            {t('No Notifications Available')}
                          </span>
                        )}

                        <p
                          onClick={() => onClickGotoViewALl()}
                          className="view-all"
                        >
                          {t('View All')}
                        </p>
                      </div>
                    </li>
                    <li className="header__nav-item user">
                      <div
                        className="user_avatar"
                        style={{
                          backgroundImage: `url(${
                            userProfileImageUrl || user_avatar
                          })`,
                        }}
                      >
                        <div className="dropdown">
                          <div className="dropdown-content">
                            <div className="userdropdown">
                              <div className="userdropdown__wrapper">
                                <div className="userdropdown__settings">
                                  <div className="userdropdown__settings-manage">
                                    <h4>{t('Manage')}</h4>
                                    <ul>
                                      {manageOptionsList?.map(item => {
                                        if (item.isAdminView) {
                                          return isAdminView ? (
                                            <LinkItem
                                              item={item}
                                              key={item.label}
                                            />
                                          ) : null;
                                        } else {
                                          return (
                                            <LinkItem
                                              item={item}
                                              key={item.label}
                                            />
                                          );
                                        }
                                      })}
                                    </ul>
                                  </div>
                                  <div className="userdropdown__settings-loggedin">
                                    <h4>{t('Logged in as')}</h4>
                                    <ul>
                                      <li>
                                        <a className="active">{t('User')}</a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="userdropdown__settings-profile">
                                    <div
                                      className="image"
                                      style={{
                                        backgroundImage: `url(${
                                          userProfileImageUrl || user_avatar
                                        })`,
                                      }}
                                    ></div>
                                    <div className="description">
                                      <h2>{`${firstName || ''} ${
                                        lastName || ''
                                      }`}</h2>
                                      {userData?.currentGradeName && (
                                        <p>{userData?.currentGradeName}</p>
                                      )}
                                    </div>
                                    <div
                                      className="logout"
                                      onClick={handleLogout}
                                    >
                                      <img
                                        src={upload_icon}
                                        alt="upload-icon"
                                        className="icon--upload"
                                      />
                                      {t('Logout')}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <i className="dropdown-icon"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
