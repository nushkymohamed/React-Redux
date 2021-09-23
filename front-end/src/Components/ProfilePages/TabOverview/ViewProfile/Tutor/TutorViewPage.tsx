import React, { FC, useState, useEffect } from 'react';

import { AiFillCaretDown } from 'react-icons/ai';
import moment from 'moment';

import ProfileImage from '../../../../ProfileImage/ProfileImage';

import { useTranslation } from 'react-i18next';
import { userTypes } from '../../../../../config/constants';

interface TutorViewPageProps {
  userData: any;
  tutorEducatinalData?: any;
  countryData?: any;
  isEdit?: boolean;
  userOrigin?: boolean;
}

const TutorViewPage: FC<TutorViewPageProps> = ({
  userData,
  tutorEducatinalData,
  isEdit,
  countryData,
  userOrigin,
}) => {
  const { t } = useTranslation();
  const [activeCountryId, setActiveCountryId] = useState<number>(-1);

  const handleActiveState = (activeId: number) => {
    if (activeCountryId === activeId) {
      setActiveCountryId(-1);
    } else {
      setActiveCountryId(activeId);
    }
  };

  const getData = (text: any) => {
    return text || t('No Data Available');
  };
  return (
    <div className="createContent user-details-page">
      <ProfileImage
        isEdit={false}
        userData={userData}
        userType={userTypes.tutor}
      />
      <div className="container">
        <div className="createContent__wrapper">
          <div className="createContent__body">
            <div className="createContent__body--content">
              <div className="user--details__wrapper">
                <h3 className="user--details__title">{t('Overview')}</h3>
                <div className="user--details__content">
                  <div className="user--details__content-row--wrapper">
                    <div className="user--details__content-row personalInfo">
                      <div className="user--details__content-header">
                        <div className="user--details__content-title">
                          {t('Personal Information')}
                        </div>
                        <div className="user--details__content-buttons"></div>
                      </div>
                      <div className="user--details__content-body">
                        <div className="user--details__content-column">
                          <div className="user--details__content-innerRow">
                            {t('First Name')} :{' '}
                            <span>{userData?.firstName}</span>
                          </div>
                          <div className="user--details__content-innerRow">
                            {t('Last Name')} : <span>{userData?.lastName}</span>
                          </div>
                        </div>

                        <div className="user--details__content-column">
                          <div className="user--details__content-innerRow">
                            {t('Date of Birth')} :{' '}
                            <span>{getData(userData?.dob)}</span>
                          </div>
                          <div className="user--details__content-innerRow">
                            {t('Phone Number')} :{' '}
                            <span>{getData(userData?.phone)}</span>
                          </div>
                        </div>

                        <div className="user--details__content-column">
                          <div className="user--details__content-innerRow">
                            {t('Country')} :{' '}
                            <span>{getData(countryData?.name)}</span>
                          </div>

                          <div className="user--details__content-innerRow">
                            {t('Email')} : <span>{userData?.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="user--details__content-row--divider"></div>
                      <div className="user--details__content-row educationalInfo">
                        <div className="user--details__content-header">
                          <div className="user--details__content-title">
                            {t('Educational Information')}
                          </div>
                          <div className="user--details__content-buttons"></div>
                        </div>
                        {tutorEducatinalData ? (
                          tutorEducatinalData.map((data: any, index: any) => {
                            return (
                              <div
                                key={index}
                                className="user--details__content-accordion--header"
                                onClick={() => handleActiveState(index)}
                              >
                                <div className="user--details__content-accordion--innerHeader">
                                  <h4>{data.name}</h4>
                                  <AiFillCaretDown className="icon" />
                                </div>
                                {activeCountryId === index && (
                                  <div className="user--details__content-accordion--body">
                                    <div className="user--details__content-accordion--body-header">
                                      <div className="user--details__content-column">
                                        <div className="user--details__content-innerRow">
                                          {t('Syllabus')}
                                        </div>
                                      </div>
                                      <div className="user--details__content-column">
                                        <div className="user--details__content-innerRow">
                                          {t('Grade')}
                                        </div>
                                      </div>
                                      <div className="user--details__content-column">
                                        <div className="user--details__content-innerRow">
                                          {t('Subject/s')}
                                        </div>
                                      </div>
                                    </div>
                                    {data?.syllabus?.map(
                                      (syllabusData: any, index: number) => {
                                        return (
                                          <div key={'syllabus' + index}>
                                            <div className="user--details__content-accordion--body-body">
                                              <div className="user--details__content-column">
                                                <div className="user--details__content-innerRow">
                                                  {syllabusData.name}
                                                </div>
                                              </div>
                                              <div className="user--details__content-column">
                                                {syllabusData?.grades?.map(
                                                  (
                                                    gradesData: any,
                                                    index: number
                                                  ) => {
                                                    return (
                                                      <div
                                                        className="user--details__content-innerRow"
                                                        key={'grades' + index}
                                                      >
                                                        {gradesData.name}
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </div>
                                              <div className="user--details__content-column">
                                                {syllabusData?.grades?.map(
                                                  (gradesData: any) => {
                                                    {
                                                      return gradesData?.subjects?.map(
                                                        (
                                                          subjectData: any,
                                                          index: number
                                                        ) => {
                                                          return (
                                                            <div
                                                              className="user--details__content-innerRow"
                                                              key={
                                                                'subjects' +
                                                                index
                                                              }
                                                            >
                                                              {subjectData.name}
                                                            </div>
                                                          );
                                                        }
                                                      );
                                                    }
                                                  }
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <div>{t('No Data Available')}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorViewPage;
