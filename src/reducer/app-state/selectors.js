import NameSpace from '../name-space';

export const getCurrentPage = (state) => state[NameSpace.APP_STATE].currentPage;

export const getCurrentMovie = (state) => state[NameSpace.APP_STATE].currentMovie;

export const getIsMoviePlayerActive = (state) => state[NameSpace.APP_STATE].isVideoPlayer;

export const getActiveGenre = (state) => state[NameSpace.APP_STATE].activeGenre;
