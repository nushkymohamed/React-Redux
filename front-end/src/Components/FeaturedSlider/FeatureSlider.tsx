import React, { FC, useState } from 'react';
import Slider, { LazyLoadTypes } from 'react-slick';
import { VideoContent } from '../../redux/student/reelVideoReducer';
import FeatureSingleSlider from './FeatureSingleSlider';

type FeatureSliderProps = {
  content: VideoContent[];
  getNewFeatureContent: Function;
  onWatchNowClick?: (contentId: string) => void;
  totalRecords: number;
};

const FeatureSlider: FC<FeatureSliderProps> = ({
  content,
  getNewFeatureContent,
  onWatchNowClick,
  totalRecords,
}) => {
  const [sliderRef, setSliderRef] = useState<any>();
  const [sliderIndex, setSliderIndex] = useState(0);

  const lazyLoad: LazyLoadTypes = 'ondemand';

  const settings = {
    className: 'left',
    dots: false,
    infinite: false,
    lazyLoad,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    initialSlide: 0,
    arrows: true,
    beforeChange: (current: number, next: number) => {
      checkForSliderEnd(current, next);
      setSliderIndex(next);
    },

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };
  const checkForSliderEnd = (current: number, next: number) => {
    if (
      current <= next &&
      1 + next >= content.length &&
      content?.length < totalRecords
    ) {
      getNewFeatureContent();
    }
  };

  const pagination = () => {
    const listItem = [];
    let count;
    for (count = 0; count < totalRecords; count++) {
      listItem.push(
        <li className={sliderIndex === count ? 'active' : ''} key={count}>
          {sliderIndex === count ? sliderIndex + 1 : ''}
        </li>
      );
    }
    const sliceIndex = Math.floor(sliderIndex / 5) * 5;
    return listItem.slice(sliceIndex, sliceIndex + 5);
  };

  return (
    <>
      <ul className="theatre__assessment-pagination">{pagination()}</ul>
      <Slider ref={setSliderRef} {...settings}>
        {content?.map((data, index) => {
          return (
            <FeatureSingleSlider
              featureContent={data}
              key={index}
              onWatchNowClick={onWatchNowClick}
            />
          );
        })}
      </Slider>
    </>
  );
};
export default FeatureSlider;
