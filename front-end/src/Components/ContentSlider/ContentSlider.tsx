import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { useHistory } from 'react-router';
import Slider, { LazyLoadTypes } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import AddAssessmentIcon from '../../assets/images/svg-images/icon-addassessment.svg';
import AddDocumentIcon from '../../assets/images/svg-images/icon-adddocument.svg';
import AddLinkedDocumentIcon from '../../assets/images/svg-images/icon-addlinkeddocument.svg';
import AddVideoIcon from '../../assets/images/svg-images/icon-addvideo.svg';
import leftArrow from '../../assets/images/svg-images/reel-left-arrow.svg';
import rightArrow from '../../assets/images/svg-images/reel-right-arrow.svg';
import { contentType } from '../../config/constants';
import MiniPlayer from '../../Containers/MiniPlayer/MiniPlayer';
import { getDistinctArray } from '../../Helper';

type ContentSliderProps = {
  addNewContentToSubject?: Function;
  clickedTutorIndex?: number;
  getNewVideos: Function;
  hoverOnVideo?: Function;
  isAdminView?: boolean;
  itemKey: string;
  maximumSlidesToShow?: number;
  onClickLikedVideos?: Function;
  onClickWatchLater?: Function;
  onMiniPlayerClick?: (contentId: string) => void;
  onSeeMoreClick?: (subjectId: string) => void;
  setPriorityTutorList?: Function;
  showSeeMoreSlide?: boolean;
  title: string;
  videos: any[];
  videosTotalRecords: number;
};

const ContentSlider: FC<ContentSliderProps> = ({
  addNewContentToSubject,
  clickedTutorIndex,
  getNewVideos,
  hoverOnVideo,
  isAdminView = false,
  itemKey,
  maximumSlidesToShow,
  onClickLikedVideos,
  onClickWatchLater,
  onMiniPlayerClick,
  onSeeMoreClick = (subjectId: string) => {},
  setPriorityTutorList,
  showSeeMoreSlide,
  title = '',
  videos,
  videosTotalRecords,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [featuredVideoData, setFeaturedVideoData] = useState({
    isMouseOver: '',
    zoomEffect: 'zoomEffect',
    zoomEffectRow: 'zoomEffectRow',
    videoInfo: '--close',
    videoInfoData: '',
    currentSlide: 0,
    videoInfoAnimationClass: '',
    videoInfoActiveClass: '',
  });
  const [isMiniVideoHover, setIsMiniVideoHover] = useState(false);

  const [isTitleShow, setIsTitleShow] = useState(true);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [showContentMenu, setShowContentMenu] = useState(false);
  const [visibleFirstSlideIndex, setVisibleFirstSlideIndex] = useState(0);

  const [sliderRef, setSliderRef] = useState<any>();

  useEffect(() => {
    clickedTutorIndex && clickedTutorIndex < 0 && sliderRef.slickGoTo(0);
  }, [clickedTutorIndex]);

  useEffect(() => {
    if (videosTotalRecords > 0) sliderRef?.slickGoTo(0);
  }, [videosTotalRecords]);

  /**
   *  Check third item in class list array
   */
  const hideTitleOnHover = (node: any) => {
    if (node && node.classList[3] === 'first-element' && !isAdminView) {
      setIsTitleShow(false);
    } else {
      setIsTitleShow(true);
    }
  };

  const findFirstAndLastElement = (option: boolean | number) => {
    const nodes = document.getElementsByClassName(`item-${itemKey}`);
    //first slide element
    const elementIndex = isAdminView ? 2 : 1;
    const elements =
      nodes[0].childNodes[0].childNodes[elementIndex].childNodes[1];
    if (elements) {
      const elementsNew = elements.childNodes[0].childNodes;
      if (elementsNew[0]) {
        const singleElementWidthItem = (
          elementsNew[0] as HTMLElement
        ).style.width.match(/\d+/g);
        const singleElementWidth = Number(singleElementWidthItem?.[0] || 0);
        const moveElement = (
          (elements.childNodes[0] as HTMLElement).style as any
        ).msTransform.match(/\d+/g);
        const firstElement = moveElement[0] / singleElementWidth + 1;
        let i = 0;
        elementsNew.forEach((node: any) => {
          i++;
          node.classList.remove('first-element');
          node.classList.remove('last-element');

          if (option) {
            if (firstElement == i) {
              node.classList.add('first-element');
            }
            const lastElement = firstElement + 4;

            if (lastElement == i) {
              node.classList.add('last-element');

              node.addEventListener('mouseenter', () => {
                hideTitleOnHover(node);
              });

              node.addEventListener('mouseleave', () => {
                hideTitleOnHover(false);
              });
            }
          }
        });
      }
    }
  };

  useEffect(() => {
    const nodes = document.getElementsByClassName(`item-${itemKey}`);
    //first slide element
    const elementIndex = isAdminView ? 2 : 1;
    const elements =
      nodes[0].childNodes[0].childNodes[elementIndex].childNodes[1];
    if (elements) {
      const elementsNew = elements.childNodes[0].childNodes;
      //  calculation part
      let i = 0;
      elementsNew.forEach((node: any) => {
        i++;
        if (12 == i) {
          node.classList.add('last-element');
        }

        node.addEventListener('mouseenter', () => {
          findFirstAndLastElement(true);
          hideTitleOnHover(node);
        });
        node.addEventListener('mouseleave', () => {
          hideTitleOnHover(false);
          findFirstAndLastElement(false);
        });
      });
    }
  }, [videos]);

  useEffect(() => {
    const root = document.getElementById('root');
    return () => {
      root && (root.className = '');
    };
  }, []);

  useEffect(() => {
    if (!videos.length) return;
    const visibleVideos = videos.slice(
      visibleFirstSlideIndex,
      visibleFirstSlideIndex + visibleSlideCount()
    );
    const tutorIds = visibleVideos.map(vid => vid.tutorIds || []).flat();
    setPriorityTutorList?.(getDistinctArray(tutorIds));
  }, [visibleFirstSlideIndex, videos]);

  const { zoomEffect, zoomEffectRow, videoInfo } = featuredVideoData;

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div className="slick-next" onClick={onClick}>
        <img
          src={rightArrow}
          alt="rightArrow-icon"
          className="dark-icon icon--rightArrow"
        />
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div className="slick-prev" onClick={onClick}>
        <img
          src={leftArrow}
          alt="leftArrow-icon"
          className="dark-icon icon--leftArrow"
        />
      </div>
    );
  };

  /**
   * Show visibleSlide Count for responsive screens
   */
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
    if (
      current <= next &&
      visibleSlideCount() + next >= videos.length &&
      visibleSlideCount() * 10 > videos.length
    ) {
      getNewVideos();
    }
  };

  const lazyLoad: LazyLoadTypes = 'ondemand';

  const settings = {
    className: 'left',
    dots: false,
    infinite: false,
    lazyLoad,
    slidesToScroll: 5,
    slidesToShow: 5,
    speed: 500,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current: number, next: number) => {
      checkForSliderEnd(current, next);
      setSliderIndex(Math.ceil(next / visibleSlideCount()));
    },
    afterChange: (currentSlide: number) => {
      findFirstAndLastElement(currentSlide);
      setVisibleFirstSlideIndex(currentSlide);
    },
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
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
        },
      },
    ],
  };

  const videoList = () => {
    const slides =
      videos?.map((video, key) => {
        const [tutorId] = video?.tutorIds || [];

        return (
          // Add class unpublished when the video is unpublished
          <div
            className={`featured-video__item ${zoomEffect} ${
              video?.type === contentType.video ? 'videoItem' : 'nonVideoItem'
            }`}
            key={key}
          >
            <MiniPlayer
              videoInfo={video}
              isVideoInfoOpen={false}
              handlePlayerHover={(status: any) => {
                setIsMiniVideoHover(status);
                hoverOnVideo &&
                  hoverOnVideo(status ? { subjectId: itemKey, tutorId } : null);
              }}
              groupId={''}
              onClickWatchLater={isSetNew =>
                onClickWatchLater && onClickWatchLater(video, isSetNew)
              }
              onClickLikedVideoes={(isSetNew: boolean) => {
                onClickLikedVideos && onClickLikedVideos(video, isSetNew);
              }}
              onMiniPlayerClick={() => onMiniPlayerClick?.(video?.contentId)}
            />
          </div>
        );
      }) || [];

    return maximumSlidesToShow ? slides.slice(0, maximumSlidesToShow) : slides;
  };

  const pagination = () => {
    const sliderCount = Math.ceil(videosTotalRecords / visibleSlideCount());
    const max = sliderCount > 10 ? 10 : sliderCount;
    const listItem = [];

    let count;
    for (count = 0; count < max; count++) {
      listItem.push(
        <li className={sliderIndex === count ? 'active' : ''} key={count}>
          {sliderIndex === count ? sliderIndex + 1 : ''}
        </li>
      );
    }
    if (sliderIndex > 5) {
      return listItem.slice(5, 10);
    } else {
      return listItem.slice(0, 5);
    }
  };

  return (
    <div
      className={`featured-video__info${videoInfo} item-${itemKey}`}
      id={itemKey}
    >
      <div
        className={`featured-video ${zoomEffectRow} ${
          isAdminView ? 'admin-mode' : ''
        }`}
      >
        <div
          className={`featured-video__title ${
            isMiniVideoHover ? 'moveup' : ''
          }`}
        >
          {isTitleShow && (
            <p>
              {title || ''}
              <span onClick={() => onSeeMoreClick(videos[0].subjectId)}>
                {t('Explore More')}
              </span>
            </p>
          )}

          {videos && videos.length > 5 && (
            <ul className="theatre__assessment-pagination">{pagination()}</ul>
          )}
        </div>

        {/* admin view button to add videos */}
        {isAdminView && (
          <>
            <div
              className="add-video--button"
              onClick={() => setShowContentMenu(true)}
            >
              <p>{t('Add New Video')}</p>
              {showContentMenu && (
                <div className="add-new-item">
                  <a
                    className="btn-close"
                    aria-hidden="true"
                    onClick={e => {
                      e.stopPropagation();
                      setShowContentMenu(false);
                    }}
                  >
                    &times;
                  </a>

                  <ul>
                    <li
                      onClick={() =>
                        addNewContentToSubject?.(contentType.video, itemKey)
                      }
                    >
                      <img src={AddVideoIcon} alt="AddVideoIcon" />
                      {t('Add Video')}
                    </li>
                    <li
                      onClick={() =>
                        addNewContentToSubject?.(contentType.document, itemKey)
                      }
                    >
                      <img src={AddDocumentIcon} alt="AddDocumentIcon" />
                      {t('Add Document')}
                    </li>
                    <li
                      onClick={() =>
                        addNewContentToSubject?.(
                          contentType.assignment,
                          itemKey
                        )
                      }
                    >
                      <img src={AddAssessmentIcon} alt="AddAssessmentIcon" />
                      {t('Add Assessment')}
                    </li>
                    <li
                      onClick={() =>
                        addNewContentToSubject?.(
                          contentType.linkedDocument,
                          itemKey
                        )
                      }
                    >
                      <img
                        src={AddLinkedDocumentIcon}
                        alt="AddLinkedDocumentIcon"
                      />
                      {t('Add linked Document')}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
        {videos.length ? (
          <Slider ref={setSliderRef} {...settings}>
            {videoList()}
            {showSeeMoreSlide ? (
              <div
                onClick={() => onSeeMoreClick(videos[0].subjectId)}
                className="featured-video__explore-button"
              >
                <BsFillGrid3X3GapFill />
                <span>{t('Explore More')}</span>
              </div>
            ) : null}
          </Slider>
        ) : (
          <div className="featured-video__novideo"></div>
        )}
      </div>
    </div>
  );
};
export default ContentSlider;
