// THIS IS GENERATED BY generate_reducers.mjs.  DO NOT MAKE CHANGES.

import { PATREOS_ACTIONS } from '../constants/action_types'

export default (
  state = {
    balanceAmt: '0.0000',
    stakedBalanceAmt: '0.0000',
    transferToAccountStr: '',
    transferAmt: '0.0000',
    stakeAmt: '0.0000',
    unstakeAmt: '0.0000',
    followAccountStr: '',
    creatorNameStr: '',
    creatorDescriptionStr: '',
    creatorBannerStr: '',
    creatorImageStr: '',
    publicationTitleStr: '',
    publicationDescriptionStr: '',
    publicationUrlStr: '',
    publicationImageStr: '',
    pledgeTokenSymbolStr: '',
    pledgeTokenContractStr: '',
    pledgeToAccountStr: '',
    pledgeAmt: '0.0000',
    pledgeCycleNum: 0,
    pledgesReceivedArr: [],
    pledgesGivenArr: [],
  }, action) => {
  switch (action.type) {
  case PATREOS_ACTIONS.UPDATE_BALANCE_AMT:
    return { ...state, balanceAmt: action.data };
  case PATREOS_ACTIONS.UPDATE_STAKED_BALANCE_AMT:
    return { ...state, stakedBalanceAmt: action.data };
  case PATREOS_ACTIONS.UPDATE_TRANSFER_TO_ACCOUNT_STR:
    return { ...state, transferToAccountStr: action.data };
  case PATREOS_ACTIONS.UPDATE_TRANSFER_AMT:
    return { ...state, transferAmt: action.data };
  case PATREOS_ACTIONS.UPDATE_STAKE_AMT:
    return { ...state, stakeAmt: action.data };
  case PATREOS_ACTIONS.UPDATE_UNSTAKE_AMT:
    return { ...state, unstakeAmt: action.data };
  case PATREOS_ACTIONS.UPDATE_FOLLOW_ACCOUNT_STR:
    return { ...state, followAccountStr: action.data };
  case PATREOS_ACTIONS.UPDATE_CREATOR_NAME_STR:
    return { ...state, creatorNameStr: action.data };
  case PATREOS_ACTIONS.UPDATE_CREATOR_DESCRIPTION_STR:
    return { ...state, creatorDescriptionStr: action.data };
  case PATREOS_ACTIONS.UPDATE_CREATOR_BANNER_STR:
    return { ...state, creatorBannerStr: action.data };
  case PATREOS_ACTIONS.UPDATE_CREATOR_IMAGE_STR:
    return { ...state, creatorImageStr: action.data };
  case PATREOS_ACTIONS.UPDATE_PUBLICATION_TITLE_STR:
    return { ...state, publicationTitleStr: action.data };
  case PATREOS_ACTIONS.UPDATE_PUBLICATION_DESCRIPTION_STR:
    return { ...state, publicationDescriptionStr: action.data };
  case PATREOS_ACTIONS.UPDATE_PUBLICATION_URL_STR:
    return { ...state, publicationUrlStr: action.data };
  case PATREOS_ACTIONS.UPDATE_PUBLICATION_IMAGE_STR:
    return { ...state, publicationImageStr: action.data };
  case PATREOS_ACTIONS.UPDATE_PLEDGE_TOKEN_SYMBOL_STR:
    return { ...state, pledgeTokenSymbolStr: action.data };
  case PATREOS_ACTIONS.UPDATE_PLEDGE_TOKEN_CONTRACT_STR:
    return { ...state, pledgeTokenContractStr: action.data };
  case PATREOS_ACTIONS.UPDATE_PLEDGE_TO_ACCOUNT_STR:
    return { ...state, pledgeToAccountStr: action.data };
  case PATREOS_ACTIONS.UPDATE_PLEDGE_AMT:
    return { ...state, pledgeAmt: action.data };
  case PATREOS_ACTIONS.UPDATE_PLEDGE_CYCLE_NUM:
    return { ...state, pledgeCycleNum: action.data };
  case PATREOS_ACTIONS.UPDATE_PLEDGES_RECEIVED_ARR:
    return { ...state, pledgesReceivedArr: action.data };
  case PATREOS_ACTIONS.UPDATE_PLEDGES_GIVEN_ARR:
    return { ...state, pledgesGivenArr: action.data };
  default:
    return state;
  }
};
