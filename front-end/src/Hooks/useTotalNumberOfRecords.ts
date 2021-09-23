import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { uuidv4 } from '../Helper';
import {
  GET_TOTAL_RECORDS_FAILED,
  GET_TOTAL_RECORDS_REQUEST,
  GET_TOTAL_RECORDS_SUCCESS,
} from '../redux/common/commonTypes';
import { RootStore } from '../redux/store';
import useApi from './useApi';

const useTotalNumberOfRecords = () => {
  const [getTotalRecodesApi] = useApi();

  const [url, setUrl] = useState<string | null>(null);

  const [service, setService] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState(-1);

  const uniqueID = useMemo(() => uuidv4(), []);

  const { commonTotalRecords } = useSelector(
    (state: RootStore) => state.common
  );

  useEffect(() => {
    service &&
      url &&
      getTotalRecodesApi(
        url,
        GET_TOTAL_RECORDS_REQUEST,
        GET_TOTAL_RECORDS_SUCCESS,
        GET_TOTAL_RECORDS_FAILED,
        {},
        {},
        'GET',
        false,
        service,
        { uniqueID }
      );
  }, [url, service]);

  useEffect(() => {
    commonTotalRecords &&
      commonTotalRecords[uniqueID] >= 0 &&
      setTotalRecords(commonTotalRecords[uniqueID]);
  }, [commonTotalRecords]);

  const submitForm = (url: string, serviceType: string) => {
    setUrl(url);
    setService(serviceType);
  };

  /**  This will reset url and service only. This will not reset 'totalRecords' value */
  const resetTotalRecords = () => {
    setUrl(null);
    setService(null);
  };

  return [submitForm, totalRecords, resetTotalRecords] as const;
};

export default useTotalNumberOfRecords;
