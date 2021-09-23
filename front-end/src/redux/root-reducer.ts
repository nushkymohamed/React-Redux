import { combineReducers } from 'redux';
import auth from './auth/authReducer';
import bulkView from './bulkView/bulkViewReducer';
import common from './common/commonReducer';
import content from './content/contentReducer';
import dataBase from './dataBase/dataBaseReducer';
import filter from './filters/filtersReducer';
import language from './language/languageReducer';
import {
  default as notification,
  default as notifications,
} from './notifications/NotificationReducer';
import products from './product/productReducer';
import productSubscription from './productSubscription/productSubscriptionReducer';
import signup from './signup/signupReducer';
import reels from './student/reelReducer';
import reelTutors from './student/reelTutorReducer';
import reelVideos from './student/reelVideoReducer';
import subjects from './subjects/subjectsReducer';
import subscriptions from './subscription/subscriptionReducer';
import theater from './Theater/TheaterReducer';
import trial from './trial/TrialReducer';
import userIndividualManagement from './userManagement/userIndividualManagementReducer';
import userManagement from './userManagement/userManagementReducer';
import viewDocument from './viewDocument/viewDocumentReducer';
import websocket from './websocket/websocketReducer';

export default combineReducers({
  auth,
  bulkView,
  common,
  content,
  dataBase,
  filter,
  language,
  notification,
  notifications,
  productSubscription,
  products,
  reelTutors,
  reelVideos,
  reels,
  signup,
  subjects,
  subscriptions,
  theater,
  trial,
  userIndividualManagement,
  userManagement,
  viewDocument,
  websocket,
});
