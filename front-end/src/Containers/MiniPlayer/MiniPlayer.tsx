import React, { FC, useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import watchlaterUnchecked from '../../assets/images/svg-images/clock-unselected.svg';
import clock from '../../assets/images/svg-images/icon-clock-white.svg';
import buttonLike from '../../assets/images/svg-images/icon-like.svg';
import buttonLiked from '../../assets/images/svg-images/icon-liked.svg';
import mute from '../../assets/images/svg-images/icon-mute.svg';
import unmute from '../../assets/images/svg-images/icon-unmute.svg';
import watchlater from '../../assets/images/svg-images/icon-watchlater.svg';
import { contentType } from '../../config/constants';
import { getArrayIndexUsingKey } from '../../Helper';
import UseViewFile from '../../Hooks/UseViewFile';
import { RootStore } from '../../redux/store';

type MiniPlayerProps = {
  groupId: string;
  handlePlayerHover?: Function;
  isVideoInfoOpen: boolean;
  onClickLikedVideoes?: Function;
  onClickWatchLater?: (ableToSetNewRemainder: boolean) => void;
  onMiniPlayerClick?: () => void;
  videoInfo: any;
};

const MiniPlayer: FC<MiniPlayerProps> = ({
  groupId,
  handlePlayerHover = null,
  isVideoInfoOpen,
  onClickLikedVideoes,
  onClickWatchLater,
  onMiniPlayerClick,
  videoInfo,
}) => {
  const { allWatchLaterContentIds, allLikedVideoesContent } = useSelector(
    (state: RootStore) => state.common
  );
  const [miniPlayer, setMiniPlayer] = useState({
    isMouseHover: false,
    player: {},
    audio: false,
    isLikeButtonClick: false,
    dislikeBtn: 'active',
    likeBtn: 'active',
    myList: 'inactive',
  });
  const [isPlay, setIsPlay] = useState(false);
  const [isVideoLoad, setIsVideoLoad] = useState(false);
  const [isMiniPlayerActive, setIsMiniPlayerActive] = useState('active');
  const [isVideoType, setIsVideoType] = useState(false);

  const [imageGetFromBucket, imageUrl] = UseViewFile();
  const [videoGetFromBucket, videoUrl] = UseViewFile();

  const {
    _id,
    title,
    dueDate,
    isWatched,
    playerInfo,
    type,
    contentId,
    lessons,
  } = videoInfo;

  const lessonNames = useMemo(() => {
    if (Array.isArray(lessons)) {
      return lessons.map(l => l?.name).join(' / ');
    } else {
      return '';
    }
  }, [lessons]);

  useEffect(() => {
    const { previewImageKey, previewVideoKey } = videoInfo;

    if (previewImageKey) {
      const { bucketName: imageBucketName, fileKey: imageFileKey } =
        previewImageKey;

      imageGetFromBucket(imageBucketName, imageFileKey);
    }

    if (previewVideoKey) {
      const { bucketName, fileKey } = previewVideoKey;
      videoGetFromBucket(bucketName, fileKey);
    }
  }, [videoInfo]);
  useEffect(() => {
    setIsVideoType(type === contentType.video);
  }, [type]);

  const backgroundImage = (imageUrl: string) => {
    const backgroundBg = {
      backgroundImage: 'url(' + imageUrl + ')',
      backgroundColor: '#191919',
    };
    return backgroundBg;
  };
  /**
   * On mouse hover on mini player decresc sounds to zero and play video
   */

  const handleHoverOn = () => {
    setIsPlay(true);

    setMiniPlayer({
      ...miniPlayer,
      isMouseHover: true,
      audio: false,
    });
    if (handlePlayerHover) {
      handlePlayerHover(true);
    }
  };

  /**
   * On mouse out on mini player  play pause
   */
  const handleHoverOff = () => {
    setIsPlay(false);
    setMiniPlayer({
      ...miniPlayer,
      isMouseHover: false,
    });

    if (handlePlayerHover) {
      handlePlayerHover(false);
    }
  };

  /**
   * @param {boolean} boolean
   *  true -mute clip / false - unmute clip
   */
  const muteVideoSound = (boolean: boolean) => {
    if (boolean) {
      setMiniPlayer({
        ...miniPlayer,
        audio: false,
      });
    } else {
      setMiniPlayer({
        ...miniPlayer,
        audio: true,
      });
    }
  };
  const getWatchLaterStatus = (id: string) => {
    const isAvailable =
      allWatchLaterContentIds?.find(
        contentIds => contentIds.contentId === id
      ) || {};
    return Object.keys(isAvailable)?.length > 0;
  };
  const getLikedvideosStatus = (id: string) => {
    const index = getArrayIndexUsingKey(
      allLikedVideoesContent || [],
      'contentId',
      id
    );
    return index >= 0;
  };

  const { audio } = miniPlayer;
  let audioOn = 'active';
  let audioOff = '';
  if (audio) {
    audioOn = 'active';
    audioOff = '';
  } else {
    audioOn = '';
    audioOff = 'active';
  }

  useEffect(() => {
    if (
      isVideoInfoOpen &&
      playerInfo &&
      playerInfo.length &&
      playerInfo[0].id === videoInfo.id &&
      playerInfo[0].preview
    ) {
      setIsMiniPlayerActive('inactive');
    } else {
      setIsMiniPlayerActive('active');
    }
  }, [isVideoInfoOpen, playerInfo]);

  return (
    <>
      <div
        className={`miniPlayer ${isMiniPlayerActive}`}
        onMouseEnter={handleHoverOn}
        onMouseLeave={handleHoverOff}
        onClick={onMiniPlayerClick}
      >
        {isPlay && isVideoType && (
          <ReactPlayer
            className="miniPlayer__player-wrapper"
            width="100%"
            height="auto"
            muted={!audio}
            url={videoUrl}
            playing={isVideoLoad && isPlay}
            onReady={() => setIsVideoLoad(true)}
          />
        )}

        <div
          className="miniPlayer__content miniPlayer__mini-player-items"
          style={backgroundImage(imageUrl)}
        >
          <div className="miniPlayer__info-action">
            <div className="miniPlayer__click"></div>
            <div className="miniPlayer__info">
              <div className="miniPlayer__info--play-icon">
                <svg className="icon icon--orange">
                  <use
                    xlinkHref={
                      require('../../assets/images/sprite/sprite.svg') +
                      '#icon-play-solid'
                    }
                  ></use>
                </svg>
              </div>
            </div>
            <div className="miniPlayer__action">
              <div
                className={`miniPlayer__action-icon`}
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <img
                  src={
                    getLikedvideosStatus(contentId) ? buttonLiked : buttonLike
                  }
                  onClick={e => {
                    e.stopPropagation();
                    onClickLikedVideoes &&
                      onClickLikedVideoes(!getLikedvideosStatus(contentId));
                  }}
                />
              </div>
              {isVideoType && (
                <div>
                  <div
                    className={`miniPlayer__action-icon miniPlayer__action--audio-on ${audioOn}`}
                    onClick={e => {
                      e.stopPropagation();
                      muteVideoSound(true);
                    }}
                  >
                    <img src={unmute} />
                  </div>

                  <div
                    className={`miniPlayer__action-icon miniPlayer__action--audio-off  ${audioOff}`}
                    onClick={e => {
                      e.stopPropagation();
                      muteVideoSound(false);
                    }}
                  >
                    <img src={mute} />
                  </div>
                </div>
              )}
              <div
                className={`miniPlayer__action-icon`}
                onClick={e => {
                  e.stopPropagation();
                  onClickWatchLater &&
                    onClickWatchLater(!getWatchLaterStatus(contentId));
                }}
              >
                <img
                  src={
                    getWatchLaterStatus(contentId)
                      ? watchlater
                      : watchlaterUnchecked
                  }
                />
              </div>
            </div>

            <div className="admin-reel_video--icons"></div>
          </div>
          <div
            className={`miniPlayer__info--title ${
              !groupId && isWatched ? 'watched' : ''
            }`}
          >
            <span className="miniPlayer__info--title-name">{title}</span>
            <span className="miniPlayer__info--title-lessonName">
              {lessonNames}
            </span>
          </div>
          {dueDate && (
            <div className="miniPlayer__info--duedate">
              <img src={clock} alt="clock-icon" className="icon--clock" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MiniPlayer;
