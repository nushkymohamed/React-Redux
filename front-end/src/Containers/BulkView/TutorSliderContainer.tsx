import React, { FC, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tutor from '../../Components/CreateProduct/Tutor/Tutor';
import CustomSlider from '../../Components/TheaterVideoComponents/SubjectSlider/CustomSlider';
import { contentType, PRODUCT_CONTENT_SERVICE } from '../../config/constants';
import useApi from '../../Hooks/useApi';
import {
  GET_CONTENT_BY_COUNT_REQUEST,
  GET_CONTENT_BY_COUNT_SUCCESS,
  GET_CONTENT_BY_COUNT_FAILED,
  SET_SELECTED_TUTOR_BULK,
} from '../../redux/bulkView/bulkViewType';
import { RootStore } from '../../redux/store';

interface SliderContainerProps {
  settings: any;
  subjectId: string;
  loadMoreContent: Function;
}

const TutorSliderContainer: FC<SliderContainerProps> = ({
  settings,
  subjectId,
  loadMoreContent,
}) => {
  const dispatch = useDispatch();
  const [getContentCountApi] = useApi();
  const { tutors, allProductIds, isAllTutorsSelected, selectedTutorId } =
    useSelector((state: RootStore) => state.bulkView);

  useEffect(() => {
    tutors?.length &&
      tutors.forEach(tutor => {
        !tutor?.contentCount && getContentCountByID(tutor._id);
      });
  }, [tutors]);

  const getContentCountByID = (id: string) => {
    getContentCountApi(
      `/contents?tutorId=${id}&productIds=${allProductIds}&subjectId=${subjectId}&contentType=${contentType.video}&page=1&size=1`,
      GET_CONTENT_BY_COUNT_REQUEST,
      GET_CONTENT_BY_COUNT_SUCCESS,
      GET_CONTENT_BY_COUNT_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_CONTENT_SERVICE,
      { id }
    );
  };

  const getContentByTopic = (
    SUCCESS_TYPE: string,
    page: number,
    size: number
  ) => {};

  return (
    <CustomSlider
      customSettings={settings}
      dataLength={tutors?.length}
      loadMore={() => loadMoreContent()}
    >
      {tutors?.map((tutor, key: number) => {
        return (
          <Tutor
            key={tutor._id}
            tutor={tutor}
            selectTutorAction={(id: string) => {
              id !== selectedTutorId &&
                dispatch({
                  type: SET_SELECTED_TUTOR_BULK,
                  payload: { dataWrapper: { id } },
                });
            }}
          />
        );
      })}
    </CustomSlider>
  );
};
export default TutorSliderContainer;
