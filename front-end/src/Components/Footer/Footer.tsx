import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import knodify_logo from '../../assets/images/knodify_logo.svg';
import facebook_logo from '../../assets/images/svg-images/icon-facebook.svg';
import instagram_logo from '../../assets/images/svg-images/icon-instagram.svg';
import scrollUp from '../../assets/images/svg-images/icon-scrollUp.svg';
import twitter_logo from '../../assets/images/svg-images/icon-twitter.svg';

const Footer = () => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setVisible(true);
    } else if (scrolled <= 100) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <div className="footer">
      <div className="container">
        <div className="footer--wrapper">
          <div className="footer--top-row">
            <img
              src={knodify_logo}
              alt="knodify logo"
              className="footer__logo"
            />
            {visible ? (
              <img
                src={scrollUp}
                alt="knodify scrollup"
                className="footer__scrollup"
                onClick={scrollToTop}
              />
            ) : (
              <div />
            )}
          </div>
          <div className="footer--bottom-row">
            <div className="footer--bottom-row__column">
              <p className="footer--details-title">{t('Address')}</p>
              <p>
                Mr.M. Rajendran Blk 35 Mandalay Road,
                <br /># 13-37 Mandalay Towers,
                <br /> Singapore 308215
              </p>
              <p className="footer--details-title">Hotline</p>
              <p>+6517441258</p>
            </div>
            <div className="footer--bottom-row__column">
              <p className="footer--details-title">{t('Terms of Use')}</p>
              <p className="footer--details-title">{t('Contact us')}</p>
            </div>
            <div className="footer--bottom-row__column">
              <p className="footer--details-title">{t('Follow us on')}</p>
              <img
                src={facebook_logo}
                alt="knodify logo"
                className="footer__socialmedia"
              />
              <img
                src={twitter_logo}
                alt="knodify logo"
                className="footer__socialmedia"
              />
              <img
                src={instagram_logo}
                alt="knodify logo"
                className="footer__socialmedia"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
