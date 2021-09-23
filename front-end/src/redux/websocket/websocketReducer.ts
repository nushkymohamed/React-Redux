import {
  WEBSOCKET_MESSAGE_RECEIVED,
  RESET_LAST_MESSAGE,
} from './websocketTypes';

export interface websocketType {
  messages: any[];
  lastMessage: any | null;
}

type Action = {
  type: string;
  payload: any;
};

const INITIAL_STATE = {
  messages: [],
  lastMessage: null,
};

const websocketReducer = (
  state: websocketType = INITIAL_STATE,
  action: Action
): websocketType => {
  switch (action.type) {
    case WEBSOCKET_MESSAGE_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        lastMessage: action.payload,
      };
    case RESET_LAST_MESSAGE:
      return {
        ...state,
        lastMessage: null,
      };

    default:
      return state;
  }
};

export default websocketReducer;
