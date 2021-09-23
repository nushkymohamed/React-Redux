import React, { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import { SubscriptionType } from '../../redux/trial/TrialReducer';
import SubscriptionCard from './SubscriptionCard';

interface SubscriptionSliderProps {
  subscriptions: SubscriptionType[] | null;
  page: number;
  size: number;
  subscriptionTotalRecords: number;
  selectedSubscription: SubscriptionType | null;
  onSelect?: (arg: SubscriptionType) => void;
  goToPrevious?: () => void;
  goToNext?: () => void;
  isSlider?: boolean;
  addSubscription?: Function;
  userSubscriptionId?: string[] | null;
  isPlanChangeable?: boolean;
}
const SubscriptionSlider: FC<SubscriptionSliderProps> = ({
  subscriptions,
  page,
  size,
  subscriptionTotalRecords,
  selectedSubscription,
  onSelect,
  goToPrevious,
  goToNext,
  isSlider,
  addSubscription,
  userSubscriptionId,
  isPlanChangeable = true,
}) => {
  const sliderRef = useRef<any>();
  const { t } = useTranslation();
  const sliderSettings = {
    speed: 500,
    dots: false,
    swipe: true,
    arrows: true,
    infinite: false,
    slidesToShow: 3,
    initialSlide: 0,
    draggable: true,
    slidesToScroll: 3,
    swipeToSlide: false,
    beforeChange: (current: number, next: any) => {
      checkForSliderEnd(current, next);
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  const visibleSlideCount = () => {
    const slider = sliderRef?.current;
    if (!slider) return sliderSettings.slidesToShow;
    return slider.props.slidesToShow;
  };

  const checkForSliderEnd = (current: number, next: any) => {
    if (subscriptions && page) {
      if (
        current <= next &&
        visibleSlideCount() + next >= subscriptions?.length &&
        subscriptions?.length < subscriptionTotalRecords
      ) {
        addSubscription && addSubscription(page + 1);
      }
    }
  };

  return (
    <div className="container">
      <div className="subscription--container__wrapper">
        <Slider {...sliderSettings} ref={sliderRef}>
          {subscriptions?.map(subscription => {
            return (
              <SubscriptionCard
                key={subscription?._id}
                onSelect={onSelect}
                subscription={subscription}
                userSubscriptionId={userSubscriptionId}
                isPlanChangeable={isPlanChangeable}
                selectedSubscription={selectedSubscription}
              />
            );
          })}
        </Slider>

        {isSlider && (
          <div className="subjectSelect__footer">
            <button
              type="button"
              onClick={goToPrevious}
              className="btn btn--secondary btn--marginRight"
            >
              {t('Back')}
            </button>
            <button
              onClick={goToNext}
              type="submit"
              className="btn btn--primary"
            >
              {t('Next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default SubscriptionSlider;
