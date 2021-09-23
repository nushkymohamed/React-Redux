import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { persistor, store } from './redux/store';
import i18n from './i18n';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
        <App />
        </I18nextProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
