// THIS IS GENERATED BY generate_actions.mjs.  DO NOT MAKE CHANGES.

import { DEBUG_ACTIONS } from '../constants/action_types'

export function updateDebugEosAccountStr(debugEosAccountStr) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_DEBUG_EOS_ACCOUNT_STR, data: debugEosAccountStr });
  };
}

export function updateDebugEosAccountInfoObj(debugEosAccountInfoObj) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_DEBUG_EOS_ACCOUNT_INFO_OBJ, data: debugEosAccountInfoObj });
  };
}

export function updateDebugEosBalanceAmt(debugEosBalanceAmt) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_DEBUG_EOS_BALANCE_AMT, data: debugEosBalanceAmt });
  };
}

export function updateDebugPatrBalanceAmt(debugPatrBalanceAmt) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_DEBUG_PATR_BALANCE_AMT, data: debugPatrBalanceAmt });
  };
}

export function updateDebugPledgesReceivedArr(debugPledgesReceivedArr) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_DEBUG_PLEDGES_RECEIVED_ARR, data: debugPledgesReceivedArr });
  };
}

export function updateDebugPledgesGivenArr(debugPledgesGivenArr) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_DEBUG_PLEDGES_GIVEN_ARR, data: debugPledgesGivenArr });
  };
}

export function updateDebugBalancesArr(debugBalancesArr) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_DEBUG_BALANCES_ARR, data: debugBalancesArr });
  };
}

export function updateDebugSubscribersArr(debugSubscribersArr) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_DEBUG_SUBSCRIBERS_ARR, data: debugSubscribersArr });
  };
}

export function updateDebugSubscriptionsArr(debugSubscriptionsArr) {
  return (dispatch) => {
   dispatch({ type: DEBUG_ACTIONS.UPDATE_DEBUG_SUBSCRIPTIONS_ARR, data: debugSubscriptionsArr });
  };
}

