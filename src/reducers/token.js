import {PATREOS_TOKEN_ACTIONS} from '../constants/action_types';

export default (
  state = {
    unstakedBalance: '0.0000 PTR',
    stakedBalance: '0.0000 PTR',
    receiverAccount: '',
    transferQuantity: '1.0000',
    stakeQuantity: '1.0000',
    unstakeQuantity: '1.0000',
    pledgeQuantity: '1.0000',
    pledgeCycleDays: '0'
  }, action) => {
  switch (action.type) {
  case PATREOS_TOKEN_ACTIONS.UNSTAKED_BALANCE:
    return { ...state, unstakedBalance: action.data };
  case PATREOS_TOKEN_ACTIONS.STAKED_BALANCE:
    return { ...state, stakedBalance: action.data };
  case PATREOS_TOKEN_ACTIONS.RECEIVER_ACCOUNT:
    return { ...state, receiverAccount: action.data };
  case PATREOS_TOKEN_ACTIONS.QUANTITY_TO_TRANSFER:
    return { ...state, transferQuantity: action.data };
  case PATREOS_TOKEN_ACTIONS.QUANTITY_TO_STAKE:
    return { ...state, stakeQuantity: action.data };
  case PATREOS_TOKEN_ACTIONS.QUANTITY_TO_UNSTAKE:
    return { ...state, unstakeQuantity: action.data };
  case PATREOS_TOKEN_ACTIONS.QUANTITY_TO_PLEDGE:
    return { ...state, pledgeQuantity: action.data };
  case PATREOS_TOKEN_ACTIONS.PLEDGE_CYCLE_DAYS:
    return { ...state, pledgeCycleDays: action.data };
  default:
    return state;
  }
};
