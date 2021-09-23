import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import Slider from 'react-slick';
import Button from '../../Components/Button/Button';
import Search from '../../Components/CustomComponents/Search';
import { reelTutors } from '../../redux/product/productReducer';
import TutorContainer from '../CreateProduct/ProductReelSlide/TutorContainer/TutorContainer';
import tutors from '../../db/ReelTutors.json';

const AdminHomeContainer = (props: any) => {
  const sliderRef = useRef<any>();
  const [sliderIndex, setSliderIndex] = useState(0);
  const { t } = useTranslation();
  const settings = {
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    infinite: false,
    dots: false,
    beforeChange: (current: number, next: any) => {
      checkForSliderEnd(current, next);
      setSliderIndex(Math.ceil(next / visibleSlideCount()));
    },
  };
  const checkForSliderEnd = (current: number, next: any) => {};
  /**
   * Show visibleSlide Count for responsive screens
   */
  const visibleSlideCount = () => {
    const slider = sliderRef?.current;

    if (!slider) return settings.slidesToShow;

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
  const pagination = () => {
    const totalRecords = tutors.length;
    const sliderCount = Math.ceil(totalRecords / visibleSlideCount());
    const listItem = [];

    let count;
    for (count = 0; count < sliderCount; count++) {
      listItem.push(
        <li className={sliderIndex === count ? 'active' : ''} key={count} />
      );
    }

    return listItem;
  };

  return (
    <div className="bulkView">
      <div className="container">
        <div className="bulkView__wrapper">
          <div className="bulkView__tutors">
            <div className="bulkView__tutors--title">
              <h4>Chemistry</h4>
            </div>
            <div className="bulkView__tutors--reel">
              {tutors && tutors.length > 5 && (
                <ul className="theatre__assessment-pagination">
                  {pagination()}
                </ul>
              )}
              <Slider {...settings} ref={sliderRef}>
                {tutors?.map(tutor => {
                  return (
                    <TutorContainer
                      key={tutor._id}
                      tutor={tutor}
                      reelIndex={1}
                      subjectID={'subjectID'}
                    />
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="bulkView__buttons">
            <div className="bulkView__buttons--left">
              <Button
                className={'btn btn--primary btn--curved'}
                type={'button'}
              >
                {t('Videos')}
              </Button>

              <Button
                className={'btn btn--secondary btn--curved'}
                type={'button'}
              >
                {t('Assignment')}
              </Button>

              <Button
                className={'btn btn--secondary btn--curved'}
                type={'button'}
              >
                {t('Documents')}
              </Button>

              <Button className={'btn btn--green btn--curved'} type={'button'}>
                {t('Past paper')}
              </Button>
            </div>
            <div className="bulkView__buttons--right">
              <Search
                searchClassName={'form-input form-input--search'}
                placeholder={'Search a video'}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="bulkView__reels">{/* Add the Reels Here */}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeContainer;
