import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSelectMultiple } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import Slider from 'react-slick';
import { contentType } from '../../../config/constants';
import ProductReel from '../../../Containers/CreateProduct/ProductReelSlide/ProductReel/ProductReel';
import TutorContainer from '../../../Containers/CreateProduct/ProductReelSlide/TutorContainer/TutorContainer';
import SelectAllContentByType from '../../../Containers/CreateProduct/Reel/SelectAllContentByType';
import { checkContentIsSelected } from '../../../Helper';
import {
  reelTutors,
  singleContentType,
  tutorAndSelectedContent,
} from '../../../redux/product/productReducer';
import { SELECT_ALL_CONTENT_BY_CONTENT_TYPE } from '../../../redux/product/productTypes';
interface ReelProps {
  assessmentContents: singleContentType[];
  assessmentTotalRecords: number;
  contentTab: string;
  currentSelectedTutorTabContentData: boolean;
  deleteReel: Function;
  deleteReelType: string;
  documentContents: singleContentType[];
  documentTotalRecords: number;
  editReelType: string;
  saveReelType: string;
  isAllContentsSelected: boolean;
  isReelSaved: boolean;
  label: string;
  loadTutors: Function;
  moveReel: Function;
  reelIndex: number;
  reelMoveDown: string;
  reelMoveUp: string;
  reelOrder: number;
  reelStatus: Function;
  reelsLength: number;
  selectAllTutorsAndContent: Function;
  selectedTutorId: string;
  setContentTab: Function;
  subjectID: string;
  tutors: reelTutors[];
  tutorsPage: number;
  videoContents: singleContentType[];
  videoTotalRecords: number;
  getVideoContent: Function;
  getDocumentContent: Function;
  getAssessmentContent: Function;
  setSelectedContent: Function;
  selectedContentIds: tutorAndSelectedContent[];
  ignoredContentsIds: string[];
}

const Reel: FC<ReelProps> = ({
  assessmentContents,
  assessmentTotalRecords,
  contentTab,
  currentSelectedTutorTabContentData,
  deleteReel,
  documentContents,
  documentTotalRecords,
  editReelType,
  isAllContentsSelected,
  isReelSaved,
  label,
  loadTutors,
  moveReel,
  reelIndex,
  reelMoveDown,
  reelMoveUp,
  reelOrder,
  reelStatus,
  reelsLength,
  selectAllTutorsAndContent,
  selectedTutorId,
  setContentTab,
  subjectID,
  tutors,
  tutorsPage,
  videoContents,
  videoTotalRecords,
  saveReelType,
  getVideoContent,
  getDocumentContent,
  getAssessmentContent,
  setSelectedContent,
  selectedContentIds,
  ignoredContentsIds,
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

  const NoContent = () => {
    return <div className="noContent">{t('No Content Found')}</div>;
  };

  const [isContentVisible, setIsContentVisible] = useState(true);

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

  const checkContentTabSelectAll = () => {
    if (isAllContentsSelected) {
      return true;
    }
    return currentSelectedTutorTabContentData;
  };
  return (
    <div
      className={`addContentScreen ${
        isReelSaved ? 'editProduct' : 'createProduct'
      }`}
    >
      <div className="addContentScreen--wrapper">
        <div className="addContentScreen--titleArea">
          <div className="icon--wrapper">
            {reelOrder !== 0 && (
              <GoTriangleUp onClick={() => moveReel(reelMoveUp)} />
            )}
            {reelsLength !== Number(reelOrder + 1) && (
              <GoTriangleDown onClick={() => moveReel(reelMoveDown)} />
            )}
          </div>
          <p>{label}</p>

          {!isReelSaved ? (
            <div className="buttonWrapper" onClick={() => deleteReel()}>
              <IoClose />
            </div>
          ) : (
            <div className="buttonWrapper">
              <div
                onClick={() => {
                  reelStatus(editReelType);
                  setIsContentVisible(true);
                }}
              >
                <FiEdit />
              </div>
              <div onClick={() => deleteReel()}>
                <AiOutlineDelete />
              </div>
              <div
                onClick={() => {
                  setIsContentVisible(!isContentVisible);
                }}
              >
                {isContentVisible ? <GoTriangleUp /> : <GoTriangleDown />}
              </div>
            </div>
          )}
        </div>

        {tutors?.length ? (
          <div
            className="addContentScreen--contentArea"
            style={
              isContentVisible ? { display: 'block' } : { display: 'none' }
            }
          >
            <div className="addContentScreen--tutors-wrapper">
              <div className="addContentScreen--tutors-title">
                {t('Select Tutor')}
              </div>
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
                        <TutorContainer
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
                    <SelectAllContentByType
                      selectedTutorId={selectedTutorId || ''}
                      reelIndex={reelIndex}
                      contentTab={contentTab}
                      currentSelectedTutorTabContentData={checkContentTabSelectAll()}
                      dispatchType={SELECT_ALL_CONTENT_BY_CONTENT_TYPE}
                    />
                  )}
                </div>

                <div className="addContentScreen--content-wrapper__body-content">
                  {contentTab === contentType.video ? (
                    videoContents?.length ? (
                      videoContents?.map(video => {
                        return (
                          <ProductReel
                            isReelSaved={isReelSaved || false}
                            setSelectedContent={setSelectedContent}
                            content={video}
                            key={video._id}
                            contentType={contentType.video}
                            isSelected={checkContentIsSelected(
                              isAllContentsSelected || false,
                              selectedContentIds || [],
                              selectedTutorId || '',
                              contentType.video,
                              video._id,
                              ignoredContentsIds
                            )}
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
                        return (
                          <ProductReel
                            isReelSaved={isReelSaved || false}
                            setSelectedContent={setSelectedContent}
                            content={document}
                            key={document._id}
                            contentType={contentType.document}
                            isSelected={checkContentIsSelected(
                              isAllContentsSelected || false,
                              selectedContentIds || [],
                              selectedTutorId || '',
                              contentType.document,
                              document._id,
                              ignoredContentsIds
                            )}
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
                        return (
                          <ProductReel
                            isReelSaved={isReelSaved || false}
                            setSelectedContent={setSelectedContent}
                            content={assessment}
                            key={assessment._id}
                            contentType={contentType.assignment}
                            isSelected={checkContentIsSelected(
                              isAllContentsSelected || false,
                              selectedContentIds || [],
                              selectedTutorId || '',
                              contentType.assignment,
                              assessment._id,
                              ignoredContentsIds
                            )}
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
                </div>

                <div className="addContentScreen--content-wrapper__submit">
                  {!isReelSaved && (
                    <button
                      className="btn btn--primary"
                      onClick={() => reelStatus(saveReelType)}
                    >
                      {t('Save')}
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

export default Reel;
