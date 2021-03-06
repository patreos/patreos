// THIS IS GENERATED BY generate_reducers.mjs.  DO NOT MAKE CHANGES.

import { CREATOR_ACTIONS } from '../constants/action_types'

export default (
  state = {
    creatorCurrentNameStr: '',
    creatorCurrentDescriptionStr: '',
    creatorCurrentBannerStr: '',
    creatorCurrentImageStr: '',
    creatorNameStr: '',
    creatorDescriptionStr: '',
    creatorBannerStr: '',
    creatorImageStr: '',
    creatorSocialMediaArr: [],
    creatorPublicationTitleStr: '',
    creatorPublicationDescriptionStr: '',
    creatorPublicationUrlStr: '',
    creatorPublicationImageStr: '',
    creatorExists: undefined,
  }, action) => {
  switch (action.type) {
  case CREATOR_ACTIONS.UPDATE_CREATOR_CURRENT_NAME_STR:
    return { ...state, creatorCurrentNameStr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_CURRENT_DESCRIPTION_STR:
    return { ...state, creatorCurrentDescriptionStr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_CURRENT_BANNER_STR:
    return { ...state, creatorCurrentBannerStr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_CURRENT_IMAGE_STR:
    return { ...state, creatorCurrentImageStr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_NAME_STR:
    return { ...state, creatorNameStr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_DESCRIPTION_STR:
    return { ...state, creatorDescriptionStr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_BANNER_STR:
    return { ...state, creatorBannerStr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_IMAGE_STR:
    return { ...state, creatorImageStr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_SOCIAL_MEDIA_ARR:
    return { ...state, creatorSocialMediaArr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_PUBLICATION_TITLE_STR:
    return { ...state, creatorPublicationTitleStr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_PUBLICATION_DESCRIPTION_STR:
    return { ...state, creatorPublicationDescriptionStr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_PUBLICATION_URL_STR:
    return { ...state, creatorPublicationUrlStr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_PUBLICATION_IMAGE_STR:
    return { ...state, creatorPublicationImageStr: action.data };
  case CREATOR_ACTIONS.UPDATE_CREATOR_EXISTS:
    return { ...state, creatorExists: action.data };
  default:
    return state;
  }
};
