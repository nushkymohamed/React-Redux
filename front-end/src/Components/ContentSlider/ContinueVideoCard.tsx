import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import play from '../../assets/images/svg-images/icon-play.svg';
import Modal from '../Modal/Modal';

interface ContinueVideoCardProps {
  cardInformation: { title?: string; description?: string; _id?: string };
  videoThumbnailUrl: string;
  lastWatchedVideoEnable: boolean;
  welcomeVideoUrl: string;
  reelIds: string[];
}

const ContinueVideoCard: FC<ContinueVideoCardProps> = ({
  cardInformation,
  videoThumbnailUrl,
  lastWatchedVideoEnable,
  welcomeVideoUrl,
  reelIds,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [isWelcomeVideoPopUpOpen, setIsWelcomeVideoPopUpOpen] = useState(false);

  return (
    <>
      <div className="homepage--videoblock">
        <h2>{t('Continue watching')}</h2>
        <div className="homepage--videoblock-video">
          <img src={videoThumbnailUrl} />
          <img
            src={play}
            alt="icon-play"
            className="homepage--videoblock-video__play"
            onClick={() => {
              !lastWatchedVideoEnable
                ? setIsWelcomeVideoPopUpOpen(isOpen => !isOpen)
                : history.push(`theater/${cardInformation?._id}`, {
                    internalRoute: true,
                    reelIds,
                  });
            }}
          />
        </div>
        <h3>{cardInformation?.title || ''}</h3>
        <p>{cardInformation?.description || ''}</p>
      </div>

      {isWelcomeVideoPopUpOpen && !lastWatchedVideoEnable && (
        <Modal onClickAway={() => setIsWelcomeVideoPopUpOpen(false)}>
          <div className="popup--content centerContent">
            <video autoPlay controls style={{ width: '100%', height: '100%' }}>
              <source src={welcomeVideoUrl} />
            </video>
          </div>
        </Modal>
      )}
    </>
  );
};
export default ContinueVideoCard;
