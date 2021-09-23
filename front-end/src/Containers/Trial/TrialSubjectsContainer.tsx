import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import InformationalModal from '../../Components/CreateProduct/InformationalModal/InformationalModal';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import Overlay from '../../Components/Overlay/Overlay';
import SubscriptionSlider from '../../Components/Trial/SubscriptionSlider';
import TrialSubjectCard from '../../Components/Trial/TrialSubjectCard';
import {
  CONTENT_SERVICE,
  PAYMENT_SERVICE,
  USER_SERVICE,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';
import useValidateSubscription from '../../Hooks/useValidateSubscription';
import { RootStore } from '../../redux/store';
import {
  ProductTypes,
  SubscriptionType,
  TrialSubjectDataType,
} from '../../redux/trial/TrialReducer';
import {
  RESET_TRIAL,
  SELECT_TOGGLE_SUBJECT,
  SUBSCRIPTION_FAILED,
  SUBSCRIPTION_REQUEST,
  SUBSCRIPTION_SUCCESS,
  TRIAL_GRADE_FAILED,
  TRIAL_GRADE_REQUEST,
  TRIAL_GRADE_SUCCESS,
  TRIAL_SELECT_PRODUCT,
  TRIAL_SELECT_SUBSCRIPTION,
  TRIAL_SUBJECT_FAILED,
  TRIAL_SUBJECT_REQUEST,
  TRIAL_SUBJECT_SUCCESS,
  TRIAL_USER_FAILED,
  TRIAL_USER_REQUEST,
  TRIAL_USER_SUCCESS,
} from '../../redux/trial/TrialType';
import AvailableProductContainer from './AvailableProductContainer';
import SelectedProducts from './SelectedTrialProducts';

export interface productAndSubscriptionTypes {
  subscription: SubscriptionType | null;
  products: ProductTypes[];
  userId: string;
}

const TrialSubjectsContainer = () => {
  const {
    size,
    subjects,
    grade,
    userDetails,
    trialSubmitSuccesses,
    isInitLoading,
  } = useSelector((state: RootStore) => state?.trial);

  const { userData } = useSelector((state: RootStore) => state?.auth);

  const dispatch = useDispatch();
  const [subjectsRequest] = useApi();
  const [gradeRequest] = useApi();
  const [userRequest] = useApi();
  const [validSubscriptionData, validSubscription] = useValidateSubscription();
  const [subscriptionPlanRequest] = useApi();
  const { t } = useTranslation();
  const history = useHistory();

  const sliderRef = useRef<any>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNextBtnClicked, setIsNextBtnClicked] = useState(false);
  const [slideInfo, setSlideInfo] = useState<any[] | null>(null);

  const {
    subscriptionSize,
    subscriptionTotalRecords,
    subscriptions,
    selectedSubscription,
    products,
    subscriptionPage,
    selectedProducts,
  } = useSelector((state: RootStore) => state?.trial);

  useEffect(() => {
    fetchUserDetails();
    validSubscription();
    fetchSubscriptionPlans(1);

    return () => {
      dispatch({ type: RESET_TRIAL });
    };
  }, []);

  useEffect(() => {
    if (validSubscriptionData) {
      if (validSubscriptionData.isSubscriptionAvailable) {
        history.replace('/');
      }
    }
  }, [validSubscriptionData]);

  useEffect(() => {
    if (userDetails?.currentGradeId) {
      fetchAllSubjects(userDetails?.currentGradeId);
      fetchGrade(userDetails?.currentGradeId);
    }
  }, [userDetails]);

  const fetchUserDetails = () => {
    userRequest(
      `/users?userIds=${userData?._id}`,
      TRIAL_USER_REQUEST,
      TRIAL_USER_SUCCESS,
      TRIAL_USER_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE,
      {}
    );
  };

  const fetchAllSubjects = (gradeId: string) => {
    subjectsRequest(
      `/grades/${gradeId}/subjects?page=1&size=${size}`,
      TRIAL_SUBJECT_REQUEST,
      TRIAL_SUBJECT_SUCCESS,
      TRIAL_SUBJECT_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };

  const fetchGrade = (gradeId: string) => {
    gradeRequest(
      `/grades?gradeIds=${gradeId}`,
      TRIAL_GRADE_REQUEST,
      TRIAL_GRADE_SUCCESS,
      TRIAL_GRADE_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };

  const fetchSubscriptionPlans = (selectedPage: number) => {
    subscriptionPlanRequest(
      `/subscriptions?page=${selectedPage}&size=${subscriptionSize}`,
      SUBSCRIPTION_REQUEST,
      SUBSCRIPTION_SUCCESS,
      SUBSCRIPTION_FAILED,
      {},
      {},
      'GET',
      false,
      PAYMENT_SERVICE,
      { page: selectedPage }
    );
  };

  const onSelectSubject = (id: string) => {
    dispatch({
      type: SELECT_TOGGLE_SUBJECT,
      payload: { customInput: id },
    });
  };
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

  const goToNext = () => {
    setIsNextBtnClicked(true);
  };
  useEffect(() => {
    if (isNextBtnClicked) {
      const slideData = slideInfo || [];
      const currentSlideInfo = slideData[currentSlide] || {};
      slideData[currentSlide] = currentSlideInfo;
      switch (currentSlide) {
        case 0:
          const selectedSubjects = subjects?.filter(
            (subject: TrialSubjectDataType) => subject.isSelect
          );
          currentSlideInfo.isErrorModelOpen = !selectedSubjects.length;
          currentSlideInfo.errorMessage = t(
            'Please select at least one subject'
          );
          selectedSubjects.length &&
            sliderRef?.current &&
            sliderRef.current.slickNext();
          break;
        case 1:
          currentSlideInfo.isErrorModelOpen = !selectedSubscription?._id;
          currentSlideInfo.errorMessage = t('Please select the subscription');
          selectedSubscription?._id &&
            sliderRef?.current &&
            sliderRef.current.slickNext();
          break;
        case 2:
          currentSlideInfo.isErrorModelOpen = !selectedProducts?.length;
          currentSlideInfo.errorMessage = t('Please select the product');
          selectedProducts?.length &&
            sliderRef?.current &&
            sliderRef.current.slickNext();

          break;

        default:
          break;
      }
      slideData[currentSlide] = currentSlideInfo;
      setSlideInfo([...slideData]);
    }
  }, [isNextBtnClicked]);

  const goToPrevious = () => {
    const slideData = slideInfo || [];
    const currentSlideInfo = slideData[currentSlide] || {};
    slideData[currentSlide] = currentSlideInfo;
    switch (currentSlide) {
      case 2:
        if(!subjects?.length){
          currentSlideInfo.isErrorModelOpen = true;
          currentSlideInfo.errorMessage = t(
            'Please select a grade'
          );
          slideData[currentSlide] = currentSlideInfo;
          setSlideInfo([...slideData]);
          return;
        }

      default:
        break;
    }

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

  useEffect(() => {
    setIsNextBtnClicked(false);
  }, [currentSlide]);

  const selectToggleSubscription = (subscription: any) => {
    dispatch({
      type: TRIAL_SELECT_SUBSCRIPTION,
      payload: { customInput: { subscription } },
    });
  };

  const onSubscriptionPageChange = (pageNo: number) => {
    if (pageNo) {
      fetchSubscriptionPlans(pageNo);
    }
  };

  const redirectAfterSuccess = () => {
    history.push(`/home`);
  };
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    trialSubmitSuccesses && setShowOverlay(true);
  }, [trialSubmitSuccesses]);

  const [selectedProductsAndSubscription, setSelectedProductsAndSubscription] =
    useState<productAndSubscriptionTypes[] | null>(null);

  useEffect(() => {
    const subscriptionAndProductList = [
      {
        subscription: selectedSubscription,
        products: selectedProducts || [],
        userId: userData?._id || '',
      },
    ];

    selectedProducts?.length &&
      selectedSubscription &&
      setSelectedProductsAndSubscription(subscriptionAndProductList || []);
  }, [JSON.stringify(selectedProducts)]);

  const removeSelectedProduct = (productId: string, subscriptionId: string) => {
    const productsList = selectedProductsAndSubscription?.filter(
      selectedItem => {
        if (subscriptionId === selectedItem.subscription?._id) {
          selectedItem.products = selectedItem.products.filter(
            ({ _id }) => _id !== productId
          );
        }

        return selectedItem;
      }
    );

    setSelectedProductsAndSubscription(productsList || []);
    dispatch({
      type: TRIAL_SELECT_PRODUCT,
      payload: { dataWrapper: { data: { id: productId } } },
    });
  };
  return (
    <div className="createContent subjectSelect">
      {showOverlay && (
        <Overlay showLoader onOverlayHide={redirectAfterSuccess} />
      )}
      <div className="container">
        <div className="createContent__wrapper">
          <Slider {...sliderSettings} ref={sliderRef}>
            <div>
              <>
                {grade?.name && (
                  <h1>
                    {t('For')} {grade?.name}{' '}
                    {t('what subjects are you following?')}
                  </h1>
                )}
              </>
              {subjects.length ? (
                <>
                  <div className="subjectSelect__wrapper">
                    {subjects?.length &&
                      subjects.map((item: TrialSubjectDataType) => {
                        return (
                          <TrialSubjectCard
                            key={item._id}
                            onSelect={(id: string) => {
                              onSelectSubject(id);
                            }}
                            {...item}
                          />
                        );
                      })}
                  </div>
                  <div className="subjectSelect__footer">
                    <button
                      type="submit"
                      onClick={goToNext}
                      className="btn btn--primary"
                    >
                      {t('Next')}
                    </button>
                  </div>
                </>
              ) : isInitLoading ? (
                <LoadingScreen />
              ) : (
                <div className="createContent__body--content empty">
                  {t('No Subjects Available')}
                </div>
              )}
            </div>
            <div>
              <h1 className="subscription--card__heading">
                {t('Available Subscriptions')}
              </h1>
              {subscriptions?.length ? (
                <div className="subscription--card__wrapper">
                  <SubscriptionSlider
                    onSelect={selectToggleSubscription}
                    subscriptions={subscriptions}
                    page={subscriptionPage}
                    selectedSubscription={selectedSubscription}
                    size={subscriptionSize}
                    subscriptionTotalRecords={subscriptionTotalRecords}
                    addSubscription={(pageNo: number) =>
                      onSubscriptionPageChange(pageNo)
                    }
                    goToPrevious={goToPrevious}
                    goToNext={goToNext}
                    isSlider={true}
                  />
                </div>
              ) : (
                <div className="createContent__body--content empty">
                  {t('No Subscriptions Available')}
                </div>
              )}
            </div>

            <div>
              <AvailableProductContainer
                goToPrevious={goToPrevious}
                goToNext={goToNext}
              />
            </div>
            <div>
              <SelectedProducts
                goToPrevious={goToPrevious}
                selectedProductsAndSubscription={
                  selectedProductsAndSubscription || []
                }
                removeSelectedProduct={removeSelectedProduct}
              />
            </div>
          </Slider>
        </div>
      </div>

      {slideInfo && slideInfo[currentSlide]?.isErrorModelOpen && (
        <InformationalModal
          modelCloseAction={() => closeModel(currentSlide)}
          message={slideInfo[currentSlide]?.errorMessage}
          closeActionText={t('Back')}
        />
      )}
    </div>
  );
};
export default TrialSubjectsContainer;
