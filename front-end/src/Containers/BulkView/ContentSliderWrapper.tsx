import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ContentSlider from '../../Components/ContentSlider/ContentSlider';
import NoContent from '../../Components/CreateProduct/NoContent/NoContent';
import { contentType, PRODUCT_CONTENT_SERVICE } from '../../config/constants';
import useApi from '../../Hooks/useApi';
import { TopicType } from '../../redux/bulkView/bulkViewReducer';
import {
  GET_CONTENT_BY_TOPICS_FAILED,
  GET_CONTENT_BY_TOPICS_REQUEST,
  GET_CONTENT_BY_TOPICS_SUCCESS,
  LOAD_MORE_CONTENT_BULK_VIEW_SUCCESS,
} from '../../redux/bulkView/bulkViewType';
import { RootStore } from '../../redux/store';

interface ContentSliderContainerProps {
  topic: TopicType;
  subjectId: string;
  handleLikeButtonClick: Function;
  clickedWatchLater: Function;
  removeWatchLaterVideo: Function;
  selectedContentType: string;
  searchText: string;
  reelIds: any;
}

const ContentSliderWrapper: FC<ContentSliderContainerProps> = ({
  topic,
  subjectId,
  handleLikeButtonClick,
  clickedWatchLater,
  removeWatchLaterVideo,
  selectedContentType,
  searchText,
  reelIds,
}) => {
  const history = useHistory();
  const [getContentByTopicApi] = useApi();
  const [getPastPaperContentByTopic] = useApi();
  const { allProductIds, tutors, isAllTutorsSelected, selectedTutorId } =
    useSelector((state: RootStore) => state.bulkView);
  const { contentPage = 1, contentSize = 10, contentTotalRecords = 0 } = topic;

  const getContentByTopic = (
    SUCCESS_TYPE: string,
    page: number,
    size: number
  ) => {
    getContentByTopicApi(
      `/topics/${
        topic._id
      }/reelContents?productIds=${allProductIds}&contentTypes=${selectedContentType}&page=${page}&size=${size}${
        searchText !== '' ? `&searchByTitleLike=${searchText}` : ''
      }${!isAllTutorsSelected ? `&tutorId=${selectedTutorId}` : ''}`,
      GET_CONTENT_BY_TOPICS_REQUEST,
      SUCCESS_TYPE,
      GET_CONTENT_BY_TOPICS_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_CONTENT_SERVICE,
      { id: topic._id }
    );
  };
  const getPastPaperContentBySubject = (
    subjectId: string,
    page: number,
    size: number
  ) => {
    getPastPaperContentByTopic(
      `/subjects/${subjectId}/reelContents?contentType=${[
        contentType.pastPaperDocument,
        contentType.linkedDocumentPastPaper,
      ]}&productIds=${allProductIds}&page=${page}&size=${size}`,
      '',
      '',
      '',
      {},
      {},
      'GET',
      false,
      PRODUCT_CONTENT_SERVICE
    );
  };

  useEffect(() => {
    if (isAllTutorsSelected) {
      allProductIds?.length &&
        topic &&
        getContentByTopic(
          GET_CONTENT_BY_TOPICS_SUCCESS,
          contentPage,
          contentSize
        );
    } else {
      selectedTutorId &&
        allProductIds?.length &&
        topic &&
        getContentByTopic(
          GET_CONTENT_BY_TOPICS_SUCCESS,
          contentPage,
          contentSize
        );
    }
  }, [topic, allProductIds, searchText, selectedTutorId, isAllTutorsSelected]);

  return (
    <>
      {topic.contents?.length ? (
        <ContentSlider
          itemKey={topic._id}
          title={topic.topic}
          videos={topic.contents || []}
          videosTotalRecords={topic.contents?.length || 0}
          onClickWatchLater={(videoInfo: any, isNewRemainder: boolean) => {
            isNewRemainder && clickedWatchLater(videoInfo);
            !isNewRemainder && removeWatchLaterVideo(videoInfo);
          }}
          onClickLikedVideos={(videoInfo: any, status: boolean) =>
            handleLikeButtonClick(videoInfo, status)
          }
          getNewVideos={() => {
            getContentByTopic(
              LOAD_MORE_CONTENT_BULK_VIEW_SUCCESS,
              contentPage + 1,
              contentSize
            );
          }}
          onMiniPlayerClick={(contentId: string) => {
            {
              selectedContentType === contentType.video &&
                history.push(`/theater/${contentId}`, {
                  reelIds,
                });
            }
          }}
        />
      ) : null}
    </>
  );
};
export default ContentSliderWrapper;
