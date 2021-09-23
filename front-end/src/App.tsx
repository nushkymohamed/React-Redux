import React from 'react';
import Amplify from 'aws-amplify';
import awsConfiguration from './config/awsCognitoSettings';
import Routes from './routes';

import './assets/scss/scss_web/style.scss';
import './assets/scss/scss_player/plyr.scss';

const App = () => {
  Amplify.configure(awsConfiguration);
  return <Routes />;
};

export default App;
