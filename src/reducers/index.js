import { combineReducers } from 'redux';
import accountInfo from './account';
import tokenInfo from './token';
// Add your new reducer here
const reducers = {
  accountInfo,
  tokenInfo
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
