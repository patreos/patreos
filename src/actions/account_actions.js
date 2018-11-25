import { ACCOUNT_ACTIONS } from '../constants/action_types';

export function updateName(userName) {
  return (dispatch) => {
    dispatch({ type: ACCOUNT_ACTIONS.UPDATE_NAME, data: userName });
  };
}

export function updateUserInfo(userInfo) {
  return (dispatch) => {
    dispatch({ type: ACCOUNT_ACTIONS.UPDATE_USER_INFO, data: userInfo });
  };
}

export function updateTransactions(transactions) {
  return (dispatch) => {
    dispatch({ type: ACCOUNT_ACTIONS.UPDATE_TRANSACTIONS, data: transactions });
  };
}

export function detectScatter(scatterDetected) {
  return (dispatch) => {
    dispatch({ type: ACCOUNT_ACTIONS.DETECT_SCATTER, data: scatterDetected });
  };
}

export function updateVaultInfo(vaultInfo) {
  return (dispatch) => {
    dispatch({ type: ACCOUNT_ACTIONS.UPDATE_VAULT_INFO, data: vaultInfo });
  };
}

export function updateEosBalance(eosBalance) {
  return (dispatch) => {
    dispatch({ type: ACCOUNT_ACTIONS.UPDATE_EOS_BALANCE, data: eosBalance });
  };
}

export function updatePatrBalance(patrBalance) {
  return (dispatch) => {
    dispatch({ type: ACCOUNT_ACTIONS.UPDATE_PATR_BALANCE, data: patrBalance });
  };
}
