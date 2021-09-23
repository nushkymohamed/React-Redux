import React from 'react';
import Modal from './Modal';
import { Auth } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import emailPaperFlight from '../../assets/images/svg-images/emailPaperFlight.svg';

const EmailResendModal = ({ email }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const resendEmail = async e => {
    e.preventDefault();
    await Auth.resendSignUp(email);
  };

  const redirectToLogin = () => {
    history.push('/login');
  };

  return (
    <div>
      <Modal>
        <div className="popup--content emailVerification">
          <a
            className="btn-close closemodale"
            aria-hidden="true"
            onClick={redirectToLogin}
          >
            &times;
          </a>
          <img src={emailPaperFlight} className="icon" />
          <p>{t('Check your email and click the verification link')}</p>
          <h2>{t('Email Verification')}</h2>
          <h4>
            {t("Didn't receive it?")}{' '}
            <a href="" onClick={resendEmail}>
              {t('Resend the email')}
            </a>
          </h4>
        </div>
      </Modal>
    </div>
  );
};

export default EmailResendModal;
