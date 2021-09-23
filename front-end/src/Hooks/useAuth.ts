import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';

import { LOGIN_REQUEST, LOGIN_FAILED } from '../redux/auth/authTypes';
import { SET_CURRENT_USER } from '../redux/auth/authTypes';

const useAuth = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [timestamp, setTimestamp] = useState(0);
  const signIn = (username: string, password: string, timestamp: number) => {
    dispatch({ type: LOGIN_REQUEST });
    setUsername(username);
    setPassword(password);
    setTimestamp(timestamp);
  };

  const login = async () => {
    try {
      const user = await Auth.signIn(username, password);
      dispatch({
        type: SET_CURRENT_USER,
        payload: {
          username: user.getUsername(),
          email: user.attributes?.email,
          roles: user.getSignInUserSession().getIdToken().payload[
            'cognito:groups'
          ],
        },
      });
      setUsername('');
    } catch (error: any) {
      setUsername('');

      if (error.name !== 'Error') {
        dispatch({
          type: LOGIN_FAILED,
          payload: error,
        });
      }
    }
  };

  useEffect(() => {
    if (username && password && timestamp) {
      login();
    }
  }, [username, password, timestamp]);

  return signIn;
};

export default useAuth;
