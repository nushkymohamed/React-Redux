import React, { FC } from 'react';
import mobileShare from '../../assets/images/svg-images/icon-share-mobile.svg';
import desktopShare from '../../assets/images/svg-images/icon-share-desktop.svg';
import download from '../../assets/images/svg-images/icon-download2.svg';
import { useTranslation } from 'react-i18next';
import { VscLoading } from 'react-icons/vsc';

interface ShareDownloadButtonsProps {
  downloadSummery: () => void;
  isDownloading: boolean;
}

const ShareDownloadButtons: FC<ShareDownloadButtonsProps> = ({
  downloadSummery,
  isDownloading = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className="theaterMode__ShareDownloadButtons">
      <div className="theaterMode__ShareDownloadButtons--left">
        <p>{t('Share')}</p>
        <img src={mobileShare} alt=" share" />
        <img src={desktopShare} alt="share" />
      </div>
      <div className="theaterMode__ShareDownloadButtons--right">
        {!isDownloading ? (
          <>
            <p>{t('Summary')}</p>
            <img src={download} alt="download" onClick={downloadSummery} />
          </>
        ) : (
          <span className="loading">
            <VscLoading className="icon color-white verySmall-icon" />
          </span>
        )}
      </div>
    </div>
  );
};

export default ShareDownloadButtons;
