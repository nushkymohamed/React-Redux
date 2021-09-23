import { SET_CURRENT_LANGUAGE } from './languageTypes';

const INITIAL_STATE = {
  currentLanguage: 'en',
};

const languageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload,
      };

    default:
      return state;
  }
};

export default languageReducer;
