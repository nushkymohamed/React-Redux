import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSelectMultiple } from 'react-icons/bi';
import Button from '../../Components/Button/Button';
import Search from '../../Components/CustomComponents/Search';
import { contentType } from '../../config/constants';
import ContentSliderWrapper from '../../Containers/BulkView/ContentSliderWrapper';
import TutorSliderContainer from '../../Containers/BulkView/TutorSliderContainer';
import {
  bulkViewTutorType,
  ContentType,
  TopicType,
} from '../../redux/bulkView/bulkViewReducer';
import { singleSubjectType } from '../../redux/common/commonReducer';
import NoContent from '../CreateProduct/NoContent/NoContent';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ActiveAll from '../../assets/images/svg-images/active All.svg';
import InActiveAll from '../../assets/images/svg-images/Inactive.svg';

interface BulkViewProps {
  subject: singleSubjectType;
  tutors: bulkViewTutorType[];
  topics: TopicType[];
  loadMoreContentTutors: () => void;
  onTabSelect: (tabType: string) => void;
  isInitialLoading: boolean;
  isAllTutorsSelected: boolean;
  toggleSelectAll: Function;
  handleLikeButtonClick: Function;
  clickedWatchLater: Function;
  removeWatchLaterVideo: Function;
  reelIds: any;
}

const BulkView: FC<BulkViewProps> = ({
  subject,
  tutors,
  topics,
  loadMoreContentTutors,
  onTabSelect,
  isInitialLoading,
  isAllTutorsSelected,
  toggleSelectAll,
  handleLikeButtonClick,
  clickedWatchLater,
  removeWatchLaterVideo,
  reelIds,
}) => {
  const { t } = useTranslation();

  const sliderRef = useRef<any>();
  const settings = {
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    infinite: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  const [sliderIndex, setSliderIndex] = useState(0);

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
    const totalRecords = tutors?.length;
    const sliderCount = Math.ceil(totalRecords || 1 / visibleSlideCount());
    const listItem = [];

    let count;
    for (count = 0; count < sliderCount; count++) {
      listItem.push(
        <li className={sliderIndex === count ? 'active' : ''} key={count} />
      );
    }

    return listItem;
  };

  const [selectedTab, setSelectedTab] = useState<string>(contentType.video);

  const selectContentType = (tab: string) => {
    onTabSelect(tab);
    setSelectedTab(tab);
  };

  const [searchText, setSearchText] = useState('');

  return (
    <div className="bulkView__wrapper">
      <div className="bulkView__tutors">
        <div className="bulkView__tutors--title">
          <h4>{subject.name || ''}</h4>
          {tutors && tutors.length > 5 && (
            <ul className="theatre__assessment-pagination">{pagination()}</ul>
          )}
        </div>
        <div className="bulkView__tutors--reel">
          <div className="addContentScreen--contentArea show">
            <div className="addContentScreen--tutors-wrapper">
              <div className="addContentScreen--tutors-content">
                <div
                  className="addContentScreen--tutors-content-all"
                  onClick={() => !isAllTutorsSelected && toggleSelectAll()}
                >
                  <div className="circleIcon">
                    <img
                      src={isAllTutorsSelected ? ActiveAll : InActiveAll}
                      alt=""
                    />
                  </div>
                  <p>{t('All')}</p>
                </div>

                <div className="addContentScreen--tutors-content-scroll">
                  <TutorSliderContainer
                    subjectId={subject._id}
                    settings={settings}
                    loadMoreContent={loadMoreContentTutors}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bulkView__buttons">
        <div className="bulkView__buttons--left">
          <Button
            className={`btn ${
              selectedTab === contentType.video
                ? ' btn--primary'
                : 'btn--secondary'
            } btn--curved`}
            type={'button'}
            onClick={() => selectContentType(contentType.video)}
          >
            {t('Videos')}
          </Button>
          <Button
            className={`btn ${
              selectedTab === contentType.assignment
                ? ' btn--primary'
                : 'btn--secondary'
            } btn--curved`}
            type={'button'}
            onClick={() => selectContentType(contentType.assignment)}
          >
            {t('Assignment')}
          </Button>
          <Button
            className={`btn  ${
              selectedTab === contentType.document
                ? ' btn--primary'
                : 'btn--secondary'
            } btn--curved`}
            type={'button'}
            onClick={() => selectContentType(contentType.document)}
          >
            {t('Documents')}
          </Button>

          <Button
            className={`btn btn--green btn--curved`}
            type={'button'}
            onClick={() => selectContentType('pastPaper')}
          >
            {t('Past paper')}
          </Button>
        </div>
        <div className="bulkView__buttons--right">
          <Search
            searchClassName={'form-input form-input--search'}
            placeholder={t('Search a video')}
            onChange={value => setSearchText(value)}
          />
        </div>
      </div>
      <div className="bulkView__reels">
        {isInitialLoading ? (
          <LoadingScreen />
        ) : topics?.length > 0 ? (
          topics.map(topic => {
            return (
              <ContentSliderWrapper
                reelIds={reelIds}
                subjectId={subject._id}
                topic={topic}
                key={topic?._id}
                selectedContentType={selectedTab}
                searchText={searchText}
                clickedWatchLater={(videoInfo: any) => {
                  clickedWatchLater(videoInfo);
                }}
                removeWatchLaterVideo={(videoInfo: any) => {
                  removeWatchLaterVideo(videoInfo);
                }}
                handleLikeButtonClick={(
                  videoInfo: ContentType,
                  status: boolean
                ) => {
                  handleLikeButtonClick(videoInfo, status);
                }}
              />
            );
          })
        ) : (
          <NoContent />
        )}
      </div>
    </div>
  );
};

export default BulkView;
