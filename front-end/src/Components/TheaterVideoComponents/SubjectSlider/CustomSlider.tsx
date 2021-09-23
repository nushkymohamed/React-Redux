import React, { FC, useEffect, useState } from 'react';
import Slider from 'react-slick';

interface SliderProps {
  children: any;
  dataLength?: number;
  loadMore?: Function;
  customSettings?: any;
  getMiniIndicatorData?: Function;
}
let defaultSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  initialSlide: 0,
  rtl: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: false,
        dots: false,
        arrows: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: false,
        dots: false,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        arrows: false,
      },
    },
  ],
};
const CustomSlider: FC<SliderProps> = ({
  children,
  dataLength = 0,
  loadMore,
  customSettings = defaultSettings,
  getMiniIndicatorData,
}) => {
  let settings = {
    beforeChange: (current: number, next: number) => {
      checkForSliderEnd(current, next);
      setSliderIndex(Math.ceil(next / visibleSlideCount()));
    },
  };
  const [mergedSetting, setMergedSetting] = useState<any>({
    ...settings,
    ...customSettings,
  });
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    if (Object.keys(customSettings).length) {
      let merged = Object.assign({}, mergedSetting, customSettings);
      setMergedSetting({
        ...merged,
      });
    }
  }, [customSettings]);

  const [sliderRef, setSliderRef] = useState<any>();

  const visibleSlideCount = () => {
    const slider = sliderRef?.current;
    if (!slider) return mergedSetting.slidesToShow;

    if (!slider.state.breakpoint) {
      return slider.props.slidesToShow;
    } else {
      if (slider.props.responsive.length) {
        return slider.props.responsive.find(
          (item: any) => item.breakpoint === slider.state.breakpoint
        ).settings.slidesToShow;
      }
    }
  };
  const checkForSliderEnd = (current: number, next: number) => {
    if (current <= next && visibleSlideCount() + next >= dataLength) {
      loadMore && loadMore();
    }
  };

  useEffect(() => {
    const sliderCount = Math.ceil(dataLength / visibleSlideCount());
    getMiniIndicatorData &&
      getMiniIndicatorData({ sliderCount, currentSlider: sliderIndex + 1 });
  }, [sliderIndex]);

  return (
    <>
      <Slider {...mergedSetting} ref={setSliderRef}>
        {children}
      </Slider>
    </>
  );
};

export default CustomSlider;
