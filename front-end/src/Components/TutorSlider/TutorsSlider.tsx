import React, { FC, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { tutorType } from '../../redux/student/reelTutorReducer';
import Tutor from './Tutor';

type tutorSliderProps = {
  tutors: tutorType[];
  itemKey: string;
  onTutorClick: Function;
  getNewTutors: Function;
  highlightedTutorId: string | null;
};

const TutorsSlider: FC<tutorSliderProps> = ({
  getNewTutors,
  highlightedTutorId,
  itemKey,
  onTutorClick,
  tutors,
}) => {
  const [sliderRef, setSliderRef] = useState<any>();

  useEffect(() => {
    if (highlightedTutorId) {
      sliderRef?.slickGoTo(0);
    }
  }, [highlightedTutorId]);

  const visibleSlideCount = () => {
    if (!sliderRef) return settings.slidesToShow;

    if (!sliderRef.state.breakpoint) {
      return sliderRef.props.slidesToShow;
    } else {
      if (sliderRef.props.responsive.length) {
        return sliderRef.props.responsive.find(
          (item: any) => item.breakpoint === sliderRef.state.breakpoint
        ).settings.slidesToShow;
      }
    }
  };

  const checkForSliderEnd = (current: number, next: number) => {
    if (current <= next && visibleSlideCount() + next >= tutors.length) {
      getNewTutors();
    }
  };

  const settings = {
    className: 'left',
    infinite: false,
    slidesToScroll: 2,
    slidesToShow: 8,
    speed: 500,
    dots: false,
    initialSlide: 0,
    beforeChange: (current: number, next: number) => {
      checkForSliderEnd(current, next);
    },
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  return (
    <div className="tutorReel">
      <div className="container">
        {tutors && tutors.length ? (
          <Slider {...settings} ref={setSliderRef}>
            {tutors.map(tutor => (
              <Tutor
                key={tutor._id}
                tutor={tutor}
                onTutorClick={onTutorClick}
                highlightedTutorId={highlightedTutorId}
              />
            ))}
          </Slider>
        ) : null}
      </div>
    </div>
  );
};

export default TutorsSlider;
