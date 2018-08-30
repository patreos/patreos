import { UI_ACTIONS } from '../constants/action_types';

export default (
  state = {
    userName: 'Loading User',
    userInfo: 'Click button to load',
    webSite: 'http://www.patreos.com',
    scatterDetected: 'Checking for Scatter'
  }, action) => {
  switch (action.type) {
  case UI_ACTIONS.UPDATE_NAME:
    return { ...state, userName: action.data };
  case UI_ACTIONS.UPDATE_USER_INFO:
    return { ...state, userInfo: action.data };
  case UI_ACTIONS.UPDATE_TRANSACTIONS:
    return { ...state, transactions: action.data };
  case UI_ACTIONS.DETECT_SCATTER:
    return { ...state, scatterDetected: action.data };
  default:
    return state;
  }
};
