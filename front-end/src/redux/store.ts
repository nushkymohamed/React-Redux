import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk'; // Import Middleware
import rootReducer from './root-reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'dataBase'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// User can add multiple middleware
const middleware = [reduxThunk, promiseMiddleware];

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export type RootStore = ReturnType<typeof rootReducer>;

export { persistor, store };
