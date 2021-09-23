import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import VisibilitySensor from 'react-visibility-sensor';
import backgroundImage from '../../assets/images/homepage-banner-min.png';
import ContentSlider from '../../Components/ContentSlider/ContentSlider';
import ContinueVideoCard from '../../Components/ContentSlider/ContinueVideoCard';
import DateAndClock from '../../Components/DateAndClockModal/DateAndClock';
import Modal from '../../Components/Modal/Modal';
import {
  CONTENT_SERVICE,
  notificationType,
  PRODUCT_CONTENT_SERVICE,
  PRODUCT_SERVICE,
  USER_CONTENT_SERVICE,
  USER_NOTIFICATION_SERVICE,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';
import useTotalNumberOfRecords from '../../Hooks/useTotalNumberOfRecords';
import UseViewFile from '../../Hooks/UseViewFile';
import { likeVideoContentType } from '../../redux/common/commonReducer';
import {
  GET_ALL_LIKE_VIDEO_DATA_FAIL,
  GET_ALL_LIKE_VIDEO_DATA_REQUEST,
  GET_ALL_LIKE_VIDEO_DATA_SUCCESS,
  GET_ALL_WATCH_LATER_IDS_FAILED,
  GET_ALL_WATCH_LATER_IDS_REQUEST,
  GET_ALL_WATCH_LATER_IDS_SUCCESS,
  SET_EMPTY_ALL_LIKED_CONTENT,
  USER_LAST_WATCHED_VIDEO_CONTENT_FAILED,
  USER_LAST_WATCHED_VIDEO_CONTENT_REQUEST,
  USER_LAST_WATCHED_VIDEO_CONTENT_SUCCESS,
} from '../../redux/common/commonTypes';
import { RootStore } from '../../redux/store';
import { StandardReelType } from '../../redux/student/reelReducer';
import {
  GET_FEATURED_REELS_FAILED,
  GET_FEATURED_REELS_REQUEST,
  GET_FEATURED_REELS_SUCCESS,
  GET_STANDARD_REELS_FAILED,
  GET_STANDARD_REELS_REQUEST,
  GET_STANDARD_REELS_SUCCESS,
  LIKED_VIDEO_CONTENT_FAIL,
  LIKED_VIDEO_CONTENT_REQUEST,
  LIKED_VIDEO_CONTENT_SUCCESS,
  REMOVE_WATCH_LATER_VIDEO_FAILED,
  REMOVE_WATCH_LATER_VIDEO_REQUEST,
  REMOVE_WATCH_LATER_VIDEO_SUCCESS,
  RESET_REEL_CONTENT_REDUCER,
  RESET_REEL_REDUCER,
  SET_EMPTY_LIKE_CONTENT,
  SUBMIT_LIKE_FAIL,
  SUBMIT_LIKE_REQUEST,
  SUBMIT_LIKE_SUCCESS,
  SUBMIT_REMAINDER_FAILED,
  SUBMIT_REMAINDER_REQUEST,
  SUBMIT_REMAINDER_SUCCESS,
  WATCH_LATER_IDS_FAILED,
  WATCH_LATER_IDS_LOAD_MORE,
  WATCH_LATER_IDS_REQUEST,
  WATCH_LATER_IDS_SUCCESS,
  WATCH_LATER_VIDEO_CONTENT_FAILED,
  WATCH_LATER_VIDEO_CONTENT_LOAD_MORE,
  WATCH_LATER_VIDEO_CONTENT_REQUEST,
  WATCH_LATER_VIDEO_CONTENT_SUCCESS,
} from '../../redux/student/reelTypes';
import { VideoContent } from '../../redux/student/reelVideoReducer';
import { SET_THEATRE_SELECTED_CONTENT } from '../../redux/Theater/TheaterTypes';
import FeaturedSlideContainer from '../FeatureSliderContainer/FeatureSliderContainer';
import VideoSliderContainer from '../VideoSliderContainer/VideoSliderContainer';

const StudentHomeContainer = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const [getStandardReelsApi] = useApi();
  const [getFeaturedReelsApi] = useApi();
  const [getWatchLaterVideoIdsApi] = useApi();
  const [getWatchLaterVideoContentsApi] = useApi();
  const [getLikedVideoContentApi] = useApi();
  const [updateLikeVideoesApi] = useApi();
  const [getAllLikedVideoDetailsApi] = useApi();
  const [getTotalRecordsOfLikedVideos, likedVideoesTotalRecords] =
    useTotalNumberOfRecords();
  const [getAllWatchLaterVideoContentsApi] = useApi();
  const [removeWatchLaterVideoApi] = useApi();
  const [submitRemainderApi] = useApi();

  const [getVideoThumbnail, videoThumbnailUrl] = UseViewFile();
  const [getWelcomeVideo, welcomeVideoUrl] = UseViewFile();

  const [getWatchLaterIdsTotalRecords, watchLaterIdsTotalNumberOfRecords] =
    useTotalNumberOfRecords();
  const [getTotalRecords, totalRecords] = useTotalNumberOfRecords();

  const [dynamicSize, setDynamicSize] = useState<number>(0);
  const [dynamicSizeLike, setDynamicSizeLike] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedContent, setSelectedContent] = useState<any>();
  const [reminderDate, setRemainderDate] = useState<Date>(new Date());

  const {
    featuredReelContent,
    isLoadingNotification,
    likedVideoesContent,
    likedVideoesContentPage,
    likedVideoesContentTotalRecords,
    watchLaterIdsPage,
    watchLaterIdsSize,
    watchLaterVideoReelContent,
    watchLaterVideoReelContentIds,
  } = useSelector((state: RootStore) => state.reelVideos);
  const { userData, userWelcomeVideo } = useSelector(
    (state: RootStore) => state.auth
  );
  const { standardReels, standardReelCurrentPage, standardReelPageSize } =
    useSelector((state: RootStore) => state.reels);
  const { lastMessage } = useSelector((state: RootStore) => state?.websocket);
  const {
    allWatchLaterContentIds,
    allLikedVideoesContent,
    lastWatchedVideoContent,
    lastWatchedContentInfo,
  } = useSelector((state: RootStore) => state.common);

  const featuredReelPosition =
    Math.max(Number(process.env.REACT_APP_FEATURED_REEL_POSITION), 1) - 1;

  const removeWatchLaterVideo = (videoInfo: any) => {
    const notificationId = allWatchLaterContentIds?.find(
      contentIds => contentIds.contentId === videoInfo?.contentId
    );
    removeWatchLaterVideoApi(
      `/user-notification-settings/${notificationId?._id}`,
      REMOVE_WATCH_LATER_VIDEO_REQUEST,
      REMOVE_WATCH_LATER_VIDEO_SUCCESS,
      REMOVE_WATCH_LATER_VIDEO_FAILED,
      {},
      {},
      'DELETE',
      false,
      USER_NOTIFICATION_SERVICE,
      { videoInfo, watchLaterIds: notificationId }
    );
  };
  const getStandardReelsForUser = (page: number) => {
    const groupByCriteria = ['SYLLABUS', 'GRADE', 'SUBJECT'];
    getStandardReelsApi(
      `/users/${userData?._id}/standardReelData?page=${page}&size=${standardReelPageSize}&groupByCriteria=${groupByCriteria}`,
      GET_STANDARD_REELS_REQUEST,
      GET_STANDARD_REELS_SUCCESS,
      GET_STANDARD_REELS_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_SERVICE
    );
  };

  const getFeaturedReelsForUser = (size: number) => {
    getFeaturedReelsApi(
      `/users/${userData?._id}/featuredReels?page=1&size=${size}`,
      GET_FEATURED_REELS_REQUEST,
      GET_FEATURED_REELS_SUCCESS,
      GET_FEATURED_REELS_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_SERVICE
    );
  };
  const getWatchLaterVideosId = (
    page: number,
    size: number,
    SUCCESS_TYPE: string
  ) => {
    getWatchLaterVideoIdsApi(
      `/users/${userData?._id}/finish-later-contents?page=${page}&size=${size}`,
      WATCH_LATER_IDS_REQUEST,
      SUCCESS_TYPE,
      WATCH_LATER_IDS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_CONTENT_SERVICE
    );
  };

  const getAllWatchLaterVideoContents = (size: number) => {
    getAllWatchLaterVideoContentsApi(
      `/users/${userData?._id}/finish-later-contents?page=1&size=${size}`,
      GET_ALL_WATCH_LATER_IDS_REQUEST,
      GET_ALL_WATCH_LATER_IDS_SUCCESS,
      GET_ALL_WATCH_LATER_IDS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_CONTENT_SERVICE,
      {}
    );
  };

  const getWatchLaterVideoContents = (
    ContentIds: string[],
    successType: string
  ) => {
    getWatchLaterVideoContentsApi(
      `/contents/learningMaterials?contentIds=${ContentIds}&page=1&size=${watchLaterVideoReelContentIds?.length}`,
      WATCH_LATER_VIDEO_CONTENT_REQUEST,
      successType,
      WATCH_LATER_VIDEO_CONTENT_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };
  const getLikedVideoContents = (page: number, refreshStatus: boolean) => {
    const contentIds = allLikedVideoesContent?.map(
      (data: likeVideoContentType) => data?.contentId
    );
    contentIds?.length &&
      getLikedVideoContentApi(
        `/contents/learningMaterials?contentIds=${contentIds}&page=${page}&size=10`,
        LIKED_VIDEO_CONTENT_REQUEST,
        LIKED_VIDEO_CONTENT_SUCCESS,
        LIKED_VIDEO_CONTENT_FAIL,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        { refreshStatus }
      );
  };
  const getAllLikedVideoDetails = (size: number) => {
    getAllLikedVideoDetailsApi(
      `/users/${userData?._id}/user-reactions?reaction=LIKE&page=1&size=${size}`,
      GET_ALL_LIKE_VIDEO_DATA_REQUEST,
      GET_ALL_LIKE_VIDEO_DATA_SUCCESS,
      GET_ALL_LIKE_VIDEO_DATA_FAIL,
      {},
      {},
      'GET',
      false,
      PRODUCT_CONTENT_SERVICE
    );
  };

  useEffect(() => {
    if (allWatchLaterContentIds?.length) {
      watchLaterIdsSize &&
        watchLaterIdsPage &&
        getWatchLaterVideosId(
          watchLaterIdsPage,
          watchLaterIdsSize,
          WATCH_LATER_IDS_SUCCESS
        );
    }
  }, [allWatchLaterContentIds]);

  useEffect(() => {
    if (allLikedVideoesContent?.length) {
      getLikedVideoContents(1, true);
    }
  }, [allLikedVideoesContent]);

  useEffect(() => {
    if ((watchLaterVideoReelContentIds?.length || 0) > watchLaterIdsSize) {
      getWatchLaterVideoContents(
        watchLaterVideoReelContentIds
          ?.slice(
            watchLaterVideoReelContentIds?.length - watchLaterIdsSize,
            watchLaterVideoReelContentIds?.length
          )
          .map(content => content?.contentId) || [],
        WATCH_LATER_VIDEO_CONTENT_LOAD_MORE
      );
    } else {
      watchLaterVideoReelContentIds?.length &&
        getWatchLaterVideoContents(
          watchLaterVideoReelContentIds?.map(content => content.contentId) ||
            [],
          WATCH_LATER_VIDEO_CONTENT_SUCCESS
        );
    }
  }, [watchLaterVideoReelContentIds]);

  const getTotalRecordsOfWatchLater = () => {
    getWatchLaterIdsTotalRecords(
      `/users/${userData?._id}/finish-later-contents?page=1&size=${
        dynamicSize + 1
      }`,
      USER_CONTENT_SERVICE
    );
    setDynamicSize(dynamicSize + 1);
  };
  const getTotalNumberOfLikedVideoes = () => {
    getTotalRecordsOfLikedVideos(
      `/users/${userData?._id}/user-reactions?reaction=LIKE&page=1&size=${
        dynamicSizeLike + 1
      }`,
      PRODUCT_CONTENT_SERVICE
    );
    setDynamicSizeLike(dynamicSizeLike + 1);
  };

  useEffect(() => {
    if (
      lastMessage?.task === notificationType.CREATE_REMINDER_SETTINGS ||
      lastMessage?.task === notificationType.REMOVE_WATCH_LATER
    ) {
      getTotalRecordsOfWatchLater();
    }

    if (
      (lastMessage?.task === notificationType.USER_REACTION_UPDATE ||
        lastMessage?.task === notificationType.USER_REACTION_CREATE) &&
      lastMessage?.webSocketResponseStatus === notificationType.SUCCESS
    ) {
      getTotalNumberOfLikedVideoes();
    }
  }, [lastMessage]);

  useEffect(() => {
    if (watchLaterIdsTotalNumberOfRecords > 0) {
      getAllWatchLaterVideoContents(watchLaterIdsTotalNumberOfRecords);
    } else {
      dispatch({
        type: GET_ALL_WATCH_LATER_IDS_SUCCESS,
        payload: { dataWrapper: { data: [] } },
      });
    }
  }, [watchLaterIdsTotalNumberOfRecords]);

  useEffect(() => {
    if (likedVideoesTotalRecords > 0) {
      getAllLikedVideoDetails(likedVideoesTotalRecords);
    } else {
      dispatch({
        type: SET_EMPTY_LIKE_CONTENT,
      });
      dispatch({
        type: SET_EMPTY_ALL_LIKED_CONTENT,
      });
    }
  }, [likedVideoesTotalRecords]);

  useEffect(() => {
    userData && getTotalNumberOfLikedVideoes();
    getTotalRecordsOfWatchLater();
    watchLaterIdsSize &&
      watchLaterIdsPage &&
      getWatchLaterVideosId(
        watchLaterIdsPage,
        watchLaterIdsSize,
        WATCH_LATER_IDS_SUCCESS
      );

    //unmount remove data.
    return () => {
      dispatch({
        type: RESET_REEL_REDUCER,
      });
      dispatch({
        type: RESET_REEL_CONTENT_REDUCER,
      });
    };
  }, []);

  useEffect(() => {
    if (userData?._id) {
      getStandardReelsForUser(1);
      getTotalRecords(`/users/${userData?._id}/featuredReels`, PRODUCT_SERVICE);
    }
  }, [userData]);
  useEffect(() => {
    //pass total records to user details  api.
    userData && totalRecords > 0 && getFeaturedReelsForUser(totalRecords);
  }, [totalRecords]);

  const topStandardReels = useMemo(() => {
    return standardReels.slice(0, featuredReelPosition);
  }, [standardReels]);

  const bottomStandardReels = useMemo(() => {
    return standardReels.slice(featuredReelPosition);
  }, [standardReels]);

  const getNextStandardReels = () => {
    if (
      standardReelCurrentPage * standardReelPageSize ===
      standardReels.length
    ) {
      const nextPage = standardReelCurrentPage + 1;
      getStandardReelsForUser(nextPage);
    }
  };

  const generateUniqueReelKeyFromIds = (reels: StandardReelType[]) => {
    return reels.map(({ _id }) => _id).join('_');
  };

  const createRemainderWithEmptyDate = () => {
    const reminderData = {
      userId: userData?._id,
      contentId: selectedContent.contentId,
      userNotificationType: 'REMINDER',
    };
    submitRemainderApi(
      `/user-notification-settings`,
      SUBMIT_REMAINDER_REQUEST,
      SUBMIT_REMAINDER_SUCCESS,
      SUBMIT_REMAINDER_FAILED,
      reminderData,
      {},
      'POST',
      false,
      USER_NOTIFICATION_SERVICE
    );
  };
  const createRemainderDate = () => {
    const reminderData = {
      userId: userData?._id,
      contentId: selectedContent.contentId,
      reminderDate: reminderDate.toISOString(),
      userNotificationType: 'REMINDER',
    };
    submitRemainderApi(
      `/user-notification-settings`,
      SUBMIT_REMAINDER_REQUEST,
      SUBMIT_REMAINDER_SUCCESS,
      SUBMIT_REMAINDER_FAILED,
      reminderData,
      {},
      'POST',
      false,
      USER_NOTIFICATION_SERVICE,
      { videoInfo: selectedContent }
    );
  };

  const handleLikeButtonClick = (video: any, status: boolean) => {
    const likeData = {
      userId: userData?._id,
      contentId: video?.contentId,
      reaction: status ? 'LIKE' : 'UNLIKE',
    };
    updateLikeVideoesApi(
      `/user-reactions`,
      SUBMIT_LIKE_REQUEST,
      SUBMIT_LIKE_SUCCESS,
      SUBMIT_LIKE_FAIL,
      likeData,
      {},
      'PUT',
      false,
      PRODUCT_CONTENT_SERVICE
    );
  };

  useEffect(() => {
    if (!isLoadingNotification) {
      setIsOpen(false);
    }
  }, [isLoadingNotification]);

  const clickedWatchLater = (videoInfo: any) => {
    setIsOpen(true);
    setSelectedContent(videoInfo);
  };

  useEffect(() => {
    if (lastWatchedContentInfo) {
      const { contentId, userWatchedLength, videoLength } =
        lastWatchedContentInfo;

      contentId &&
        getLikedVideoContentApi(
          `/contents/learningMaterials?contentIds=${contentId}&page=1&size=1`,
          USER_LAST_WATCHED_VIDEO_CONTENT_REQUEST,
          USER_LAST_WATCHED_VIDEO_CONTENT_SUCCESS,
          USER_LAST_WATCHED_VIDEO_CONTENT_FAILED,
          {},
          {},
          'GET',
          false,
          CONTENT_SERVICE,
          { userWatchedLength, videoLength }
        );
    }
  }, [lastWatchedContentInfo]);

  const getThumbnail = (content: any) => {
    const { previewImageKey } = content;

    getVideoThumbnail(previewImageKey.bucketName, previewImageKey.fileKey);
  };

  useEffect(() => {
    if (userWelcomeVideo) {
      const { commonVideo } = userWelcomeVideo;
      getThumbnail(userWelcomeVideo);
      getWelcomeVideo(commonVideo.bucketName, commonVideo.fileKey);
    }
  }, [userWelcomeVideo]);

  useEffect(() => {
    lastWatchedVideoContent && getThumbnail(lastWatchedVideoContent);
  }, [lastWatchedVideoContent]);

  const onMiniPlayerClick = (contentId: string, videoList: VideoContent[]) => {
    if (contentId) {
      const selectedContent = videoList.find(v => v.contentId === contentId);
      selectedContent &&
        dispatch({
          type: SET_THEATRE_SELECTED_CONTENT,
          payload: { customInput: selectedContent },
        });

      contentId &&
        history.push(`/theater/${contentId}`, {
          internalRoute: true,
        });
    }
  };

  return (
    <div className="homepage">
      <div
        className="container banner-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <ContinueVideoCard
        lastWatchedVideoEnable={!!lastWatchedVideoContent}
        videoThumbnailUrl={videoThumbnailUrl}
        cardInformation={lastWatchedVideoContent || userWelcomeVideo || {}}
        welcomeVideoUrl={welcomeVideoUrl}
        reelIds={lastWatchedContentInfo?.relatedReelIds || []}
      />
      {topStandardReels.map(reels => {
        return (
          <VideoSliderContainer
            reels={reels}
            key={generateUniqueReelKeyFromIds(reels)}
            onClickWatchLater={(videoInfo: any, isNewRemainder: boolean) => {
              isNewRemainder && clickedWatchLater(videoInfo);
              !isNewRemainder && removeWatchLaterVideo(videoInfo);
            }}
            onClickLikedVideoes={(videoInfo: any, status: boolean) => {
              handleLikeButtonClick(videoInfo, status);
            }}
          />
        );
      })}
      <FeaturedSlideContainer
        onWatchNowClick={contentId =>
          onMiniPlayerClick(contentId, featuredReelContent || [])
        }
      />
      {bottomStandardReels.map(reels => {
        return (
          <VideoSliderContainer
            reels={reels}
            key={generateUniqueReelKeyFromIds(reels)}
            onClickWatchLater={(videoInfo: any, isNewRemainder: boolean) => {
              isNewRemainder && clickedWatchLater(videoInfo);
              !isNewRemainder && removeWatchLaterVideo(videoInfo);
            }}
            onClickLikedVideoes={(videoInfo: any, status: boolean) => {
              handleLikeButtonClick(videoInfo, status);
            }}
          />
        );
      })}

      {likedVideoesContent?.length ? (
        <ContentSlider
          itemKey={'All_Liked_Reels'}
          title={t('Liked Videos')}
          videos={likedVideoesContent || []}
          videosTotalRecords={likedVideoesContentTotalRecords || 0}
          onClickWatchLater={(videoInfo: any, isNewRemainder: boolean) => {
            isNewRemainder && clickedWatchLater(videoInfo);
            !isNewRemainder && removeWatchLaterVideo(videoInfo);
          }}
          onClickLikedVideos={(videoInfo: any, status: boolean) => {
            handleLikeButtonClick(videoInfo, status);
          }}
          getNewVideos={() =>
            !(
              likedVideoesContentTotalRecords === likedVideoesContent?.length
            ) && getLikedVideoContents(likedVideoesContentPage + 1, false)
          }
          onMiniPlayerClick={contentId =>
            onMiniPlayerClick(contentId, likedVideoesContent)
          }
        />
      ) : null}

      {watchLaterVideoReelContent?.length ? (
        <ContentSlider
          itemKey={'finish_Later_reels'}
          title={t('Finish later Videos')}
          videos={watchLaterVideoReelContent || []}
          videosTotalRecords={watchLaterVideoReelContent?.length || 0}
          onClickWatchLater={(videoInfo: any) => {
            removeWatchLaterVideo(videoInfo);
          }}
          onClickLikedVideos={(videoInfo: any, status: boolean) => {
            handleLikeButtonClick(videoInfo, status);
          }}
          getNewVideos={() => {
            getWatchLaterVideosId(
              watchLaterIdsPage + 1,
              watchLaterIdsSize,
              WATCH_LATER_IDS_LOAD_MORE
            );
          }}
          onMiniPlayerClick={contentId =>
            onMiniPlayerClick(contentId, watchLaterVideoReelContent)
          }
        />
      ) : null}

      <VisibilitySensor
        partialVisibility
        onChange={isVisible => isVisible && getNextStandardReels()}
      >
        <div>&nbsp;</div>
      </VisibilitySensor>
      {isOpen && (
        <Modal
          onClickAway={() => setIsOpen(false)}
          customClassName={'watchlater'}
        >
          <DateAndClock
            getValue={(date: Date) => setRemainderDate(date)}
            onSkip={() => createRemainderWithEmptyDate()}
            onSubmit={() => createRemainderDate()}
            onClose={() => setIsOpen(false)}
            isLoading={isLoadingNotification}
          />
        </Modal>
      )}
    </div>
  );
};

export default StudentHomeContainer;
