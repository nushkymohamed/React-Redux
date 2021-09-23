import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ShareDownloadButtons from '../../Components/TheaterMode/ShareDownloadButtons';
import SummaryCard from '../../Components/TheaterVideoComponents/SummaryCard/SummaryCard';
import { notificationType, USER_CONTENT_SERVICE } from '../../config/constants';
import { getArrayIndexUsingKey } from '../../Helper';
import useApi from '../../Hooks/useApi';
import useTotalNumberOfRecords from '../../Hooks/useTotalNumberOfRecords';
import { RootStore } from '../../redux/store';
import { Summary } from '../../redux/Theater/TheaterReducer';
import {
  GET_THEATER_SUMMARY_SUCCESS,
  RESET_SUMMARY_FAILED,
  RESET_SUMMARY_REQUEST,
  RESET_SUMMARY_SUCCESS,
  THEATER_SUMMARY_FAILED,
  THEATER_SUMMARY_REQUEST,
  UPDATE_SUMMARY_TEXT_SUCCESS,
} from '../../redux/Theater/TheaterTypes';

type TheatreSummaryProps = {
  getSummaryStartTime?: (startTime: number) => void;
  downloadSummery: () => void;
};
type UrlParamsType = {
  contentId: string;
};
type FormattedSummaryType = { _id: string; start: number; end: number };

type SummaryRefDataType = {
  [key: string]: HTMLDivElement | null;
};

const TheatreSummary: FC<TheatreSummaryProps> = ({
  getSummaryStartTime,
  downloadSummery,
}) => {
  const { t } = useTranslation();
  const [resetSummaryApi] = useApi();
  const [getAllSummariesApi] = useApi();
  const {
    playerStats: { playedSeconds = 0 },
    isDownloading,
    summaries,
  } = useSelector((state: RootStore) => state.theater);
  const { userData } = useSelector((state: RootStore) => state.auth);
  const { lastMessage } = useSelector((state: RootStore) => state?.websocket);

  const [sortedSummaries, setSortedSummaries] = useState<Summary[]>();
  const [formattedSummaryData, setFormattedSummaryData] =
    useState<FormattedSummaryType[]>();
  const [currentSummaryId, setCurrentSummaryId] = useState<string | null>();
  const [updateSummaryApi] = useApi();
  const [getSummaryTotalRecords, summaryTotalRecords] =
    useTotalNumberOfRecords();

  const summaryCardRefs = useRef<SummaryRefDataType>({});
  const { contentId } = useParams<UrlParamsType>();

  useEffect(() => {
    getSummaryTotalRecords(
      `/users/${userData?._id}/videos/${contentId}/summaries?page=1&size=1`,
      USER_CONTENT_SERVICE
    );
  }, []);

  const getAllSummaries = () => {
    getAllSummariesApi(
      `/users/${userData?._id}/videos/${contentId}/summaries?page=1&size=${summaryTotalRecords}`,
      THEATER_SUMMARY_REQUEST,
      GET_THEATER_SUMMARY_SUCCESS,
      THEATER_SUMMARY_FAILED,
      {},
      {},
      'GET',
      false,
      USER_CONTENT_SERVICE
    );
  };

  useEffect(() => {
    if (playedSeconds > 0) {
      const currentSummary = getCurrentSummaryId(playedSeconds);
      setCurrentSummaryId(currentSummary);
    }
  }, [playedSeconds]);

  useEffect(() => {
    if (currentSummaryId) {
      const container = document.getElementById('summaryParentElementId');
      const topOffset =
        summaryCardRefs.current[currentSummaryId]?.offsetTop || 0;
      if (container && topOffset > 0) {
        container.scroll({ top: topOffset, behavior: 'smooth' });
      }
    }
  }, [currentSummaryId]);

  useEffect(() => {
    if (summaries?.length) {
      let formattedSummaryList: FormattedSummaryType[] = [];
      summaries?.forEach(({ _id, endTime, startTime }) => {
        formattedSummaryList.push({
          _id,
          start: getTimeInSeconds(startTime),
          end: getTimeInSeconds(endTime),
        });
      });
      formattedSummaryList.sort((sum1, sum2) => sum1.start - sum2.start);
      setFormattedSummaryData(formattedSummaryList);

      //sort summaries according to start time
      setSortedSummaries(() =>
        summaries
          .slice()
          .sort(
            (sum1, sum2) =>
              getArrayIndexUsingKey(formattedSummaryList, '_id', sum1._id) -
              getArrayIndexUsingKey(formattedSummaryList, '_id', sum2._id)
          )
      );
    }
  }, [JSON.stringify(summaries)]);

  const resetSummary = (summary: Summary) => {
    resetSummaryApi(
      `/users/${userData?._id}/videos/${contentId}/summary`,
      RESET_SUMMARY_REQUEST,
      RESET_SUMMARY_SUCCESS,
      RESET_SUMMARY_FAILED,
      summary,
      {},
      'DELETE',
      false,
      USER_CONTENT_SERVICE
    );
  };

  const getTimeInSeconds = (timeString: string): number => {
    const splitTime = timeString.split(':');
    if (splitTime.length === 3) {
      return (
        Number(splitTime[2]) +
        Number(splitTime[1]) * 60 +
        Number(splitTime[0]) * 60 * 60
      );
    } else if (splitTime.length === 2) {
      return Number(splitTime[2]) + Number(splitTime[1]) * 60;
    } else {
      return 0;
    }
  };

  const getCurrentSummaryId = (playedSeconds: number) => {
    return (
      formattedSummaryData?.find(
        ({ end, start }) => start <= playedSeconds && end >= playedSeconds
      )?._id || null
    );
  };

  const onSaveSummery = (summary: Summary, summaryIndex: number) => {
    updateSummaryApi(
      `/users/${userData?._id}/videos/${contentId}/summary`,
      THEATER_SUMMARY_REQUEST,
      UPDATE_SUMMARY_TEXT_SUCCESS,
      THEATER_SUMMARY_FAILED,
      summary,
      {},
      'PUT',
      false,
      USER_CONTENT_SERVICE,
      { summaryIndex }
    );
  };

  useEffect(() => {
    if (
      [
        notificationType.USER_SPECIFIC_VIDEO_SUMMARY_UPDATE,
        notificationType.USER_SPECIFIC_VIDEO_SUMMARY_CREATE,
        notificationType.VIDEO_SUMMARY_DELETE,
      ].includes(lastMessage?.task)
    ) {
      summaryTotalRecords && getAllSummaries();
    }
  }, [JSON.stringify(lastMessage)]);

  useEffect(() => {
    summaryTotalRecords && getAllSummaries();
  }, [summaryTotalRecords]);

  const updateSummaryCardRef = (
    summaryId: string,
    data: HTMLDivElement | null
  ) => {
    let currentRef = summaryCardRefs.current;
    currentRef[summaryId] = data;
    summaryCardRefs.current = currentRef;
  };

  return (
    <div className="theaterMode__summaryCards" id="summaryParentElementId">
      <div className="theaterMode__summaryCards--title">
        <p>{t("What you'll learn")}</p>
        <ShareDownloadButtons
          isDownloading={isDownloading}
          downloadSummery={downloadSummery}
        />
      </div>
      {sortedSummaries?.map((summary, index) => (
        <SummaryCard
          updateRef={updateSummaryCardRef}
          summary={summary}
          key={summary._id}
          isHighlighted={summary._id === currentSummaryId}
          getSummaryStartTime={startTime =>
            getSummaryStartTime &&
            getSummaryStartTime(getTimeInSeconds(startTime))
          }
          onSaveSummery={summeryText =>
            onSaveSummery({ ...summary, text: summeryText }, index)
          }
          resetSummary={() => resetSummary(summary)}
        />
      ))}
    </div>
  );
};
export default TheatreSummary;
