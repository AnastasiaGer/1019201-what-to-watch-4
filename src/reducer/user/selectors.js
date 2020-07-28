import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};
export const getErrMessage = (state) => {
  return state[NAME_SPACE].message;
};

export const getAuthorizationError = (state) => {
  return state[NAME_SPACE].authorizationError;
};

export const getAuthorInfo = (state) => {
  return state[NAME_SPACE].userInfo;
};
