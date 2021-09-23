import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../Components/Modal/Modal';

type PasswordChageErrorType = {
  code: string;
  message: string;
};

interface ChangePasswordPopupProps {
  onClickAway: any;
}

const ChangePasswordPopupContainer: FC<ChangePasswordPopupProps> = ({
  onClickAway,
}) => {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] =
    useState<PasswordChageErrorType | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const changePassword = () => {
    setLoading(true);
    if (!validate()) {
      setLoading(false);
      return;
    }
    Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, currentPassword, newPassword);
      })
      .then(data => {
        setPasswordChangeSuccess(true);
        setLoading(false);
      })
      .catch(err => {
        console.log('error', err);
        setPasswordError(err);
        setPasswordChangeSuccess(false);
        setLoading(false);
      });
  };

  const validate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage(t('Please fill all mandatory fields'));
      return false;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage(t('New password and password confirmation do not match'));
      return false;
    }

    setErrorMessage('');
    return true;
  };

  useEffect(() => {
    if (passwordError?.code) {
      switch (passwordError?.code) {
        case 'NotAuthorizedException':
          setErrorMessage(t('Current password is incorrect'));
          break;
        case 'InvalidPasswordException':
          setErrorMessage(passwordError?.message);
          break;
        case 'InvalidParameterException':
          setErrorMessage(t('Enter a valid password'));
          break;
        case 'LimitExceededException':
          setErrorMessage(passwordError?.message);
          break;
        default:
          setErrorMessage(t('Something went wrong. Try again later'));
          break;
      }
    }
  }, [passwordError]);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage('');
      setPasswordError(null);
    }
  }, [currentPassword, newPassword, confirmPassword]);

  useEffect(() => {
    if (passwordChangeSuccess) {
      resetAndClose();
    }
  }, [passwordChangeSuccess]);

  const resetAndClose = () => {
    setErrorMessage('');
    setPasswordError(null);
    setCurrentPassword('');
    setNewPassword('');
    onClickAway();
  };
  return (
    <Modal onClickAway={onClickAway}>
      <div className="popup--content changePassword">
        <h2>{t('CHANGE PASSWORD')}</h2>
        <div className="form">
          <div className={'form__form--field'}>
            <label>
              {t('Current Password')} <span>*</span>
            </label>
            <input
              className={'form-input'}
              type="password"
              placeholder={t('Enter Current Password')}
              onChange={e => {
                setCurrentPassword(e.target.value);
              }}
            />
          </div>
          <div className={'form__form--field'}>
            <label>
              {t('New Password')} <span>*</span>
            </label>
            <input
              className={'form-input'}
              type="password"
              placeholder={t('Enter New Password')}
              onChange={e => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <div className={'form__form--field'}>
            <label>
              {t('Confirm Password')} <span>*</span>
            </label>
            <input
              className={'form-input'}
              type="password"
              placeholder={t('Confirm Password')}
              onChange={e => {
                setConfirmPassword(e.target.value);
              }}
            />
            <span className="error">{errorMessage}</span>
          </div>
        </div>
        <div className="form__form--field buttons">
          {loading ? (
            <div className="btn btn--primary btn--curved simpleLoading">
              {t('Updating')}
            </div>
          ) : (
            <button
              type="button"
              className="btn btn--primary btn--curved"
              onClick={changePassword}
            >
              {t('Update')}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordPopupContainer;
