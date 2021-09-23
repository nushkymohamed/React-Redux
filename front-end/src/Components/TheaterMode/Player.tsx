import React, { FC, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import { PlayerStatsType } from '../../redux/Theater/TheaterReducer';
import PlayerControllers from './PlayerControllers';

export interface PlayerProps {
  isNextButtonDisabled?: boolean;
  isPreviousButtonDisabled?: boolean;
  onFinishLaterClick?: () => void;
  onNextClick?: () => void;
  onPreviousClick?: () => void;
  subtitleUrl?: string;
  updatePlayerStats?: (data: PlayerStatsType) => void;
  updateTheaterFullScreeStatus: (isFullScreen: boolean) => void;
  videoUrl: string;
  onProgressTime: Function;
  playStatus: boolean;
  setPlayStatus: Function;
  updatePlayerEvents: (data: any) => void;
  playerStartTime: { startTime: number; timeStamp?: string };
}

const Player: FC<PlayerProps> = ({
  isNextButtonDisabled,
  isPreviousButtonDisabled,
  onFinishLaterClick,
  onNextClick,
  onPreviousClick,
  subtitleUrl,
  updatePlayerStats,
  updateTheaterFullScreeStatus,
  videoUrl,
  onProgressTime,
  playStatus,
  setPlayStatus,
  updatePlayerEvents,
  playerStartTime,
}) => {
  const dimension = useWindowDimensions();

  let playerElement = useRef<any | null>(null);
  const addRefToPlayerElement = (elem: any | null) => {
    playerElement = { current: elem };
  };

  const [playingTimeInPlayer, setPlayingTimeInPlayer] = useState(0);
  const [playerVolume, setPlayerVolume] = useState(1);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoWatchedPercentage, setVideoWatchedPercentage] = useState(0);

  const [showSubtitles, setShowSubtitles] = useState(false);

  useEffect(() => {
    seekTo('customSeekTime', playerStartTime.startTime);
  }, [playerStartTime, videoDuration]);

  useEffect(() => {
    if (videoDuration > 0) {
      const percentage = (playingTimeInPlayer * 100) / videoDuration;
      setVideoWatchedPercentage(Math.round(percentage));
    }
  }, [playingTimeInPlayer, videoDuration]);

  useEffect(() => {
    return () => {
      updatePlayerUserEvents('close');
    };
  }, []);

  const playerOnProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    const streamingTime = Math.ceil(playedSeconds);
    onProgressTime(streamingTime);
    setPlayingTimeInPlayer(streamingTime);
  };

  const sliderSeekTo = (seekNumber: number) => {
    playerElement.current &&
      playerElement.current.seekTo(
        parseFloat(`${(seekNumber * videoDuration) / 100}`)
      );
  };
  useEffect(() => {
    setPlayStatus(playStatus);
  }, [playStatus]);

  /** Update player stats */
  useEffect(() => {
    updatePlayerStats?.({
      playedSeconds: playingTimeInPlayer,
    });
  }, [playingTimeInPlayer]);

  useEffect(() => {
    updatePlayerStats?.({
      progressPercentage: videoWatchedPercentage,
    });
  }, [videoWatchedPercentage]);

  useEffect(() => {
    updatePlayerStats?.({
      videoDuration,
    });
  }, [videoDuration]);

  const seekTo = (
    seekType: 'forward' | 'rewind' | 'customSeekTime',
    seekTime?: number
  ) => {
    switch (seekType) {
      case 'forward':
        playerElement.current &&
          playerElement.current.seekTo(
            parseFloat(`${playingTimeInPlayer + 10}`)
          );
        break;

      case 'rewind':
        playerElement.current &&
          playerElement.current.seekTo(
            parseFloat(`${playingTimeInPlayer - 10}`)
          );
        break;
      case 'customSeekTime':
        playerElement.current &&
          playerElement.current.seekTo(parseFloat(`${seekTime}`));
      default:
        break;
    }
  };

  const [isPlayerFullScreen, setIsPlayerFullScreen] = useState(false);

  useEffect(() => {
    if (screenfull.isEnabled) {
      isPlayerFullScreen ? screenfull.request() : screenfull.exit();

      isPlayerFullScreen &&
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      updateTheaterFullScreeStatus(isPlayerFullScreen);
    }
  }, [isPlayerFullScreen]);

  const setFullScreenView = () => {
    setIsPlayerFullScreen(isFullScreen => !isFullScreen);
  };

  useEffect(() => {
    if (screenfull.isEnabled) {
      !screenfull.isFullscreen && setIsPlayerFullScreen(false);
    }
  }, [dimension]);

  useEffect(() => {
    const trackId = 'theatre-mode-video-subtitle';

    if (showSubtitles) {
      const track = document.createElement('track');
      track.id = trackId;
      track.kind = 'subtitles';
      track.src = subtitleUrl || '';
      track.srclang = 'en';
      track.label = 'English';
      track.default = true;

      playerElement.current?.getInternalPlayer()?.appendChild(track);
    } else {
      document.getElementById(trackId)?.remove();
    }
  }, [showSubtitles]);

  const updatePlayerUserEvents = (userEvent: string) => {
    const event = { userEvent, playingTimeInPlayer, videoDuration };
    updatePlayerEvents(event);
  };

  const onPlayingEnded = (isEnded: boolean) => {
    updatePlayerStats?.({
      playingEnded: isEnded,
    });
  };

  return (
    <>
      <ReactPlayer
        ref={elem => addRefToPlayerElement(elem)}
        url={videoUrl}
        playing={!!videoUrl && playStatus}
        onProgress={progress => playerOnProgress(progress)}
        volume={playerVolume}
        onDuration={duration => setVideoDuration(Math.ceil(duration))}
        id={'reactPlayer'}
        config={{
          file: {
            attributes: {
              crossOrigin: 'true',
            },
            tracks: [],
          },
        }}
        onStart={() => updatePlayerUserEvents('onStart')}
        onPlay={() => {
          updatePlayerUserEvents('onPlay');
          onPlayingEnded(false);
        }}
        onPause={() => updatePlayerUserEvents('onPause')}
        onSeek={() => updatePlayerUserEvents('onSeek')}
        onEnded={() => onPlayingEnded(true)}
      />

      <PlayerControllers
        isNextButtonDisabled={isNextButtonDisabled}
        isPlay={playStatus}
        isPreviousButtonDisabled={isPreviousButtonDisabled}
        onFinishLaterClick={() => {
          updatePlayerUserEvents('onFinishLaterClick');
          onFinishLaterClick?.();
        }}
        onNextClick={() => {
          updatePlayerUserEvents('onNextClick');
          onNextClick?.();
        }}
        onPreviousClick={() => {
          updatePlayerUserEvents('onPreviousClick');
          onPreviousClick?.();
        }}
        playerVolume={playerVolume}
        playingTimeInPlayer={playingTimeInPlayer}
        seekTo={seekTo}
        setFullScreenView={setFullScreenView}
        setIsPlay={setPlayStatus}
        setPlayerVolume={setPlayerVolume}
        showSubtitles={showSubtitles}
        sliderSeekTo={sliderSeekTo}
        toggleSubtitle={() => setShowSubtitles(currentState => !currentState)}
        videoDuration={videoDuration}
        videoWatchedPercentage={videoWatchedPercentage}
      />
    </>
  );
};

export default Player;
