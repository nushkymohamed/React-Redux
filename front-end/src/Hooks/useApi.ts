import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteRequest, get, post, put } from '../api/commonApi';
import { responseType } from '../config/constants';
import { downloadFile } from '../Helper';
export interface customResponseType {
  responseType: string;
  fileName: string;
}
function useApi() {
  const dispatch = useDispatch();
  const [actions, setActions] = useState<any>({});
  const [baseUrl, setBaseUrl] = useState('');
  const [postValues, setPostValues] = useState({});
  const [method, setMethod] = useState('POST');
  const [isEnCoded, setEnCoded] = useState(false);
  const [customResponse, setCustomResponse] =
    useState<customResponseType | null>(null);

  const [serviceName, setServiceName] = useState('');
  const [customInput, setCustomInput] = useState({});

  const callAPI = () => {
    switch (method) {
      case 'POST':
        return post(baseUrl, postValues, serviceName);

      case 'GET':
        return get(baseUrl, serviceName, customResponse);

      case 'PUT':
        return put(baseUrl, postValues, serviceName);

      case 'DELETE':
        return deleteRequest(baseUrl, postValues, serviceName);

      default:
        return get(baseUrl, serviceName, customResponse);
    }
  };

  useEffect(() => {
    if (baseUrl && baseUrl != '') {
      const requestApiCall = () => {
        actions.request &&
          dispatch({
            type: actions.request,
            payload: { customInput },
          });
        const result = callAPI();

        result
          .then(response => {
            switch (response.status) {
              case 200:
              case 201:
              case 202:
              case 204:
                if (customResponse?.responseType === responseType.arraybuffer) {
                  downloadFile(
                    response.data,
                    response.headers['content-type'],
                    customResponse?.fileName
                  );
                  dispatch({
                    type: actions.success,
                    payload: { customInput },
                  });
                } else {
                  dispatch({
                    type: actions.success,
                    payload: { customInput, dataWrapper: response.data },
                  });
                }

                break;

              default:
                dispatch({
                  type: actions.fail,
                  payload:
                    (response.data &&
                      (response.data.message || response.data)) ||
                    response.response?.data?.message,
                  customInput,
                });

                break;
            }
          })
          .catch(error => {
            dispatch({
              type: actions.fail,
              payload: error,
              customInput,
            });
          });
        setBaseUrl('');
      };

      requestApiCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]);

  const submitForm = (
    url: string,
    request: string,
    success: string,
    fail: string,
    postValues: object,
    history: object,
    method: string,
    isEnCoded: boolean = false,
    serviceName: string,
    customInput?: object,
    customResponse?: customResponseType
  ) => {
    const newActions = { request, success, fail };
    const mergedActions = { ...actions, ...newActions };

    customInput && setCustomInput(customInput);
    setCustomResponse(customResponse || ({} as customResponseType));
    setMethod(method);
    setActions(mergedActions);
    setPostValues(postValues);
    setEnCoded(isEnCoded);
    setServiceName(serviceName);
    setBaseUrl(url);
  };

  return [submitForm];
}

export default useApi;
