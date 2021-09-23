import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import BasicInformation from '../../Components/CreateProduct/BasicInformation/BasicInformation';
import Modal from '../../Components/Modal/Modal';
import Overlay from '../../Components/Overlay/Overlay';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import {
  ContentSelectionTypes,
  contentType,
  CONTENT_SERVICE,
  PAYMENT_SERVICE,
  PRODUCT_PROGRESS_BAR_MENU_LIST,
  PRODUCT_SERVICE,
  ReelTypes,
  userTypes,
  USER_SERVICE,
} from '../../config/constants';
import {
  checkAnyContentSelectedWithTutor,
  getDistinctArray,
} from '../../Helper';
import useApi from '../../Hooks/useApi';
import {
  GET_COUNTRIES_FAILED,
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_CURRENCY_FAILED,
  GET_CURRENCY_REQUEST,
  GET_CURRENCY_SUCCESS,
  GET_GRADES_FAILED,
  GET_GRADES_REQUEST,
  GET_GRADES_SUCCESS,
  GET_SUBJECTS_FAILED,
  GET_SUBJECTS_REQUEST,
  GET_SUBJECTS_SUCCESS,
  GET_SYLLABUSES_FAILED,
  GET_SYLLABUSES_REQUEST,
  GET_SYLLABUSES_SUCCESS,
} from '../../redux/common/commonTypes';
import {
  accessControlType,
  featureReelTypes,
  productSubscriptionTypes,
  reelTutors,
  reelTypes,
  singleDataTypeWithValueAndLabel,
  tutorAndSelectedContent,
  tutorAndSelectedFeatureContent,
} from '../../redux/product/productReducer';
import {
  GET_REEL_ALL_TUTORS_FAILED,
  GET_REEL_ALL_TUTORS_REQUEST,
  GET_REEL_ALL_TUTORS_SUCCESS,
  RESET_CREATE_PRODUCT,
  SAVE_PRODUCT_FAILED,
  SAVE_PRODUCT_REQUEST,
  SAVE_PRODUCT_SUCCESS,
  SET_BASIC_INFORMATION,
  SET_SELECTED_COUNTRIES,
  UPDATE_FORMATTED_PRODUCT_DATA,
} from '../../redux/product/productTypes';
import { RootStore } from '../../redux/store';
import AccessControlSlideContainer from './AccessControlSlide/AccessControlSlideContainer';
import FeatureReelSlide from './FeatureReelSlide/FeatureReelSlide';
import ImageUploadContainer from './ImageUploadFile';
import ReelSlide from './ProductReelSlide/ReelSlide';
import SubscriptionsSlideContainer from './SubscriptionsSlide/SubscriptionsSlideContainer';
import TutorSlideContainer from './TutorSlide/TutorSlideContainer';

type singleSubjectAndTotalTutorType = {
  tutorsTotalRecords: number;
  subjectId: string;
};

type AccessControlStudent = {
  _id: string;
  accessGranted: boolean;
  subscriptionId?: string;
  specialPrice?: number;
};

const CreateProductContainer = () => {
  const [countryRequest] = useApi();
  const [currencyRequest] = useApi();
  const [subjectRequest] = useApi();
  const [allTutorRequest] = useApi();
  const [subjectAllTutorRequest] = useApi();
  const [getGradeRequest] = useApi();
  const [getSyllabusesRequest] = useApi();

  const [saveProductApi] = useApi();
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const [selectedSyllabusID, setSelectedSyllabusID] = useState(null);
  const [selectedGradeID, setSelectedGradeID] = useState(null);

  const sliderRef = useRef<any>();

  const {
    handleSubmit: basicHandleSubmit,
    errors: basicErrors,
    control: basicControl,
    setValue: basicSetValue,
  } = useForm({
    shouldFocusError: true,
    defaultValues: {
      isEligibleForTrials: false,
    },
  });

  const { countries, currency, currencyPage, countriesPage } = useSelector(
    (state: RootStore) => state.common
  );

  const {
    featureReel,
    countryCodeList,
    reels,
    featureReelAllSelectedContentIds,
    productTutorIdList,
    productSubscription,
    userSubscriptions,
    accessControl,
    formattedProductData,
    productSaveSuccess,
  } = useSelector((state: RootStore) => state.products);

  const { t } = useTranslation();

  const [slideInfo, setSlideInfo] = useState<any[] | null>(null);

  const [isNextBtnClicked, setIsNextBtnClicked] = useState(false);

  const getCountry = (pageNumber: number) => {
    countryRequest(
      `/countries?page=${pageNumber}&size=20`,
      GET_COUNTRIES_REQUEST,
      GET_COUNTRIES_SUCCESS,
      GET_COUNTRIES_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };
  const getCurrency = (pageNumber: number) => {
    currencyRequest(
      `/currencies?page=${pageNumber}&size=20`,
      GET_CURRENCY_REQUEST,
      GET_CURRENCY_SUCCESS,
      GET_CURRENCY_FAILED,
      {},
      {},
      'GET',
      false,
      PAYMENT_SERVICE,
      {}
    );
  };

  useEffect(() => {
    getCountry(1);
    getCurrency(1);
    return () => {
      dispatch({
        type: RESET_CREATE_PRODUCT,
      });
    };
  }, []);

  const sliderSettings = {
    speed: 500,
    dots: false,
    swipe: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    initialSlide: 0,
    draggable: false,
    slidesToScroll: 1,
    swipeToSlide: false,
    beforeChange: (current: any, next: any) => setCurrentSlide(next),
  };
  const getSyllabuses = (pageNumber: number) => {
    getSyllabusesRequest(
      `/syllabuses?countryCodes=${countryCodeList}&page=${pageNumber}&size=20`,
      GET_SYLLABUSES_REQUEST,
      GET_SYLLABUSES_SUCCESS,
      GET_SYLLABUSES_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };
  useEffect(() => {
    countryCodeList?.length && getSyllabuses(1);
  }, [countryCodeList]);

  const getGrades = (pageNumber: number) => {
    getGradeRequest(
      `/syllabuses/${selectedSyllabusID}/grades?page=${pageNumber}&size=20`,
      GET_GRADES_REQUEST,
      GET_GRADES_SUCCESS,
      GET_GRADES_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };

  useEffect(() => {
    selectedSyllabusID && getGrades(1);
  }, [selectedSyllabusID]);

  const getSubject = (pageNumber: number) => {
    subjectRequest(
      `/subjects?countryCodes=${countryCodeList}&gradeIds=${selectedGradeID}&syllabusIds=${selectedSyllabusID}&page=${pageNumber}&size=20`,
      GET_SUBJECTS_REQUEST,
      GET_SUBJECTS_SUCCESS,
      GET_SUBJECTS_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  useEffect(() => {
    selectedSyllabusID &&
      selectedGradeID &&
      countryCodeList?.length &&
      getSubject(1);
  }, [countryCodeList, selectedSyllabusID, selectedGradeID]);

  const [isProductReelErrorModelOpen, setIsProductReelErrorModelOpen] =
    useState(false);

  const [formsCommonErrors, setFormsCommonErrors] = useState<{
    emptyReel: any;
    unsavedReels: any;
  } | null>(null);

  useEffect(() => {
    if (isNextBtnClicked) {
      const slideData = slideInfo || [];

      const currentSlideInfo = slideData[currentSlide] || {};

      switch (currentSlide) {
        case 0:
          currentSlideInfo.isErrorModelOpen = !!Object.keys(basicErrors).length;
          currentSlideInfo.errorMessage = t('Please fill all mandatory fields');
          break;

        case 1:
          currentSlideInfo.isErrorModelOpen = isProductReelErrorModelOpen;
          if (formsCommonErrors?.emptyReel) {
            currentSlideInfo.errorMessage = t(
              `You can't proceed without adding any content for the product`
            );
          }
          if (formsCommonErrors?.unsavedReels) {
            currentSlideInfo.errorMessage = t(
              `You can't proceed without saving any content for the product`
            );
          }

          break;

        default:
          break;
      }
      slideData[currentSlide] = currentSlideInfo;

      setSlideInfo([...slideData]);
    }
  }, [
    basicErrors,
    isNextBtnClicked,
    isProductReelErrorModelOpen,
    formsCommonErrors,
  ]);

  useEffect(() => {
    setIsNextBtnClicked(false);
  }, [currentSlide]);

  const goToPrevious = () => {
    if (!currentSlide) {
      history.goBack();
      return;
    }
    sliderRef?.current && sliderRef.current.slickPrev();
  };

  const closeModel = (currentSlide: number) => {
    const slideData = slideInfo || [];

    const currentSlideInfo = slideData[currentSlide] || {};

    currentSlideInfo.isErrorModelOpen = false;
    slideData[currentSlide] = currentSlideInfo;

    setSlideInfo([...slideData]);
    setIsNextBtnClicked(false);
  };

  const [isDuplicateReel, setIsDuplicateReel] = useState(false);

  const getSelectionTypeFromContentType = (
    contentTypeStr: string,
    contentTypeIgnoredContentsIds: string[]
  ) => {
    if (contentTypeIgnoredContentsIds.length) {
      switch (contentTypeStr) {
        case contentType.video:
          return ContentSelectionTypes.ALL_VIDEO_FROM_SELECTED_TUTORS_EXCEPT_UNSELECTED_VIDEOS;

        case contentType.assignment:
          return ContentSelectionTypes.ALL_ASSESSMENT_FROM_SELECTED_TUTORS_EXCEPT_UNSELECTED_ASSESSMENTS;

        case contentType.document:
          return ContentSelectionTypes.ALL_DOCUMENT_FROM_SELECTED_TUTORS_EXCEPT_UNSELECTED_DOCUMENTS;
        default:
          return null;
      }
    } else {
      switch (contentTypeStr) {
        case contentType.video:
          return ContentSelectionTypes.ALL_VIDEO_FROM_SELECTED_TUTORS;

        case contentType.assignment:
          return ContentSelectionTypes.ALL_ASSESSMENT_FROM_SELECTED_TUTORS;

        case contentType.document:
          return ContentSelectionTypes.ALL_DOCUMENT_FROM_SELECTED_TUTORS;
        default:
          return null;
      }
    }
  };

  const formatReelCommonMethod = (
    reelIndex: number,
    type: string,
    isAllContentsSelected?: boolean,
    syllabus?: singleDataTypeWithValueAndLabel,
    grade?: singleDataTypeWithValueAndLabel,
    subject?: singleDataTypeWithValueAndLabel,
    selectedContentIds?: tutorAndSelectedContent[],
    ignoredContentsIds?: string[]
  ) => {
    let selections = [];

    const subjectId = subject?.value || '';

    if (isAllContentsSelected) {
      ignoredContentsIds?.length
        ? selections.push({
            type: ContentSelectionTypes.ALL_CONTENTS_FROM_ALL_TUTORS_EXCEPT_UNSELECTED_CONTENTS,
            contentIds: ignoredContentsIds,
            subjectId,
          })
        : selections.push({
            type: ContentSelectionTypes.ALL_CONTENTS_FROM_ALL_TUTORS,
            subjectId,
          });
    } else if (selectedContentIds?.length) {
      selectedContentIds.forEach(tutorContent => {
        let selectedContentFromSingleTutor: {
          type: string;
          contentIds: string[];
        } = {
          type: ContentSelectionTypes.SELECTED_CONTENT,
          contentIds: [],
        };
        Object.keys(tutorContent.contentIds).forEach(contentType => {
          const { contentTypeIgnoredContentsIds } =
            tutorContent.contentIds[contentType];

          const selection = getSelectionTypeFromContentType(
            contentType,
            contentTypeIgnoredContentsIds || []
          );

          if (selection && tutorContent.contentIds[contentType].isAllSelected) {
            if (contentTypeIgnoredContentsIds?.length) {
              selections.push({
                type: selection,
                tutorIds: [tutorContent.tutorId],
                contentIds: contentTypeIgnoredContentsIds,
                subjectId,
              });
            } else {
              selections.push({
                type: selection,
                tutorIds: [tutorContent.tutorId],
                subjectId,
              });
            }
          } else {
            selectedContentFromSingleTutor.contentIds = [
              ...selectedContentFromSingleTutor.contentIds,
              ...tutorContent.contentIds[contentType].ids,
            ];
          }
        });
        selectedContentFromSingleTutor.contentIds.length &&
          selections.push(selectedContentFromSingleTutor);
      });
    }

    return {
      type,
      order: reelIndex + 1,
      syllabusId: syllabus?.value || '',
      gradeId: grade?.value || '',
      subjectId: subject?.value || '',
      productCreationContentSelectionRequests: selections,
    };
  };

  const formatFeatureReels = (featureReel: featureReelTypes | null) => {
    if (!featureReel) return;

    const { selectedFeatureContentList } = featureReel;
    const list = selectedFeatureContentList?.map(
      (
        {
          constantReelIds: selectedContentIds,
          ignoredContentsIds,
          grade,
          syllabus,
          subject,
          isAllContentsSelected,
        },
        reelIndex
      ) => {
        return formatReelCommonMethod(
          reelIndex,
          ReelTypes.FEATURED,
          isAllContentsSelected,
          syllabus,
          grade,
          subject,
          selectedContentIds,
          ignoredContentsIds
        );
      }
    );

    return list;
  };

  /** Format reel data for saving product*/
  const formatStandardReels = (reels: reelTypes[] | null) => {
    if (!reels) return;

    const reelList = reels.map(
      (
        {
          isAllContentsSelected,
          syllabus,
          grade,
          subject,
          selectedContentIds,
          ignoredContentsIds,
        },
        reelIndex
      ) => {
        return formatReelCommonMethod(
          reelIndex,
          ReelTypes.STANDARD,
          isAllContentsSelected,
          syllabus,
          grade,
          subject,
          selectedContentIds || [],
          ignoredContentsIds
        );
      }
    );
    return reelList;
  };

  /** Format tutor data for saving product*/
  const formatTutorData = (tutorList: reelTutors[] | null) => {
    if (!tutorList) return null;
    return tutorList.map(({ _id }) => ({ _id }));
  };

  /** Format subscription data for saving product */
  const formatSubscription = (
    subscriptionList: productSubscriptionTypes[] | null
  ) => {
    if (!subscriptionList) return null;

    return subscriptionList.map(({ _id, defaultPrice }) => ({
      subscriptionId: _id,
      defaultPrice: Number(defaultPrice),
    }));
  };

  /**Format access control data for saving product */
  const formatAccessControl = (accessControlData: accessControlType) => {
    let studentList: AccessControlStudent[] = [];

    accessControlData.users.forEach(({ _id, access, specialPrice }) => {
      const subs = getUserSubscriptions(_id);

      let userObj: AccessControlStudent = {
        _id,
        accessGranted: access,
      };

      // Only setting price if a price is specified
      if (specialPrice) {
        userObj.specialPrice = Number(specialPrice);
      }

      if (subs.length) {
        subs.forEach(sub => {
          studentList.push({
            ...userObj,
            subscriptionId: sub.subscriptionId,
          });
        });
      } else {
        studentList.push(userObj);
      }
    });

    return {
      defaultAccess: accessControlData.defaultAccess,
      students: studentList,
    };
  };

  const getUserSubscriptions = (uid: string) => {
    return userSubscriptions.filter(({ userId }) => userId === uid);
  };

  const updateProductData = (data: any) => {
    dispatch({
      type: UPDATE_FORMATTED_PRODUCT_DATA,
      payload: data,
    });
  };

  const onFormSubmit = (data: any) => {
    switch (currentSlide) {
      case 0:
        {
          dispatch({
            type: SET_BASIC_INFORMATION,
            payload: { dataWrapper: { data } },
          });

          updateProductData({
            ...formattedProductData,
            ...data,
          });
        }

        break;

      case 1:
        {
          const formattedReelData = formatStandardReels(reels);

          updateProductData({
            ...formattedProductData,
            standardReels: formattedReelData || [],
          });
        }
        break;

      case 2:
        {
          const formattedFeatureReel = formatFeatureReels(featureReel);

          let generatedFeatureList: any[] = [];

          formattedFeatureReel?.forEach(
            ({ productCreationContentSelectionRequests }) => {
              generatedFeatureList = [
                ...generatedFeatureList,
                ...productCreationContentSelectionRequests,
              ];
            }
          );

          formattedFeatureReel &&
            updateProductData({
              ...formattedProductData,
              featuredReel: {
                type: ReelTypes.FEATURED,
                productCreationContentSelectionRequests: generatedFeatureList,
              },
            });
        }
        break;
      case 3:
        {
          const formattedTutorData = formatTutorData(productTutorIdList);

          updateProductData({
            ...formattedProductData,
            tutors: formattedTutorData || [],
          });
        }
        break;
      case 4:
        {
          const formattedSubscriptionData =
            formatSubscription(productSubscription);

          updateProductData({
            ...formattedProductData,
            subscriptionPrices: formattedSubscriptionData || [],
          });
        }
        break;

      case 5:
        {
          const formattedAccessControlData = formatAccessControl(accessControl);
          const updatedProductData = {
            ...formattedProductData,
            accessControl: formattedAccessControlData,
          };
          updateProductData(updatedProductData);

          saveProduct(updatedProductData);
        }
        break;

      default:
        break;
    }
    window.scrollTo(0, 0);
    sliderRef?.current && sliderRef.current.slickNext();
    setSelectedSyllabusID(null);
    setSelectedGradeID(null);
  };

  const goToNext = () => {
    window.scrollTo(0, 0);
    setIsNextBtnClicked(true);
  };

  const selectedCountries = (country: string[]) => {
    dispatch({
      type: SET_SELECTED_COUNTRIES,
      payload: { dataWrapper: { data: country } },
    });
  };

  const [selectedTutorList, setSelectedTutorList] = useState<string[] | null>(
    null
  );

  const [selectedAllTutorReelSubjectIds, setSelectedAllTutorReelSubjectIds] =
    useState<singleSubjectAndTotalTutorType[] | null>(null);

  useEffect(() => {
    let allTutorIds: string[] = [];
    let selectedAllReelSubjectIds: singleSubjectAndTotalTutorType[] = [];
    if (reels?.length) {
      reels.forEach(
        ({
          selectedContentIds,
          isReelSaved,
          isAllContentsSelected,
          subject,
          tutorsTotalRecords,
        }) => {
          if (isReelSaved) {
            if (!isAllContentsSelected) {
              const tutorListFilter = selectedContentIds?.filter(
                ({ contentIds }) => checkAnyContentSelectedWithTutor(contentIds)
              );
              const tutorListMap = tutorListFilter?.map(
                ({ tutorId }) => tutorId
              );
              if (tutorListMap?.length) {
                allTutorIds = [...allTutorIds, ...tutorListMap];
              }
            } else {
              selectedAllReelSubjectIds = [
                ...selectedAllReelSubjectIds,
                {
                  tutorsTotalRecords: tutorsTotalRecords || 0,
                  subjectId: subject?.value || '',
                },
              ];
            }
          }
        }
      );
    }

    if (!featureReel?.isReelEdited) {
      featureReel?.selectedFeatureContentList?.forEach(
        ({
          isAllContentsSelected,
          constantReelIds,
          subject,
          tutorsTotalRecords,
        }) => {
          if (isAllContentsSelected) {
            selectedAllReelSubjectIds = [
              ...selectedAllReelSubjectIds,
              {
                tutorsTotalRecords: tutorsTotalRecords || 0,
                subjectId: subject?.value || '',
              },
            ];
          } else {
            const tutorListOfIds =
              constantReelIds?.filter(({ contentIds }) => {
                return (
                  !!contentIds &&
                  (contentIds[contentType.video]?.isAllSelected ||
                    contentIds[contentType.video]?.ids.length ||
                    contentIds[contentType.document]?.isAllSelected ||
                    contentIds[contentType.document]?.ids.length ||
                    contentIds[contentType.assignment]?.isAllSelected ||
                    contentIds[contentType.assignment]?.ids.length)
                );
              }) || [];

            const mappedTutorIDs: string[] = [];

            tutorListOfIds?.forEach(({ tutorId }) => {
              tutorId && mappedTutorIDs.push(tutorId);
            });

            allTutorIds = [...allTutorIds, ...mappedTutorIDs];
          }
        }
      );
    }

    setSelectedTutorList(allTutorIds || []);

    setSelectedAllTutorReelSubjectIds(selectedAllReelSubjectIds || []);
  }, [reels, featureReel]);

  useEffect(() => {
    const allTutorsByIdsUrl = `/users?type=${
      userTypes.tutor
    }&userIds=${selectedTutorList?.toString()}&page=1&size=${
      selectedTutorList?.length
    }`;

    selectedTutorList?.length &&
      allTutorRequest(
        allTutorsByIdsUrl,
        GET_REEL_ALL_TUTORS_REQUEST,
        GET_REEL_ALL_TUTORS_SUCCESS,
        GET_REEL_ALL_TUTORS_FAILED,
        {},
        {},
        'GET',
        false,
        USER_SERVICE
      );

    const totalTutorsCount = selectedAllTutorReelSubjectIds?.reduce(
      (acc, obj) => {
        return acc + obj.tutorsTotalRecords;
      },
      0
    );

    const subjectIdList = selectedAllTutorReelSubjectIds?.map(
      ({ subjectId }) => subjectId
    );

    const allTutorsBySubjectIdsUrl = `/users?type=${
      userTypes.tutor
    }&subjectIds=${subjectIdList?.toString()}&page=1&size=${totalTutorsCount}`;

    selectedAllTutorReelSubjectIds?.length &&
      subjectAllTutorRequest(
        allTutorsBySubjectIdsUrl,
        GET_REEL_ALL_TUTORS_REQUEST,
        GET_REEL_ALL_TUTORS_SUCCESS,
        GET_REEL_ALL_TUTORS_FAILED,
        {},
        {},
        'GET',
        false,
        USER_SERVICE
      );
  }, [selectedTutorList, selectedAllTutorReelSubjectIds]);
  const saveProduct = (data: any) => {
    saveProductApi(
      `/products`,
      SAVE_PRODUCT_REQUEST,
      SAVE_PRODUCT_SUCCESS,
      SAVE_PRODUCT_FAILED,
      data,
      {},
      'POST',
      false,
      PRODUCT_SERVICE
    );
  };

  useEffect(() => {
    if (productSaveSuccess) {
      setShowOverlay(true);
    }
  }, [productSaveSuccess]);

  const redirectAfterSuccess = () => {
    history.push('/admin/products');
    dispatch({
      type: RESET_CREATE_PRODUCT,
    });
  };

  return (
    <>
      <div className="createContent">
        {showOverlay && (
          <Overlay showLoader onOverlayHide={redirectAfterSuccess} />
        )}
        <div className="container">
          <div className="createContent__wrapper">
            <h2 className="page-title">Create Product</h2>

            <ProgressBar
              className={'createContent__progressBar'}
              selectedIndex={currentSlide}
              list={PRODUCT_PROGRESS_BAR_MENU_LIST.map(
                productProgressBarMenu => ({
                  title: productProgressBarMenu,
                })
              )}
            />

            <Slider {...sliderSettings} ref={sliderRef}>
              <div className="product__form">
                <form
                  className="main-form"
                  onSubmit={basicHandleSubmit(onFormSubmit)}
                >
                  <BasicInformation
                    Controller={Controller}
                    control={basicControl}
                    errors={basicErrors}
                    setValue={basicSetValue}
                    countries={countries}
                    currencies={currency}
                    currencyPage={currencyPage}
                    countriesPage={countriesPage}
                    getCountry={getCountry}
                    getCurrency={getCurrency}
                    selectedCountries={selectedCountries}
                  />
                  <ImageUploadContainer
                    Controller={Controller}
                    control={basicControl}
                    errors={basicErrors}
                    setValue={basicSetValue}
                  />
                  <div className="createContent__row submit-button">
                    <div className="form">
                      <div className="form__form--field buttons">
                        <button
                          onClick={goToPrevious}
                          type="button"
                          className="btn btn--secondary"
                        >
                          {t('Back')}
                        </button>
                        <button
                          type="submit"
                          className="btn btn--primary"
                          onClick={goToNext}
                        >
                          {t('Next')}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className={'product_reel'}>
                <ReelSlide
                  setSelectedSyllabusID={setSelectedSyllabusID}
                  setSelectedGradeID={setSelectedGradeID}
                  getSyllabuses={getSyllabuses}
                  getGrades={getGrades}
                  getSubject={getSubject}
                  goToNext={goToNext}
                  goToPrevious={goToPrevious}
                  setIsDuplicateReel={setIsDuplicateReel}
                  onFormSubmit={onFormSubmit}
                  setIsProductReelErrorModelOpen={
                    setIsProductReelErrorModelOpen
                  }
                  setFormsCommonErrors={setFormsCommonErrors}
                />
              </div>

              <div className={'product_feature_reel'}>
                <FeatureReelSlide
                  setSelectedSyllabusID={setSelectedSyllabusID}
                  setSelectedGradeID={setSelectedGradeID}
                  getSyllabuses={getSyllabuses}
                  getGrades={getGrades}
                  getSubject={getSubject}
                  goToNext={goToNext}
                  goToPrevious={goToPrevious}
                  onFormSubmit={onFormSubmit}
                />
              </div>
              <div>
                <TutorSlideContainer
                  onFormSubmit={onFormSubmit}
                  goToPrevious={goToPrevious}
                />
              </div>
              <div>
                <SubscriptionsSlideContainer
                  onFormSubmit={onFormSubmit}
                  goToPrevious={goToPrevious}
                />
              </div>
              <div>
                <AccessControlSlideContainer
                  goToPrevious={goToPrevious}
                  onFormSubmit={onFormSubmit}
                />
              </div>
            </Slider>
          </div>
        </div>
      </div>
      {slideInfo && slideInfo[currentSlide]?.isErrorModelOpen && (
        <Modal>
          <div className="popup--content centerContent">
            <AiFillExclamationCircle className="icon color-green" />
            <p className="white">{slideInfo[currentSlide]?.errorMessage}</p>
            <button
              className="btn btn--primary lessBottom"
              onClick={() => closeModel(currentSlide)}
            >
              {t('Back')}
            </button>
          </div>
        </Modal>
      )}

      {isDuplicateReel && (
        <Modal>
          <div className="popup--content centerContent">
            <AiFillExclamationCircle className="icon color-green" />
            <p className="white">{t('Can not add duplicate data')}</p>
            <button
              className="btn btn--primary lessBottom"
              onClick={() => setIsDuplicateReel(false)}
            >
              {t('Close')}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CreateProductContainer;
