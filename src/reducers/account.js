import {ACCOUNT_ACTIONS} from '../constants/action_types';

export default (
  state = {
    userName: 'Loading User',
    userInfo: 'Click button to load',
    webSite: 'http://www.patreos.com',
    scatterDetected: 'Checking for Scatter',
    vaultInfo: [ "0.0000 EOS", "0.0000 PATR" ],
    eosBalance: '0.0000 EOS',
    ptrReceiver: '0.0000 PATR'
  }, action) => {
  switch (action.type) {
  case ACCOUNT_ACTIONS.UPDATE_NAME:
    return { ...state, userName: action.data };
  case ACCOUNT_ACTIONS.UPDATE_USER_INFO:
    return { ...state, userInfo: action.data };
  case ACCOUNT_ACTIONS.UPDATE_TRANSACTIONS:
    return { ...state, transactions: action.data };
  case ACCOUNT_ACTIONS.DETECT_SCATTER:
    return { ...state, scatterDetected: action.data };
  case ACCOUNT_ACTIONS.UPDATE_VAULT_INFO:
    return { ...state, vaultInfo: action.data };
  case ACCOUNT_ACTIONS.UPDATE_EOS_BALANCE:
    return { ...state, eosBalance: action.data };
  case ACCOUNT_ACTIONS.UPDATE_PATR_BALANCE:
    return { ...state, patrBalance: action.data };
  default:
    return state;
  }
};
