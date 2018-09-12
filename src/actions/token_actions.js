import { PATREOS_TOKEN_ACTIONS } from '../constants/action_types';

export function updateUnstakedBalance(unstakedBalance) {
  return (dispatch) => {
    dispatch({ type: PATREOS_TOKEN_ACTIONS.UNSTAKED_BALANCE, data: unstakedBalance });
  };
}

export function updateStakedBalance(stakedBalance) {
  return (dispatch) => {
    dispatch({ type: PATREOS_TOKEN_ACTIONS.STAKED_BALANCE, data: stakedBalance });
  };
}

export function updateReceiverAccount(receiverAccount) {
  return (dispatch) => {
    dispatch({ type: PATREOS_TOKEN_ACTIONS.RECEIVER_ACCOUNT, data: receiverAccount });
  };
}

export function updateTransferQuantity(transferQuantity) {
  return (dispatch) => {
    dispatch({ type: PATREOS_TOKEN_ACTIONS.QUANTITY_TO_TRANSFER, data: transferQuantity });
  };
}

export function updateStakeQuantity(stakeQuantity) {
  return (dispatch) => {
    dispatch({ type: PATREOS_TOKEN_ACTIONS.QUANTITY_TO_STAKE, data: stakeQuantity });
  };
}

export function updateUnstakeQuantity(unstakeQuantity) {
  return (dispatch) => {
    dispatch({ type: PATREOS_TOKEN_ACTIONS.QUANTITY_TO_UNSTAKE, data: unstakeQuantity });
  };
}

export function updatePledgeQuantity(pledgeQuantity) {
  return (dispatch) => {
    dispatch({ type: PATREOS_TOKEN_ACTIONS.QUANTITY_TO_PLEDGE, data: pledgeQuantity });
  };
}

export function updatePledgeCycleDays(pledgeCycleDays) {
  return (dispatch) => {
    dispatch({ type: PATREOS_TOKEN_ACTIONS.PLEDGE_CYCLE_DAYS, data: pledgeCycleDays });
  };
}
