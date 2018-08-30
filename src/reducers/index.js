import { combineReducers } from 'redux';
import accountInfo from './account';

// Add your new reducer here
const reducers = {
  accountInfo
};

const rootReducer = combineReducers(reducers);

export default rootReducer;