import { UI_ACTIONS } from '../constants/action_types';

export function updateName(userName) {
  return (dispatch) => {
    dispatch({ type: UI_ACTIONS.UPDATE_NAME, data: userName });
  };
}

export function updateUserInfo(userInfo) {
  return (dispatch) => {
    dispatch({ type: UI_ACTIONS.UPDATE_USER_INFO, data: userInfo });
  };
}

export function detectScatter(scatterDetected) {
  return (dispatch) => {
    dispatch({ type: UI_ACTIONS.DETECT_SCATTER, data: scatterDetected });
  };
}
