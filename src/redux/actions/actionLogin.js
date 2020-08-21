import hashMD5 from "../../services/md5";

export const NAME = 'NAME';
export const EMAIL = 'EMAIL';
export const IS_LOGGED = 'IS_LOGGED';

export const actionNameInput = (payload) => ({
  type: NAME,
  payload,
});

export const actionEmailInput = (payload) => ({
  type: EMAIL,
  payload,
  gravatar: hashMD5(payload),
});

export const actionIsLogged = (payload) => ({
  type: IS_LOGGED,
  payload,
});
