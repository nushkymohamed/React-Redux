import React, { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSelectMultiple } from 'react-icons/bi';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import Slider from 'react-slick';
import { contentType } from '../../../config/constants';
import SelectAllFeatureContentByType from '../../../Containers/CreateProduct/FeatureReelSlide/FeatureReel/SelectAllFeatureContentByType';
import TutorContainerFeatureReel from '../../../Containers/CreateProduct/FeatureReelSlide/TutorContainerFeatureReel/TutorContainerFeatureReel';
import ProductReel from '../../../Containers/CreateProduct/ProductReelSlide/ProductReel/ProductReel';
import { checkContentIsSelected } from '../../../Helper';
import {
  reelTutors,
  singleContentType,
} from '../../../redux/product/productReducer';
import NoContent from '../NoContent/NoContent';

interface ReelProps {
  assessmentContents: singleContentType[];
  assessmentTotalRecords: number;
  contentTab: string;
  currentSelectedTutorTabContentData: boolean;
  documentContents: singleContentType[];
  documentTotalRecords: number;
  getAssessmentContent: Function;
  getDocumentContent: Function;
  getVideoContent: Function;
  isAllContentsSelected: boolean;
  isPaginationShow: boolean;
  isReelSaved: boolean;
  loadTutors: Function;
  reelIndex: number;
  reelStatus?: Function;
  saveReelType: string;
  selectAllTutorsAndContent: Function;
  selectedContentIds: any;
  selectedTutorId: string;
  setContentTab: Function;
  setSelectedContent: Function;
  subjectID: string;
  tutors: reelTutors[];
  tutorsPage: number;
  videoContents: singleContentType[];
  videoTotalRecords: number;
  allIgnoredContentsIds: string[];
}

const FeatureReel: FC<ReelProps> = ({
  assessmentContents,
  assessmentTotalRecords,
  contentTab,
  currentSelectedTutorTabContentData,
  documentContents,
  documentTotalRecords,
  getAssessmentContent,
  getDocumentContent,
  getVideoContent,
  isAllContentsSelected,
  isPaginationShow,
  isReelSaved,
  loadTutors,
  reelIndex,
  reelStatus,
  saveReelType,
  selectAllTutorsAndContent,
  selectedContentIds,
  selectedTutorId,
  setContentTab,
  setSelectedContent,
  subjectID,
  tutors,
  tutorsPage,
  videoContents,
  videoTotalRecords,
  allIgnoredContentsIds,
}) => {
  const { t } = useTranslation();
  const sliderRef = useRef<any>();
  const visibleSlideCount = () => {
    const slider = sliderRef?.current;

    if (!slider) return settings.slidesToShow;

    return slider.props.slidesToShow;
  };

  const checkForSliderEnd = (current: number, next: any) => {
    if (tutors && tutorsPage) {
      if (current <= next && visibleSlideCount() + next >= tutors?.length) {
        // call the tutor loading method here&
        loadTutors(tutorsPage + 1);
      }
    }
  };

  const settings = {
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: false,
    dots: false,
    beforeChange: (current: number, next: any) => {
      checkForSliderEnd(current, next);
    },
  };

  const isContentVisible = true;

  const selectedTabPagination = (selectedPage: number) => {
    switch (contentTab) {
      case contentType.video:
        getVideoContent(selectedPage + 1);
        break;

      case contentType.document:
        getDocumentContent(selectedPage + 1);
        break;

      case contentType.assignment:
        getAssessmentContent(selectedPage + 1);
        break;
      default:
        break;
    }
  };
  const pageSize = 12;
  const pageCount = (totalRecords: number) => {
    return Math.ceil(totalRecords / pageSize);
  };

  const selectedTabPageSize = () => {
    switch (contentTab) {
      case contentType.video:
        return pageCount(videoTotalRecords || 0);

      case contentType.document:
        return pageCount(documentTotalRecords || 0);

      case contentType.assignment:
        return pageCount(assessmentTotalRecords || 0);
      default:
        return pageCount(videoTotalRecords || 0);
    }
  };

  return (
    <div
      className={`addContentScreen ${
        isReelSaved ? 'editProduct' : 'createProduct'
      }`}
    >
      <div className="addContentScreen--wrapper">
        {tutors?.length ? (
          <div
            className="addContentScreen--contentArea"
            style={
              isContentVisible ? { display: 'block' } : { display: 'none' }
            }
          >
            <div className="addContentScreen--tutors-wrapper">
              <div className="addContentScreen--tutors-title">Select Tutor</div>
              <div className="addContentScreen--tutors-content">
                {!isReelSaved && (
                  <div
                    className="addContentScreen--tutors-content-all"
                    onClick={() => selectAllTutorsAndContent()}
                  >
                    <div className="circleIcon">
                      <BiSelectMultiple />
                    </div>
                    {isAllContentsSelected ? (
                      <p>{t('Select None')}</p>
                    ) : (
                      <p>{t('Select All')}</p>
                    )}
                  </div>
                )}

                <div className="addContentScreen--tutors-content-scroll">
                  <Slider {...settings} ref={sliderRef}>
                    {tutors?.map(tutor => {
                      return (
                        <TutorContainerFeatureReel
                          key={tutor._id}
                          tutor={tutor}
                          reelIndex={reelIndex}
                          subjectID={subjectID}
                        />
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
            <div className="addContentScreen--content-wrapper">
              <div className="addContentScreen--content-wrapper__header"></div>
              <div className="addContentScreen--content-wrapper__body">
                <div className="addContentScreen--content-wrapper__body-header">
                  <div className="categories">
                    <div
                      className={`categories-item ${
                        contentTab === contentType.video && 'selected'
                      } `}
                      onClick={() => setContentTab(contentType.video)}
                    >
                      Videos{' '}
                      <span>
                        {videoContents?.length}
                        {!isReelSaved && `/${videoTotalRecords}`}
                      </span>
                    </div>
                    <div
                      className={`categories-item ${
                        contentTab === contentType.document && 'selected'
                      } `}
                      onClick={() => setContentTab(contentType.document)}
                    >
                      Documents{' '}
                      <span>
                        {documentContents?.length}
                        {!isReelSaved && `/${documentTotalRecords}`}
                      </span>
                    </div>
                    <div
                      className={`categories-item ${
                        contentTab === contentType.assignment && 'selected'
                      } `}
                      onClick={() => setContentTab(contentType.assignment)}
                    >
                      Assessments{' '}
                      <span>
                        {assessmentContents?.length}
                        {!isReelSaved && `/${assessmentTotalRecords}`}
                      </span>
                    </div>
                  </div>
                  {!isReelSaved && (
                    <SelectAllFeatureContentByType
                      selectedTutorId={selectedTutorId || ''}
                      reelIndex={reelIndex}
                      contentTab={contentTab}
                      currentSelectedTutorTabContentData={
                        currentSelectedTutorTabContentData
                      }
                      subjectID={subjectID}
                    />
                  )}
                </div>

                <div className="addContentScreen--content-wrapper__body-content">
                  {contentTab === contentType.video ? (
                    videoContents?.length ? (
                      videoContents?.map(video => {
                        const isContentSelected = checkContentIsSelected(
                          isAllContentsSelected || false,
                          selectedContentIds || [],
                          selectedTutorId || '',
                          contentType.video,
                          video._id,
                          allIgnoredContentsIds
                        );

                        return (
                          <ProductReel
                            isReelSaved={isReelSaved || false}
                            setSelectedContent={(
                              id: string,
                              contentType: string
                            ) =>
                              setSelectedContent(
                                id,
                                contentType,
                                isContentSelected
                              )
                            }
                            content={video}
                            key={video._id}
                            contentType={contentType.video}
                            isSelected={isContentSelected}
                          />
                        );
                      })
                    ) : (
                      <NoContent />
                    )
                  ) : null}

                  {contentTab === contentType.document ? (
                    documentContents?.length ? (
                      documentContents?.map(document => {
                        const isContentSelected = checkContentIsSelected(
                          isAllContentsSelected || false,
                          selectedContentIds || [],
                          selectedTutorId || '',
                          contentType.document,
                          document._id,
                          allIgnoredContentsIds
                        );

                        return (
                          <ProductReel
                            isReelSaved={isReelSaved || false}
                            setSelectedContent={(
                              id: string,
                              contentType: string
                            ) =>
                              setSelectedContent(
                                id,
                                contentType,
                                isContentSelected
                              )
                            }
                            content={document}
                            key={document._id}
                            contentType={contentType.document}
                            isSelected={isContentSelected}
                          />
                        );
                      })
                    ) : (
                      <NoContent />
                    )
                  ) : null}
                  {contentTab === contentType.assignment ? (
                    assessmentContents?.length ? (
                      assessmentContents?.map(assessment => {
                        const isContentSelected = checkContentIsSelected(
                          isAllContentsSelected || false,
                          selectedContentIds || [],
                          selectedTutorId || '',
                          contentType.assignment,
                          assessment._id,
                          allIgnoredContentsIds
                        );

                        return (
                          <ProductReel
                            isReelSaved={isReelSaved || false}
                            setSelectedContent={(
                              id: string,
                              contentType: string
                            ) =>
                              setSelectedContent(
                                id,
                                contentType,
                                isContentSelected
                              )
                            }
                            content={assessment}
                            key={assessment._id}
                            contentType={contentType.assignment}
                            isSelected={isContentSelected}
                          />
                        );
                      })
                    ) : (
                      <NoContent />
                    )
                  ) : null}
                </div>
              </div>
              <div className="addContentScreen--content-wrapper__footer">
                <div className="addContentScreen--content-wrapper__pagination">
                  {isPaginationShow && (
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
                      pageCount={selectedTabPageSize()}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={({ selected }) =>
                        selectedTabPagination(selected)
                      }
                      containerClassName={'react-paginate'}
                      activeClassName={'active'}
                    />
                  )}
                </div>

                <div className="addContentScreen--content-wrapper__submit">
                  {!isReelSaved && (
                    <button
                      className="btn btn--primary"
                      onClick={() => reelStatus && reelStatus(saveReelType)}
                    >
                      Save
                    </button>
                  )}
                </div>
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

export default FeatureReel;
