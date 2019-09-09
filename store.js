import { applyMiddleware, createStore, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { createBlacklistFilter } from 'redux-persist-transform-filter';

import rootReducer from './reducers';
import apiMiddleware from './middleware';

const createCustomStore = () => {
  const blacklistLoginFilter = createBlacklistFilter('auth', [
    'loginInProgress',
    'error',
    'authInProgress',
    'requestingToken',
  ]);

  const persistConfig = {
    key: 'phone-webapp',
    timeout: 10000, // Added to avoid some errors with the Rehydrate on app load
    storage,
    blacklist: ['connection', 'search', 'call', 'dialpad'],
    transforms: [blacklistLoginFilter],
    stateReconciler: autoMergeLevel2,
  };

  const persistedReducers = persistReducer(persistConfig, rootReducer);

  return createStore(
    persistedReducers,
    {},
    compose(
      applyMiddleware(apiMiddleware),
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f,
    ),
  );
};

export default () => {
  const store = createCustomStore();
  const persistor = persistStore(store);
  return { store, persistor };
};
