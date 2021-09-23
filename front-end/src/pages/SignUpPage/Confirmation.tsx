import React, { useState } from 'react';
import Modal from '../../Components/Modal/Modal';
import { useTranslation } from 'react-i18next';

import knodify_logo from '../../assets/images/knodify_logo.svg';

function Confirmation() {
  const { t } = useTranslation();

  const [isAccountModelOpen, setIsAccountModelOpen] = useState(false);

  return (
    <>
      <div className="signup-page signup-page--confirmation">
        <div className="container">
          <div className="signup-page__wrapper">
            <div className="signup-page__logo">
              <img src={knodify_logo} alt="logo-icon" className="icon--logo" />
            </div>
            <div className="signup-page__title">
              <h2>{t('You have signed up successfully')}</h2>
              <p>
                {t(
                  'You can try this service for 14 days or purchase a subscription'
                )}
              </p>
            </div>
            <div className="signup-page__buttons">
              <button type="button" className="btn btn--primary">
                {t('Try Knodify for 14 days')}
              </button>
              <button type="submit" className="btn btn--lightgreen">
                {t('Subscribe to Knodify')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isAccountModelOpen && (
        <Modal>
          <div className="popup--content">
            <h2>{t('Account is not verified')}</h2>
            <p>
              {t(
                'Your email address is not verified yet. please verify to continue'
              )}
            </p>
            <button type="submit" className="btn btn--primary">
              {t('Close')}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Confirmation;
