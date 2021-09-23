import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Player from '../../../Components/TheaterMode/Player';
import { USER_CONTENT_SERVICE } from '../../../config/constants';
import useApi from '../../../Hooks/useApi';
import UseViewFile from '../../../Hooks/UseViewFile';
import { lastWatchedContentInfoType } from '../../../redux/common/commonReducer';
import { RootStore } from '../../../redux/store';
import { VideoContent } from '../../../redux/student/reelVideoReducer';
import { PlayerStatsType } from '../../../redux/Theater/TheaterReducer';
import {
  SET_THEATRE_SELECTED_CONTENT,
  THEATER_FULLSCREEN,
  UPDATE_PLAYER_LAST_WATCHED_FAILED,
  UPDATE_PLAYER_LAST_WATCHED_REQUEST,
  UPDATE_PLAYER_LAST_WATCHED_SUCCESS,
  UPDATE_THEATRE_PLAYER_STATS,
} from '../../../redux/Theater/TheaterTypes';

type PlayerContainerProps = {
  nextVideoContent?: VideoContent | null;
  onFinishLaterClick?: () => void;
  previousVideoContent?: VideoContent | null;
  reelIds?: string[];
  onProgressTime: Function;
  playStatus: boolean;
  setPlayStatus: Function;
  startTime: { startTime: number; timeStamp: string };
};

const PlayerContainer: FC<PlayerContainerProps> = ({
  nextVideoContent,
  onFinishLaterClick,
  previousVideoContent,
  reelIds,
  onProgressTime,
  playStatus,
  setPlayStatus,
  startTime,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { content } = useSelector((state: RootStore) => state.theater);
  const { lastWatchedContentInfo } = useSelector(
    (state: RootStore) => state?.common
  );
  const { userData } = useSelector((state: RootStore) => state.auth);

  const [getVideoUrl, videoUrl] = UseViewFile();
  const [getSubtitleUrl, subtitleUrl] = UseViewFile();

  const [updatePlayerLastWatchAction] = useApi();

  const [playerStartTime, setPlayerStartTime] = useState<{
    startTime: number;
    timeStamp?: string;
  }>({ startTime: 0, timeStamp: new Date().toISOString() });

  useEffect(() => {
    setPlayerStartTime(startTime);
  }, [startTime]);

  useEffect(() => {
    const { videoUploadKey, subtitle } = content || {};
    if (videoUploadKey?.bucketName && videoUploadKey?.fileKey) {
      getVideoUrl(videoUploadKey?.bucketName, videoUploadKey?.fileKey);
    }

    subtitle?.fileKey && getSubtitleUrl(subtitle.bucketName, subtitle.fileKey);

    if (lastWatchedContentInfo) {
      content?._id === lastWatchedContentInfo.contentId &&
        setPlayerStartTime({
          startTime: lastWatchedContentInfo.userWatchedLength,
        });
    }
  }, [content, lastWatchedContentInfo]);

  const updateTheaterFullScreeStatus = (isFullScreen: boolean) => {
    dispatch({
      type: THEATER_FULLSCREEN,
      payload: {
        dataWrapper: { data: { isFullScreen } },
      },
    });
  };

  const updatePlayerStats = useCallback((data: PlayerStatsType) => {
    dispatch({
      type: UPDATE_THEATRE_PLAYER_STATS,
      payload: data,
    });
  }, []);

  const setSelectedContent = (selectedContent: VideoContent) => {
    dispatch({
      type: SET_THEATRE_SELECTED_CONTENT,
      payload: { customInput: selectedContent },
    });
  };

  const onNextButtonClick = () => {
    if (nextVideoContent && reelIds?.length) {
      setSelectedContent(nextVideoContent);
      history.push(`/theater/${nextVideoContent.contentId}`, { reelIds });
    }
  };
  const onPreviousButtonClick = () => {
    if (previousVideoContent && reelIds?.length) {
      setSelectedContent(previousVideoContent);
      history.push(`/theater/${previousVideoContent.contentId}`, { reelIds });
    }
  };

  const updatePlayerEvents = (event: any) => {
    const { playingTimeInPlayer, videoDuration } = event;

    let postObject: lastWatchedContentInfoType = {
      userId: userData?._id || '',
      contentId: content?._id || '',
      videoLength: videoDuration,
      userWatchedLength: playingTimeInPlayer,
      relatedReelIds: reelIds || [],
      tutorId: content?.tutorIds[0] || '',
    };

    if (lastWatchedContentInfo?._id) {
      const { _id } = lastWatchedContentInfo;
      postObject = { ...postObject, _id };
    }

    updatePlayerLastWatchAction(
      `/users/${userData?._id}/lastWatchedVideo`,
      UPDATE_PLAYER_LAST_WATCHED_REQUEST,
      UPDATE_PLAYER_LAST_WATCHED_SUCCESS,
      UPDATE_PLAYER_LAST_WATCHED_FAILED,
      postObject,
      {},
      'PUT',
      false,
      USER_CONTENT_SERVICE
    );
  };

  return (
    <Player
      subtitleUrl={subtitleUrl}
      updateTheaterFullScreeStatus={updateTheaterFullScreeStatus}
      videoUrl={videoUrl}
      onFinishLaterClick={onFinishLaterClick}
      updatePlayerStats={updatePlayerStats}
      onNextClick={onNextButtonClick}
      onPreviousClick={onPreviousButtonClick}
      onProgressTime={onProgressTime}
      playStatus={playStatus}
      setPlayStatus={setPlayStatus}
      updatePlayerEvents={updatePlayerEvents}
      playerStartTime={playerStartTime}
      isNextButtonDisabled={!nextVideoContent}
      isPreviousButtonDisabled={!previousVideoContent}
    />
  );
};

export default PlayerContainer;
