import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FeatureSlider from '../../Components/FeaturedSlider/FeatureSlider';
import {
  contentType,
  PRODUCT_CONTENT_SERVICE,
  ReelContentOrderTypes,
  ReelTypes,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';
import { RootStore } from '../../redux/store';
import {
  GET_FEATURED_REELS_CONTENT_FAILED,
  GET_FEATURED_REELS_CONTENT_REQUEST,
  GET_FEATURED_REELS_CONTENT_SUCCESS,
} from '../../redux/student/reelTypes';

type FeatureSlideContainerProps = {
  onWatchNowClick?: (contentId: string) => void;
};

const FeatureSlideContainer: FC<FeatureSlideContainerProps> = ({
  onWatchNowClick,
}) => {
  const { featuredReelIds } = useSelector((state: RootStore) => state.reels);
  const {
    featuredReelContent,
    featuredReelContentTotalRecords,
    featuredReelContentPage,
  } = useSelector((state: RootStore) => state.reelVideos);
  const { userData } = useSelector((state: RootStore) => state.auth);

  const [getFeaturedReelsContentApi] = useApi();

  const getFeaturedReelsContent = (page: number) => {
    getFeaturedReelsContentApi(
      `/users/${userData?._id}/combinedReels/reelContent?reelIds=${featuredReelIds}&contentTypes=${contentType.video}&reelType=${ReelTypes.FEATURED}&reelContentOrder=${ReelContentOrderTypes.RANDOM_ORDER}&page=${page}&size=3`,
      GET_FEATURED_REELS_CONTENT_REQUEST,
      GET_FEATURED_REELS_CONTENT_SUCCESS,
      GET_FEATURED_REELS_CONTENT_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_CONTENT_SERVICE
    );
  };
  useEffect(() => {
    featuredReelIds?.length && userData?._id && getFeaturedReelsContent(1);
  }, [featuredReelIds]);

  return (
    <>
      {featuredReelIds?.length && featuredReelContent?.length ? (
        <div className="featuredSlider__slider">
          <FeatureSlider
            content={featuredReelContent}
            totalRecords={featuredReelContentTotalRecords}
            getNewFeatureContent={() =>
              getFeaturedReelsContent(featuredReelContentPage + 1)
            }
            onWatchNowClick={onWatchNowClick}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default FeatureSlideContainer;
