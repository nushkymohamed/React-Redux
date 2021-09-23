import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import VisibilitySensor from 'react-visibility-sensor';
import BulkView from '../../Components/BulkView/BulkView';
import DateAndClock from '../../Components/DateAndClockModal/DateAndClock';
import Modal from '../../Components/Modal/Modal';
import {
  contentType,
  CONTENT_SERVICE,
  notificationType,
  PAYMENT_SERVICE,
  PRODUCT_CONTENT_SERVICE,
  USER_CONTENT_SERVICE,
  USER_NOTIFICATION_SERVICE,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';
import useDataBase from '../../Hooks/useDataBase';
import useTotalNumberOfRecords from '../../Hooks/useTotalNumberOfRecords';
import { ContentType } from '../../redux/bulkView/bulkViewReducer';
import {
  BULK_VIEW_WATCH_LATER_IDS_FAILED,
  BULK_VIEW_WATCH_LATER_IDS_REQUEST,
  GET_ALL_PRODUCT_IDS_BULK_VIEW_FAILED,
  GET_ALL_PRODUCT_IDS_BULK_VIEW_REQUEST,
  GET_ALL_PRODUCT_IDS_BULK_VIEW_SUCCESS,
  GET_TOPICS_BULK_VIEW_FAILED,
  GET_TOPICS_BULK_VIEW_REQUEST,
  GET_TOPICS_BULK_VIEW_SUCCESS,
  GET_TUTORS_BULK_VIEW_FAILED,
  GET_TUTORS_BULK_VIEW_REQUEST,
  GET_TUTORS_BULK_VIEW_SUCCESS,
  LOAD_MORE_TOPICS_BULK_VIEW_SUCCESS,
  LOAD_MORE_TUTORS_BULK_VIEW_SUCCESS,
  REMOVE_WATCH_LATER_VIDEO_BULK_VIEW_FAILED,
  REMOVE_WATCH_LATER_VIDEO_BULK_VIEW_REQUEST,
  REMOVE_WATCH_LATER_VIDEO_BULK_VIEW_SUCCESS,
  RESET_BULK_VIEW_REDUCER,
  SET_TOGGLE_SELECT_ALL_BULK_TUTOR,
  SUBMIT_BULK_VIEW_LIKE_FAIL,
  SUBMIT_BULK_VIEW_LIKE_REQUEST,
  SUBMIT_BULK_VIEW_LIKE_SUCCESS,
  SUBMIT_WATCH_LATER_BULK_VIEW_FAILED,
  SUBMIT_WATCH_LATER_BULK_VIEW_REQUEST,
  SUBMIT_WATCH_LATER_BULK_VIEW_SUCCESS,
} from '../../redux/bulkView/bulkViewType';
import { singleSubjectType } from '../../redux/common/commonReducer';
import {
  GET_ALL_LIKE_VIDEO_DATA_FAIL,
  GET_ALL_LIKE_VIDEO_DATA_REQUEST,
  GET_ALL_LIKE_VIDEO_DATA_SUCCESS,
  GET_ALL_WATCH_LATER_IDS_FAILED,
  GET_ALL_WATCH_LATER_IDS_REQUEST,
  GET_ALL_WATCH_LATER_IDS_SUCCESS,
  SET_EMPTY_ALL_LIKED_CONTENT,
} from '../../redux/common/commonTypes';
import { RootStore } from '../../redux/store';
import { SET_EMPTY_LIKE_CONTENT } from '../../redux/student/reelTypes';

type UrlParamsType = {
  subjectId: string;
};
const BulkViewContainer = (props: any) => {
  const { reelIds } = props.location?.state;
  const dispatch = useDispatch();

  const [getTotalProductCount, totalProductCount] = useTotalNumberOfRecords();
  const [getTutorsApi] = useApi();
  const [getALlProductIdsBySubscriptionApi] = useApi();
  const [getTopicsApi] = useApi();
  const [getAllLikedVideoDetailsApi] = useApi();
  const [updateLikeVideosApi] = useApi();
  const [getWatchLaterVideoIdsApi] = useApi();
  const [removeWatchLaterVideoApi] = useApi();
  const [getAllWatchLaterVideoContentsApi] = useApi();
  const [submitRemainderApi] = useApi();

  const [getTotalRecordsOfLikedVideos, likedVideosTotalRecords] =
    useTotalNumberOfRecords();
  const [getWatchLaterIdsTotalRecords, watchLaterIdsTotalNumberOfRecords] =
    useTotalNumberOfRecords();

  const [getSubjectList, subjectList] = useDataBase();
  const { userData } = useSelector((state: RootStore) => state.auth);
  const { lastMessage } = useSelector((state: RootStore) => state.websocket);

  const {
    allProductIds,
    isAllTutorsSelected,
    isInitialLoading,
    topicPage,
    topicSize,
    topicTotalRecords,
    topics,
    tutors,
    tutorsPage,
    tutorsSize,
    tutorsTotalRecords,
    selectedTutorId,
    isLoadingReminderSubmit,
  } = useSelector((state: RootStore) => state.bulkView);
  const { allLikedVideoesContent, allWatchLaterContentIds } = useSelector(
    (state: RootStore) => state.common
  );
  const sliderRef = useRef<any>();
  const [sliderIndex, setSliderIndex] = useState(0);
  const [dynamicSizeLike, setDynamicSizeLike] = useState<number>(0);
  const { subjectId } = useParams<UrlParamsType>();
  const [dynamicSize, setDynamicSize] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [reminderDate, setRemainderDate] = useState<Date>(new Date());
  const [selectedContent, setSelectedContent] = useState<any>();

  useEffect(() => {
    userData?._id &&
      getTotalProductCount(
        `/users/${userData._id}/user-subscriptions?page=1`,
        PAYMENT_SERVICE
      );
    subjectId && getSubjectList('subject', { ids: [subjectId] });
  }, []);

  const getALlProductIdsBySubscription = () => {
    getALlProductIdsBySubscriptionApi(
      `/users/${userData?._id}/user-subscriptions?page=1&size=${totalProductCount}`,
      GET_ALL_PRODUCT_IDS_BULK_VIEW_REQUEST,
      GET_ALL_PRODUCT_IDS_BULK_VIEW_SUCCESS,
      GET_ALL_PRODUCT_IDS_BULK_VIEW_FAILED,
      {},
      {},
      'GET',
      false,
      PAYMENT_SERVICE
    );
  };

  useEffect(() => {
    totalProductCount > 0 && getALlProductIdsBySubscription();
  }, [totalProductCount]);

  useEffect(() => {
    allProductIds?.length &&
      subjectId &&
      getTutors(GET_TUTORS_BULK_VIEW_SUCCESS, tutorsPage, tutorsSize);
  }, [allProductIds]);

  const getTutors = (SUCCESS_TYPE: string, page: number, size: number) => {
    getTutorsApi(
      `/subjects/${subjectId}/tutors?productIds=${allProductIds}&page=${page}&size=${size}`,
      GET_TUTORS_BULK_VIEW_REQUEST,
      SUCCESS_TYPE,
      GET_TUTORS_BULK_VIEW_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_CONTENT_SERVICE
    );
  };

  useEffect(() => {
    tutors?.length && getTopics(GET_TOPICS_BULK_VIEW_SUCCESS, topicPage);
  }, [tutors?.length]);
  const [selectedTab, setSelectedTab] = useState(contentType.video);

  const getTopics = (SUCCESS_TYPE: string, page: number) => {
    getTopicsApi(
      `/subjects/${subjectId}/topics?page=${page}&size=${topicSize}`,
      GET_TOPICS_BULK_VIEW_REQUEST,
      SUCCESS_TYPE,
      GET_TOPICS_BULK_VIEW_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };
  useEffect(() => {
    getTopics(GET_TOPICS_BULK_VIEW_SUCCESS, 1);
  }, []);

  useEffect(() => {
    getTopics(GET_TOPICS_BULK_VIEW_SUCCESS, 1);
  }, [selectedTab, selectedTutorId, isAllTutorsSelected]);

  const getNextTopics = () => {
    if (topics && topicTotalRecords > topics?.length) {
      getTopics(LOAD_MORE_TOPICS_BULK_VIEW_SUCCESS, topicPage + 1);
    }
  };

  const loadMoreContentTutors = () => {
    tutors &&
      tutorsTotalRecords > tutors.length &&
      getTutors(LOAD_MORE_TUTORS_BULK_VIEW_SUCCESS, tutorsPage + 1, tutorsSize);
  };

  useEffect(() => {
    userData && !allLikedVideoesContent && getTotalNumberOfLikedVideos();
    getTotalRecordsOfWatchLater();

    //unmount remove data.
    return () => {
      dispatch({
        type: RESET_BULK_VIEW_REDUCER,
      });
    };
  }, []);
  const getWatchLaterVideosId = (
    page: number,
    size: number,
    SUCCESS_TYPE: string
  ) => {
    getWatchLaterVideoIdsApi(
      `/users/${userData?._id}/finish-later-contents?page=${page}&size=${size}`,
      BULK_VIEW_WATCH_LATER_IDS_REQUEST,
      SUCCESS_TYPE,
      BULK_VIEW_WATCH_LATER_IDS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_CONTENT_SERVICE
    );
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
      getTotalNumberOfLikedVideos();
    }
  }, [lastMessage]);

  const getTotalNumberOfLikedVideos = () => {
    getTotalRecordsOfLikedVideos(
      `/users/${userData?._id}/user-reactions?reaction=LIKE&page=1&size=${
        dynamicSizeLike + 1
      }`,
      PRODUCT_CONTENT_SERVICE
    );
    setDynamicSizeLike(dynamicSizeLike + 1);
  };

  useEffect(() => {
    if (likedVideosTotalRecords > 0) {
      getAllLikedVideoDetails(likedVideosTotalRecords);
    } else {
      dispatch({
        type: SET_EMPTY_LIKE_CONTENT,
      });
      dispatch({
        type: SET_EMPTY_ALL_LIKED_CONTENT,
      });
    }
  }, [likedVideosTotalRecords]);

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

  const handleLikeButtonClick = (video: any, status: boolean) => {
    const likeData = {
      userId: userData?._id,
      contentId: video?.contentId,
      reaction: status ? 'LIKE' : 'UNLIKE',
    };
    updateLikeVideosApi(
      `/user-reactions`,
      SUBMIT_BULK_VIEW_LIKE_REQUEST,
      SUBMIT_BULK_VIEW_LIKE_SUCCESS,
      SUBMIT_BULK_VIEW_LIKE_FAIL,
      likeData,
      {},
      'PUT',
      false,
      PRODUCT_CONTENT_SERVICE
    );
  };
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
  const getTotalRecordsOfWatchLater = () => {
    getWatchLaterIdsTotalRecords(
      `/users/${userData?._id}/finish-later-contents?page=1&size=${
        dynamicSize + 1
      }`,
      USER_CONTENT_SERVICE
    );
    setDynamicSize(dynamicSize + 1);
  };

  const removeWatchLaterVideo = (videoInfo: any) => {
    const notificationId = allWatchLaterContentIds?.find(
      contentIds => contentIds.contentId === videoInfo?.contentId
    );
    removeWatchLaterVideoApi(
      `/user-notification-settings/${notificationId?._id}`,
      REMOVE_WATCH_LATER_VIDEO_BULK_VIEW_REQUEST,
      REMOVE_WATCH_LATER_VIDEO_BULK_VIEW_SUCCESS,
      REMOVE_WATCH_LATER_VIDEO_BULK_VIEW_FAILED,
      {},
      {},
      'DELETE',
      false,
      USER_NOTIFICATION_SERVICE,
      { videoInfo, watchLaterIds: notificationId }
    );
  };
  const clickedWatchLater = (videoInfo: any) => {
    setIsOpen(true);
    setSelectedContent(videoInfo);
  };

  const createRemainderDate = (isSkip: boolean) => {
    const reminderData = {
      userId: userData?._id,
      contentId: selectedContent.contentId,
      userNotificationType: 'REMINDER',
    };
    submitRemainderApi(
      `/user-notification-settings`,
      SUBMIT_WATCH_LATER_BULK_VIEW_REQUEST,
      SUBMIT_WATCH_LATER_BULK_VIEW_SUCCESS,
      SUBMIT_WATCH_LATER_BULK_VIEW_FAILED,
      isSkip
        ? reminderData
        : { ...reminderData, reminderDate: reminderDate.toISOString() },
      {},
      'POST',
      false,
      USER_NOTIFICATION_SERVICE,
      { videoInfo: selectedContent }
    );
  };
  useEffect(() => {
    if (!isLoadingReminderSubmit) {
      setIsOpen(false);
    }
  }, [isLoadingReminderSubmit]);
  return (
    <>
      <div className="bulkView">
        <div className="container">
          <BulkView
            reelIds={reelIds}
            subject={
              (subjectList?.length ? subjectList[0] : {}) as singleSubjectType
            }
            tutors={tutors || []}
            loadMoreContentTutors={loadMoreContentTutors}
            topics={topics || []}
            onTabSelect={setSelectedTab}
            isInitialLoading={isInitialLoading}
            isAllTutorsSelected={isAllTutorsSelected}
            toggleSelectAll={() =>
              dispatch({
                type: SET_TOGGLE_SELECT_ALL_BULK_TUTOR,
              })
            }
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
          <VisibilitySensor
            partialVisibility
            onChange={isVisible => isVisible && getNextTopics()}
          >
            <div>&nbsp;</div>
          </VisibilitySensor>
        </div>
        {isOpen && (
          <Modal
            onClickAway={() => setIsOpen(false)}
            customClassName={'watchlater'}
          >
            <DateAndClock
              getValue={(date: Date) => setRemainderDate(date)}
              onSkip={() => createRemainderDate(true)}
              onSubmit={() => createRemainderDate(false)}
              onClose={() => setIsOpen(false)}
              isLoading={isLoadingReminderSubmit}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default BulkViewContainer;
