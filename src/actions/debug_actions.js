// THIS IS GENERATED BY generate_actions.mjs.  DO NOT MAKE CHANGES.

import { DEBUG_ACTIONS } from '../constants/action_types'

export function updateDebugEosAccountStr(debugEosAccountStr) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_DEBUG_EOS_ACCOUNT_STR, data: debugEosAccountStr });
  };
}

export function updateEosAccountInfoObj(eosAccountInfoObj) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_EOS_ACCOUNT_INFO_OBJ, data: eosAccountInfoObj });
  };
}

export function updateEosBalanceAmt(eosBalanceAmt) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_EOS_BALANCE_AMT, data: eosBalanceAmt });
  };
}

export function updatePatrBalanceAmt(patrBalanceAmt) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_PATR_BALANCE_AMT, data: patrBalanceAmt });
  };
}

export function updatePledgesReceivedArr(pledgesReceivedArr) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_PLEDGES_RECEIVED_ARR, data: pledgesReceivedArr });
  };
}

export function updatePledgesGivenArr(pledgesGivenArr) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_PLEDGES_GIVEN_ARR, data: pledgesGivenArr });
  };
}

export function updateBalancesArr(balancesArr) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_BALANCES_ARR, data: balancesArr });
  };
}

export function updateSubscribersArr(subscribersArr) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_SUBSCRIBERS_ARR, data: subscribersArr });
  };
}

export function updateSubscriptionsArr(subscriptionsArr) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_SUBSCRIPTIONS_ARR, data: subscriptionsArr });
  };
}

