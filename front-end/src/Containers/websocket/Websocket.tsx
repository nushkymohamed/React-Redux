import React, { useEffect, useState } from 'react';
import { w3cwebsocket, w3cwebsocket as W3CWebSocket } from 'websocket';
import { Auth, Signer } from 'aws-amplify';
import { notificationType, websocketUrl } from '../../config/constants';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { WEBSOCKET_MESSAGE_RECEIVED } from '../../redux/websocket/websocketTypes';
import { RootStore } from '../../redux/store';

const Websocket = () => {
  const [wsClient, setWsClient] = useState<w3cwebsocket | null>(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStore) => state.auth);

  const handleTriggerConnection = async () => {
    const credentials = await Auth.currentCredentials();

    const accessInfo = {
      access_key: credentials.accessKeyId,
      secret_key: credentials.secretAccessKey,
      session_token: credentials.sessionToken,
    };

    const signedUrl = Signer.signUrl(websocketUrl, accessInfo);

    setWsClient(new W3CWebSocket(signedUrl));
  };

  useEffect(() => {
    if (wsClient) {
      wsClient.onerror = e => {
        console.error('Error opening websocket connection', e);
      };
      wsClient.onopen = () => {
        console.log('WebSocket connection established successfully');
      };

      wsClient.onmessage = e => {
        if (typeof e.data === 'string') {
          const data = JSON.parse(e.data);
          if (
            data?.message &&
            ![
              notificationType.REMAINDER,
              notificationType.USER_SUBSCRIPTION_CREATE,
              notificationType.ASSESSMENT_RESPONSE_ATTEMPT_CREATE,
              notificationType.ASSESSMENT_RESPONSE_ATTEMPT_UPDATE,
              notificationType.ASSESSMENT_RESPONSE_ATTEMPT_SUBMIT,
              notificationType.VIDEO_SUMMARY_DELETE,
            ].includes(data.task)
          ) {
            displayToastMessage(data.message);
          }

          dispatch({
            type: WEBSOCKET_MESSAGE_RECEIVED,
            payload: data,
          });
        }
      };

      wsClient.onclose = () => {
        console.log('The websocket connection has been closed successfully.');
      };
    }
  }, [wsClient]);

  const closeWebSocket = () => {
    if (wsClient?.readyState === wsClient?.OPEN) {
      wsClient?.close(1000);
    }
  };

  useEffect(() => {
    user?.username && handleTriggerConnection();
    !user && closeWebSocket();
  }, [user]);

  const sendWebsocketMessage = (message: string) => {
    if (wsClient?.readyState === wsClient?.OPEN) {
      wsClient?.send(message);
    }
  };

  const displayToastMessage = (message: string) => {
    toast.dark(message);
  };

  return <ToastContainer autoClose={5000} />;
};

export default Websocket;
