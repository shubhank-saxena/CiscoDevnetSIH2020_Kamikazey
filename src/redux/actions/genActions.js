import { CHANGE_LANG } from '../types';

export const changeLang = lang => {
  return {
    type: CHANGE_LANG,
    payload: lang,
  };
};
