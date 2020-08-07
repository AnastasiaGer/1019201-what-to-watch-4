import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

export const getAuthorizationProgress = (state) => {
  return state[NAME_SPACE].isAuthorizationProgress;
};
export const getErrMessage = (state) => {
  return state[NAME_SPACE].message;
};

export const getAuthorizationError = (state) => {
  return state[NAME_SPACE].isAuthorizationError;
};

export const getUserInfo = (state) => {
  return state[NAME_SPACE].userInfo;
};
