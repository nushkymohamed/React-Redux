import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ContentSlider from '../../Components/ContentSlider/ContentSlider';
import TutorsSlider from '../../Components/TutorSlider/TutorsSlider';
import {
  contentType,
  PRODUCT_CONTENT_SERVICE,
  ReelTypes,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';
import { RootStore } from '../../redux/store';
import { StandardReelType } from '../../redux/student/reelReducer';
import {
  GET_STANDARD_REEL_CONTENT_FAILED,
  GET_STANDARD_REEL_CONTENT_REQUEST,
  GET_STANDARD_REEL_CONTENT_SUCCESS,
  GET_STANDARD_REEL_TUTOR_FAILED,
  GET_STANDARD_REEL_TUTOR_REQUEST,
  GET_STANDARD_REEL_TUTOR_SUCCESS,
} from '../../redux/student/reelTypes';
import { SET_THEATRE_SELECTED_CONTENT } from '../../redux/Theater/TheaterTypes';

type VideoSliderContainerProps = {
  reels: StandardReelType[];
  onClickWatchLater?: Function;
  onClickLikedVideoes?: Function;
};

const VideoSliderContainer: FC<VideoSliderContainerProps> = ({
  reels,
  onClickWatchLater,
  onClickLikedVideoes,
}) => {
  const reelIds = useMemo(() => reels.map(({ _id }) => _id) || [], [reels]);
  const uniqueReelId = reelIds.join('_');
  const { reelTitle } = reels[0] || {};
  const [getStandardReelContentApi] = useApi();
  const [getStandardReelTutorsApi] = useApi();
  const dispatch = useDispatch();

  const { userData } = useSelector((state: RootStore) => state.auth);
  const [hoveredVideoTutor, setHoveredVideoTutor] = useState<string | null>(
    null
  );
  const [clickedTutor, setClickedTutor] = useState('');
  const [priorityTutorList, setPriorityTutorList] = useState<string[]>([]);
  const { standardReelVideoContent } = useSelector(
    (state: RootStore) => state.reelVideos
  );
  const { standardReelTutorContent } = useSelector(
    (state: RootStore) => state.reelTutors
  );

  const { watchLaterIdsTotalRecords, isLoadingNotification } = useSelector(
    (state: RootStore) => state.reelVideos
  );
  const history = useHistory();

  const {
    videos = [],
    totalRecords: videoTotalRecords = 0,
    currentPage: videoCurrentPage = 1,
  } = standardReelVideoContent[uniqueReelId] || {};
  const {
    tutors = [],
    totalRecords: tutorTotalRecords = 0,
    currentPage: tutorCurrentPage = 1,
  } = standardReelTutorContent[uniqueReelId] || {};

  const getStandardReelContent = (page: number) => {
    getStandardReelContentApi(
      `/users/${
        userData?._id
      }/combinedReels/reelContent?reelIds=${reelIds}&contentTypes=${
        contentType.video
      }&reelType=${ReelTypes.STANDARD}${
        clickedTutor ? `&tutorIds=${clickedTutor}` : ''
      }&page=${page}&size=49`, //maximum 49 videos will be shown in the reel
      GET_STANDARD_REEL_CONTENT_REQUEST,
      GET_STANDARD_REEL_CONTENT_SUCCESS,
      GET_STANDARD_REEL_CONTENT_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_CONTENT_SERVICE,
      { reelId: uniqueReelId, page }
    );
  };

  const getStandardReelTutors = (page: number) => {
    getStandardReelTutorsApi(
      `/tutors?reelIds=${reelIds}&page=${page}&size=10${
        priorityTutorList.length
          ? `&priorityTutorsOrder=${priorityTutorList}`
          : ''
      }`,
      GET_STANDARD_REEL_TUTOR_REQUEST,
      GET_STANDARD_REEL_TUTOR_SUCCESS,
      GET_STANDARD_REEL_TUTOR_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_CONTENT_SERVICE,
      { reelId: uniqueReelId }
    );
  };

  useEffect(() => {
    if (reelIds.length) {
      getStandardReelContent(1);
      getStandardReelTutors(1);
    }
  }, [reelIds]);

  useEffect(() => {
    getStandardReelTutors(1);
  }, [priorityTutorList]);

  useEffect(() => {
    getStandardReelContent(1);
  }, [clickedTutor]);

  const getVideoNextPage = () => {
    getStandardReelContent(videoCurrentPage + 1);
  };
  const getTutorNextPage = () => {
    getStandardReelTutors(tutorCurrentPage + 1);
  };

  const selectedVideoTutor = (data: any) => {
    setHoveredVideoTutor(data?.tutorId);
  };

  const onTutorClick = (tutorId: string) => {
    if (clickedTutor === tutorId) {
      setClickedTutor('');
    } else {
      setClickedTutor(tutorId);
    }
  };

  const onSeeMoreSlideClick = (id: string) => {
    history.push(`/bulk-view/${id}`, {
      reelIds,
    });
    //TODO redirect to bulk view with proper reel details
  };

  const onMiniPlayerClick = (contentId: string) => {
    if (contentId) {
      const selectedContent = videos.find(v => v.contentId === contentId);
      selectedContent &&
        dispatch({
          type: SET_THEATRE_SELECTED_CONTENT,
          payload: { customInput: selectedContent },
        });

      history.push(`/theater/${contentId}`, {
        reelIds,
        internalRoute: true,
      });
    }
  };

  return (
    <>
      <ContentSlider
        getNewVideos={getVideoNextPage}
        hoverOnVideo={selectedVideoTutor}
        itemKey={uniqueReelId}
        maximumSlidesToShow={49}
        onSeeMoreClick={(id: string) => onSeeMoreSlideClick(id)}
        setPriorityTutorList={setPriorityTutorList}
        showSeeMoreSlide
        title={reelTitle}
        videos={videos}
        videosTotalRecords={videoTotalRecords}
        onClickWatchLater={(video: any, isNewRemainder: boolean) =>
          onClickWatchLater && onClickWatchLater(video, isNewRemainder)
        }
        onClickLikedVideos={(video: any, status: boolean) =>
          onClickLikedVideoes && onClickLikedVideoes(video, status)
        }
        onMiniPlayerClick={onMiniPlayerClick}
      />
      <TutorsSlider
        getNewTutors={getTutorNextPage}
        highlightedTutorId={clickedTutor || hoveredVideoTutor}
        itemKey={uniqueReelId}
        onTutorClick={onTutorClick}
        tutors={tutors}
      />
    </>
  );
};

export default VideoSliderContainer;
