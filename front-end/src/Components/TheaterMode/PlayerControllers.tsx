import React, { FC, useEffect, useState } from 'react';
import forward from '../../assets/images/player/forward-icon.svg';
import fullscreen from '../../assets/images/player/fullscreen-icon.svg';
import dislike from '../../assets/images/player/icon-dislike.svg';
import like from '../../assets/images/player/icon-like.svg';
import next from '../../assets/images/player/next-icon.svg';
import plus from '../../assets/images/player/player-plus.svg';
import rewind from '../../assets/images/player/rewind-icon.svg';
import subtitleOff from '../../assets/images/player/subtitle-gray.svg';
import subtitle from '../../assets/images/player/subtitle-icon.svg';
import volume from '../../assets/images/player/volume-icon.svg';
import volume_mute from '../../assets/images/player/volume-mute.svg';
import pause from '../../assets/images/svg-images/pause-icon.svg';
import play from '../../assets/images/svg-images/play-solid.svg';
import { secondToTime } from '../../Helper';

interface PlayerControllersProps {
  isNextButtonDisabled?: boolean;
  isPlay: boolean;
  isPreviousButtonDisabled?: boolean;
  onFinishLaterClick: () => void;
  onNextClick: () => void;
  onPreviousClick: () => void;
  playerVolume: number;
  playingTimeInPlayer: number;
  seekTo: (seekTo: 'forward' | 'rewind') => void;
  setFullScreenView: () => void;
  setIsPlay: Function;
  setPlayerVolume: (volume: number) => void;
  showSubtitles: boolean;
  sliderSeekTo: (seekTo: number) => void;
  toggleSubtitle: () => void;
  videoDuration: number;
  videoWatchedPercentage: number;
}

const PlayerControllers: FC<PlayerControllersProps> = ({
  isNextButtonDisabled,
  isPlay,
  isPreviousButtonDisabled,
  onFinishLaterClick,
  onNextClick,
  onPreviousClick,
  playingTimeInPlayer,
  seekTo,
  setFullScreenView,
  setIsPlay,
  setPlayerVolume,
  showSubtitles,
  sliderSeekTo,
  toggleSubtitle,
  videoDuration,
  videoWatchedPercentage,
}) => {
  const [percentage, setPercentage] = useState(videoWatchedPercentage);
  const [soundVolume, setSoundVolume] = useState(0.5);
  const [isAudioMute, setIsAudioMute] = useState(false);
  useEffect(() => {
    setPercentage(videoWatchedPercentage);
  }, [videoWatchedPercentage]);

  const updateWatchPercentage = (seekTo: number) => {
    setPercentage(seekTo);
    sliderSeekTo(seekTo);
  };

  const updateSoundVolume = (volume: number) => {
    setIsAudioMute(volume === Number(0));
    setPlayerVolume(volume);
    setSoundVolume(volume);
  };

  useEffect(() => {
    setPlayerVolume(isAudioMute ? 0 : soundVolume);
  }, [isAudioMute]);

  return (
    <div className="theaterMode__player--controls">
      <div className="theaterMode__player--controls-wrapper">
        <div className="theaterMode__player--controls-top">
          <input
            step={videoDuration / 100}
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={e => updateWatchPercentage(Number(e.target.value))}
          ></input>
          <div className="theaterMode__player--timer">
            <p>{secondToTime(playingTimeInPlayer || 0)}</p>
          </div>
        </div>
        <div className="theaterMode__player--controls-bottom">
          <div className="theaterMode__player--controls-button--left">
            <div className="theaterMode__player--controls-button">
              <div onClick={() => setIsPlay(!isPlay)}>
                {isPlay ? (
                  <img
                    src={pause}
                    alt="pause-icon"
                    className="dark-icon icon--pause"
                  />
                ) : (
                  <img
                    src={play}
                    alt="play-icon"
                    className="dark-icon icon--play"
                  />
                )}
              </div>
            </div>
            <div className="theaterMode__player--controls-button">
              <div onClick={() => seekTo('rewind')}>
                <img src={rewind} alt="rewind-icon" />
              </div>
            </div>
            <div className="theaterMode__player--controls-button">
              <div onClick={() => seekTo('forward')}>
                <img src={forward} alt="forward-icon" />
              </div>
            </div>
            <div className="theaterMode__player--controls-button volume-icon">
              <div onClick={() => setIsAudioMute(!isAudioMute)}>
                {isAudioMute ? (
                  <img src={volume_mute} alt="volume-mute" />
                ) : (
                  <img src={volume} alt="volume-icon" />
                )}
              </div>
            </div>
            <div className="theaterMode__player--controls-button volume">
              <div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.001"
                  value={soundVolume}
                  onChange={e => updateSoundVolume(Number(e.target.value))}
                ></input>
              </div>
            </div>
          </div>
          <div className="theaterMode__player--controls-button--right">
            <div className="theaterMode__player--controls-button">
              <div>
                <img src={like} alt="like-icon" />
              </div>
            </div>
            <div className="theaterMode__player--controls-button">
              <div>
                <img src={dislike} alt="dislike-icon" />
              </div>
            </div>
            <div
              className="theaterMode__player--controls-button previous"
              onClick={() => {
                !isPreviousButtonDisabled && onPreviousClick();
              }}
            >
              <div>
                <img src={next} alt="next-icon" />
              </div>
            </div>
            <div
              className="theaterMode__player--controls-button plus"
              onClick={onFinishLaterClick}
            >
              <div>
                <img src={plus} alt="finish-later" />
              </div>
            </div>
            <div
              className="theaterMode__player--controls-button"
              onClick={() => {
                !isNextButtonDisabled && onNextClick();
              }}
            >
              <div>
                <img src={next} alt="volume-icon" />
              </div>
            </div>
            <div
              className="theaterMode__player--controls-button"
              onClick={toggleSubtitle}
            >
              <div>
                {showSubtitles ? (
                  <img src={subtitle} alt="subtitle-enabled" /> //subtitles enabled icon
                ) : (
                  <img src={subtitleOff} alt="subtitle-disabled" /> //subtitles disabled icon
                )}
              </div>
            </div>
            <div className="theaterMode__player--controls-button quality">
              <div>
                <p>720p</p>
                <ul>
                  <li>1080p</li>
                  <li>720p</li>
                  <li>240p</li>
                </ul>
              </div>
            </div>
            <div className="theaterMode__player--controls-button">
              <div>
                <img
                  src={fullscreen}
                  alt="volume-icon"
                  onClick={setFullScreenView}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerControllers;
