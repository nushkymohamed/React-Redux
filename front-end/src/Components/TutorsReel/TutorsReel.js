import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Tutor from '../../Containers/Tutor/Tutor';

const TutorsReel = ({
  tutors,
  subjectID,
  tutorOnclick,
  loadMoreTutors,
  setSliderRef,
  highlightedTutorIndex,
  clickTutorIndex,
}) => {
  const sliderRef = useRef();

  useEffect(() => {
    sliderRef?.current && setSliderRef(sliderRef);
  }, [sliderRef?.current]);

  const visibleSlideCount = () => {
    const slider = sliderRef?.current;

    if (!slider) return settings.slidesToShow;

    if (!slider.state.breakpoint) {
      return slider.props.slidesToShow;
    } else {
      if (slider.props.responsive.length) {
        return slider.props.responsive.find(
          item => item.breakpoint === slider.state.breakpoint
        ).settings.slidesToShow;
      }
    }
  };

  const checkForSliderEnd = (current, next) => {
    if (current <= next && visibleSlideCount() + next >= tutors.length) {
      // call the tutor loading method here
      console.log('fetching more tutors...');
      loadMoreTutors();
    }
  };

  const settings = {
    className: 'left',
    infinite: false,
    slidesToScroll: 2,
    slidesToShow: 8,
    speed: 500,
    dots: true,
    initialSlide: 0,
    beforeChange: (current, next) => {
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
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
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
          <Slider {...settings} ref={sliderRef}>
            {tutors.map((tutor, index) => (
              <Tutor
                key={index}
                tutor={tutor}
                tutorOnclick={tutorOnclick}
                index={index}
                subjectID={subjectID}
                clickTutorIndex={clickTutorIndex}
                highlightedTutorIndex={highlightedTutorIndex}
              />
            ))}
          </Slider>
        ) : null}
      </div>
    </div>
  );
};

export default TutorsReel;
