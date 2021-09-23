import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import UseViewFile from '../../Hooks/UseViewFile';
import { VideoContent } from '../../redux/student/reelVideoReducer';

type FeatureSingleSliderProps = {
  featureContent: VideoContent;
  key: number;
  onWatchNowClick?: (contentId: string) => void;
};

const FeatureSingleSlider: FC<FeatureSingleSliderProps> = ({
  featureContent,
  key,
  onWatchNowClick,
}) => {
  const { t } = useTranslation();
  const [previewImageGetFromBucket, previewImageUrl] = UseViewFile();
  const history = useHistory();

  useEffect(() => {
    const { previewImageKey } = featureContent;
    if (previewImageKey) {
      const { bucketName: imageBucketName, fileKey: imageFileKey } =
        previewImageKey;
      previewImageGetFromBucket(imageBucketName, imageFileKey);
    }
  }, [featureContent]);

  return (
    <div className="featuredSlider__slide" key={key}>
      <div className="featuredSlider__slide--wrapper">
        <div
          className="featuredSlider__slide--left"
          style={{
            backgroundImage: `url(${previewImageUrl}`,
          }}
        ></div>
        <div className="featuredSlider__slide--right">
          <h3>{featureContent?.title}</h3>
          <p>{featureContent?.description}</p>
          <button
            className="btn btn--primary"
            onClick={() => onWatchNowClick?.(featureContent?.contentId)}
          >
            {t('Watch now')}
          </button>
        </div>
      </div>
    </div>
  );
};
export default FeatureSingleSlider;
