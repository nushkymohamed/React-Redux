import { Modal } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { loginVideoUrl } from '../../../config/constants';
import lock from '../../../assets/images/svg-images/icon-lock-white.svg';
import mail from '../../../assets/images/svg-images/icon-mail.svg';
import ButtonWithAnimation from '../../ButtonWithAnimation/ButtonWithAnimation';

interface LoginViewProps {
  handleSignIn: (submitFormData: any) => void;
  isAccountConfirmationModalOpen: boolean;
  loading: boolean;
  loginErrorMessage: string;
  setIsAccountConfirmationModalOpen: (isOpen: boolean) => void;
}

const LoginView: FC<LoginViewProps> = ({
  handleSignIn,
  isAccountConfirmationModalOpen,
  loading,
  loginErrorMessage,
  setIsAccountConfirmationModalOpen,
}) => {
  const { t } = useTranslation();

  const { register, handleSubmit, errors } = useForm();
  const [animationClassName, setAnimationClassName] = useState('');

  useEffect(() => {
    setAnimationClassName(loading ? 'btn btn--primary btn--loader active' : '');
  }, [loading]);

  return (
    <div className="loginscreen">
      <div className="loginscreen__wrapper">
        <div className="loginscreen__video">
          <video playsInline autoPlay muted loop id="loginscreen__video">
            <source src={loginVideoUrl} type="video/mp4" />
            <source src={loginVideoUrl} type="video/webm" />
          </video>
        </div>
        <div className="loginscreen__form form">
          <h3>
            {t(
              `With over 26,500 video lessons and other resources, you're guaranteed to find what you need to study.`
            )}
          </h3>

          <div className="form__form--fields">
            <form onSubmit={handleSubmit(handleSignIn)}>
              <div className="form--field">
                <img src={mail} alt="mail-icon" className="icon--mail" />
                <input
                  className="form-input"
                  type="text"
                  placeholder={t('Email Address or Username')}
                  ref={register({ required: true })}
                  name="username"
                />

                <span className="error email">
                  {errors.username && t("Username can't be empty")}
                </span>
              </div>
              <div className="form--field">
                <img src={lock} alt="lock-icon" className="icon--lock" />
                <input
                  className="form-input"
                  type="password"
                  placeholder={t('Password')}
                  ref={register({ required: true })}
                  name="password"
                />

                <span className="error password">
                  {errors.password && t("Password can't be empty")}
                </span>

                <div className="remember-me">
                  <input
                    className="form-input--checkbox"
                    type="checkbox"
                    id="remember-me"
                    name="remember-me"
                  />
                  <label htmlFor="remember-me">{t('Remember Me')}</label>
                </div>
                <a>{t('Forgot your password ?')}</a>
              </div>
              <span className="error common">{loginErrorMessage}</span>
              <div className="form--buttons">
                {!loading ? (
                  <button
                    className="btn btn--primary"
                    type="submit"
                    disabled={loading}
                  >
                    {t('Sign In')}
                  </button>
                ) : (
                  <ButtonWithAnimation
                    animationClassName={animationClassName}
                    onTransitionEnd={setAnimationClassName}
                  />
                )}
              </div>
            </form>

            <div className="form--field last">
              <p>
                {t("Don't have an account?")}
                <Link to="/signup/student">{t('Signup')}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {isAccountConfirmationModalOpen && (
        <Modal>
          <div className="popup--content">
            <h2>{t('Account is not verified')}</h2>
            <p>
              {t(
                'Your email address is not verified yet. please verify to continue'
              )}
            </p>
            <button
              type="submit"
              className="btn btn--primary"
              onClick={() => setIsAccountConfirmationModalOpen(false)}
            >
              {t('Close')}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LoginView;
