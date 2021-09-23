import React, { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { EDIT_FEATURE_REEL } from '../../../../redux/product/productTypes';

import { RootStore } from '../../../../redux/store';
import { FiEdit } from 'react-icons/fi';
import { GoTriangleUp } from 'react-icons/go';
import NoContent from '../../../../Components/CreateProduct/NoContent/NoContent';
import ProductReel from '../../ProductReelSlide/ProductReel/ProductReel';
import ReactPaginate from 'react-paginate';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import ProductFeatureOrderReel from '../ProductReel/ProductFeatureOrderReel';
import { useTranslation } from 'react-i18next';

import { arrayPaginate } from '../../../../Helper';

interface FeatureReelViewContainerProps {
  setIsSelectedShow?: Function;
  isOderReel?: boolean;
}

const FeatureReelViewContainer: FC<FeatureReelViewContainerProps> = ({
  setIsSelectedShow,
  isOderReel,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { featureReelContents, featureReelAllSelectedContentIds } = useSelector(
    (state: RootStore) => state.products
  );
  const { contents } = featureReelContents || {};

  const [paginatedContents, setPaginatedContents] = useState<any[]>();
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const filteredContent = arrayPaginate(
      contents || [],
      pageSize,
      currentPage
    );

    filteredContent?.length && setPaginatedContents(filteredContent);
  }, [contents, currentPage]);

  const payload = {
    dataWrapper: {
      data: null,
    },
  };

  const reelStatus = (type: string) => {
    dispatch({
      type,
      payload,
    });
  };

  const pageCount = (totalRecords: number, size: number) => {
    return Math.ceil(totalRecords / size);
  };

  const selectedPageSize = () => {
    return pageCount(
      featureReelAllSelectedContentIds?.length || 0,
      pageSize || 0
    );
  };

  return (
    <div
      className={`addContentScreen editProduct reelContent featureReelViewContainer`}
    >
      <div className="addContentScreen--wrapper">
        {!isOderReel && (
          <div className="addContentScreen--titleArea">
            <p>{t('Feature Reel')}</p>

            <div className="buttonWrapper">
              <div>
                <FiEdit onClick={() => reelStatus(EDIT_FEATURE_REEL)} />
              </div>

              <div>
                <GoTriangleUp />
              </div>
            </div>
          </div>
        )}

        {paginatedContents?.length ? (
          <div className="addContentScreen--contentArea">
            <div className="addContentScreen--content-wrapper">
              <div className="addContentScreen--content-wrapper__body">
                {isOderReel && (
                  <div className="addContentScreen--content-wrapper__body-buttonTab">
                    <div
                      className="btn btn--primary btn--centerText btn--roundEdges showSelected"
                      onClick={() =>
                        setIsSelectedShow && setIsSelectedShow(false)
                      }
                    >
                      {t('Show Selected')}
                    </div>
                  </div>
                )}
                <div className="addContentScreen--content-wrapper__body-content">
                  {paginatedContents?.map((video, index) => {
                    return !isOderReel ? (
                      <ProductReel
                        isReelSaved={true}
                        content={video}
                        key={video?._id || index}
                        isSelected={true}
                      />
                    ) : (
                      <ProductFeatureOrderReel
                        isReelSaved={true}
                        content={video}
                        key={video?._id || index}
                        isSelected={true}
                        featureReelAllSelectedContentIds={
                          featureReelAllSelectedContentIds || []
                        }
                      />
                    );
                  })}
                </div>
              </div>
              <div className="addContentScreen--content-wrapper__footer">
                <div className="addContentScreen--content-wrapper__pagination">
                  <ReactPaginate
                    previousLabel={
                      <div className="addContentScreen--content-wrapper__pagination-count previous">
                        <GrFormPrevious />
                      </div>
                    }
                    nextLabel={
                      <div className="addContentScreen--content-wrapper__pagination-count next">
                        <GrFormNext />
                      </div>
                    }
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={selectedPageSize()}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={({ selected }) =>
                      setCurrentPage(selected + 1)
                    }
                    containerClassName={'react-paginate'}
                    activeClassName={'active'}
                  />
                </div>
                {isOderReel && (
                  <div className="addContentScreen--content-wrapper__submit">
                    <button
                      type={'button'}
                      className="btn btn--primary"
                      onClick={() =>
                        setIsSelectedShow && setIsSelectedShow(false)
                      }
                    >
                      {t('Save')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <NoContent />
        )}
      </div>
    </div>
  );
};

export default FeatureReelViewContainer;
