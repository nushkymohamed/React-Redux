import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import parent from '../../assets/images/signup-parent.png';
import student from '../../assets/images/signup-student.png';
import teacher from '../../assets/images/signup-teacher.png';

const Signup = ({ match }: any) => {
  const history = useHistory();
  const { t } = useTranslation();
  const signUpOptions = [
    {
      imageSrc: student,
      mainText: t('Sign up as Student'),
      subText: t('Self-paced, individualized learning'),
      type: 'student',
    },
    // TODO This will come with the next release
    // {
    //   imageSrc: parent,
    //   mainText: t('Sign up as Parent'),
    //   subText: t('Manage your child’s account and view stats'),
    //   type: 'parent',
    // },
    // {
    //   imageSrc: teacher,
    //   mainText: t('Sign up as Teacher'),
    //   subText: t('Upload your own content and mange sessions'),
    //   type: 'teacher',
    // },
  ];

  const handleSignUp = (signUpType: string) => {
    history.push(`${match.url}/${signUpType}`);
  };

  return (
    <>
      <div className="signup-page">
        <div className="container">
          <div className="signup-page__wrapper">
            <div className="signup-page__title">
              <h2>{t('Student Sign up')}</h2>
              <p>{t('Please choose the role most suitable for you.')}</p>
            </div>
            <div className="signup-page__selections">
              {signUpOptions.map(({ imageSrc, type, mainText, subText }) => (
                <div
                  onClick={() => handleSignUp(type)}
                  className="signup-page__selections-option"
                  key={type}
                >
                  <div
                    className="signup-page__selections-option--banner"
                    style={{ backgroundImage: `url(${imageSrc})` }}
                  >
                    <div className="signup-page__selections-option--banner-background"></div>
                    <div className="signup-page__selections-option--banner-text">
                      <h3>{mainText}</h3>
                      <p>{subText}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
