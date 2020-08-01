/** @format */

import { CHANGE_LANG } from '../types';

const defaultState = {
  lang: 'en',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LANG:
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};
