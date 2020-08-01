/** @format */

import { combineReducers } from 'redux';
import genReducer from './genReducer';
import authReducer from './authReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const genPersistConfig = {
  key: 'gen',
  storage: storage,
  whitelist: ['lang'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  gen: persistReducer(genPersistConfig, genReducer),
});

export default rootReducer;
