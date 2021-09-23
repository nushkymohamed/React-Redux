import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { post, get, put, deleteRequest } from '../api/commonApi';

function LanguageApi() {
  const dispatch = useDispatch();
  const [actions, setActions] = useState();
  const [baseUrl, setBaseUrl] = useState(null);
  const [postValues, setPostValues] = useState({});
  const [history, setRedirect] = useState({});
  const [method, setMethod] = useState('POST');
  const [isEnCoded, setEnCoded] = useState(false);
  const [portType, setPortType] = useState('');

  const {i18n } = useTranslation();

  const accessToken = '';

  const callAPI = () => {
    switch (method) {
      case 'POST':
        return post(baseUrl, accessToken, postValues, isEnCoded, portType, dispatch);

      case 'GET':
        return get(baseUrl, accessToken, portType);

      case 'PUT':
        return put(baseUrl, accessToken, postValues, isEnCoded, portType);

      case 'DELETE':
        return deleteRequest(baseUrl, accessToken, postValues, portType);

      default:
        return get(baseUrl, accessToken, portType);
    }
  };

  useEffect(() => {
    if (baseUrl) {
      const requestApiCall = () => {
        i18n.changeLanguage(postValues.currentLanguage);

        dispatch({
          type: actions.success,
          payload: postValues.currentLanguage,
        });

        setBaseUrl(null);
      };

      requestApiCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]);

  const submitForm = (
    url,
    request,
    success,
    fail,
    postValues,
    history,
    method,
    isEnCoded = false,
    portType
  ) => {
    const newActions = { request, success, fail };
    const mergedActions = { ...actions, ...newActions };

    setMethod(method);
    setActions(mergedActions);
    setBaseUrl(url);
    setPostValues(postValues);
    setRedirect(history);
    setEnCoded(isEnCoded);
    setPortType(portType);
  };

  return [submitForm];
}

export default LanguageApi;
