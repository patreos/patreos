import { UI_ACTIONS } from '../constants/action_types';

export default (
  state = {
    count: 1,
    userName: 'Loading User',
    userInfo: 'Loading User Info',
    webSite: 'http://www.patreos.com',
    scatterDetected: 'Checking for Scatter'
  }, action) => {
  switch (action.type) {
  case UI_ACTIONS.UPDATE_NAME:
    return { ...state, userName: action.data };
  case UI_ACTIONS.UPDATE_USER_INFO:
    return { ...state, userInfo: action.data };
  case UI_ACTIONS.INCREMENT_COUNT:
    return { ...state, count: action.data };
  case UI_ACTIONS.DETECT_SCATTER:
    return { ...state, scatterDetected: action.data };
  default:
    return state;
  }
};
