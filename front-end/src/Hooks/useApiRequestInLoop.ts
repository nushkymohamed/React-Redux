import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uuidv4 } from '../Helper';
import { apiRequestListSingleItem } from '../redux/common/commonReducer';
import {
  INITIAL_DATA_LIST_SETUP,
  LIST_DATA_FAILED,
  LIST_DATA_REQUEST,
  LIST_DATA_SUCCESS,
} from '../redux/common/commonTypes';
import { RootStore } from '../redux/store';
import useApi from './useApi';

type RequestStatus = {
  status: apiRequestListSingleItem[];
  isAllRequestSuccess: boolean;
};

const useApiRequestInLoop = () => {
  const [api] = useApi();

  const [url, setUrl] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [method, setMethod] = useState<string | null>(null);
  const [dataList, setDataList] = useState<any[] | null>(null);
  const [
    apiRequestStatus,
    setApiRequestStatus,
  ] = useState<RequestStatus | null>(null);

  const uniqueID = useMemo(() => uuidv4(), []);

  const { apiRequestList } = useSelector((state: RootStore) => state.common);

  const dispatch = useDispatch();

  const [currentApiRequestIndex, setCurrentApiRequestIndex] = useState<number>(
    -1
  );

  useEffect(() => {
    if (url && service && method && dataList && currentApiRequestIndex >= 0) {
      api(
        url,
        LIST_DATA_REQUEST,
        LIST_DATA_SUCCESS,
        LIST_DATA_FAILED,
        dataList[currentApiRequestIndex],
        {},
        method,
        false,
        service,
        { uniqueID, index: currentApiRequestIndex }
      );
    }
  }, [currentApiRequestIndex]);

  useEffect(() => {
    if (dataList?.length && url && service && method) {
      dispatch({
        type: INITIAL_DATA_LIST_SETUP,
        payload: {
          dataWrapper: { data: { uniqueID, length: dataList.length } },
        },
      });
    }
  }, [dataList]);

  useEffect(() => {
    if (service && url && method && dataList?.length && apiRequestList) {
      const list = apiRequestList[uniqueID];
      list.every(({ request, success, failed, index }) => {
        if (!request && (!success || !failed)) {
          setCurrentApiRequestIndex(index);
          return false;
        } else {
          return true;
        }
      });
      const completedApiRequest = list.filter(
        ({ request, success, failed }) => request && (success || failed)
      );

      if (completedApiRequest.length === dataList?.length) {
        const isAllRequestSuccess = completedApiRequest.every(
          ({ success }) => success
        );

        setApiRequestStatus({ status: list, isAllRequestSuccess });
      }
    }
  }, [url, service, method, dataList, JSON.stringify(apiRequestList)]);

  const submitForm = (
    url: string,
    serviceType: string,
    method: string,
    dataList: any[]
  ) => {
    setUrl(url);
    setService(serviceType);
    setMethod(method);
    setDataList(dataList);
  };

  return [submitForm, apiRequestStatus] as const;
};

export default useApiRequestInLoop;
