import {ALL_GENRES, MAX_SHOWN_MOVIES_LIKE_THIS, PageNames} from "../../const";
import {extend} from '../../utils/utils';

const emptyMovie = {
  title: `Loading...`,
  genre: ``,
  date: 0,
  background: ``,
  poster: ``,
  id: 0,
  description: ``,
  rating: 0,
  votes: 0,
  director: ``,
  starring: [],
  runTime: 0,
  preview: ``,
  videoLink: ``,
  isFavorite: false,
  backgroundColor: ``,
};

const initialState = {
  activeGenre: ALL_GENRES,
  currentMovie: emptyMovie,
  cardsToShow: MAX_SHOWN_MOVIES_LIKE_THIS,
  isVideoPlayer: false,
  currentPage: PageNames.MAIN,
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  CHANGE_MOVIE_CARD: `CHANGE_MOVIE_CARD`,
  PLAY_MOVIE: `PLAY_MOVIE`,
  STOP_MOVIE: `STOP_MOVIE`,
  GO_TO_MOVIE_PAGE: `GO_TO_MOVIE_PAGE`,
  GO_TO_SIGN_IN_PAGE: `GO_TO_SIGN_IN_PAGE`,
  GO_TO_MAIN_PAGE: `GO_TO_MAIN_PAGE`,
  ADD_REVIEW: `ADD_REVIEW`,
};

const ActionCreator = {
  changeFilter: (activeGenre) => ({
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: activeGenre,
  }),
  goToMoviePage: () => {
    return {
      type: ActionType.GO_TO_MOVIE_PAGE,
      payload: PageNames.MOVIE_DETAILS,
    };
  },
  goToMainPage: () => {
    return {
      type: ActionType.GO_TO_MAIN_PAGE,
      payload: PageNames.MAIN,
    };
  },
  addReview: () => {
    return {
      type: ActionType.ADD_REVIEW,
      payload: PageNames.ADD_REVIEW,
    };
  },

  goToSignInPage: () => {
    return {
      type: ActionType.GO_TO_SIGN_IN_PAGE,
      payload: PageNames.SIGN_IN,
    };
  },
  changeMovieCard: (movie) => ({
    type: ActionType.CHANGE_MOVIE_CARD,
    payload: movie,
  }),
  playFullMovie: (isVideoPlayer) => ({
    type: ActionType.PLAY_MOVIE,
    payload: isVideoPlayer,
  }),
  closeFulMovie: (isVideoPlayer) => ({
    type: ActionType.STOP_MOVIE,
    payload: isVideoPlayer,
  }),
};

const reducer = (state = extend(initialState), action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:
      return extend(state, {
        activeGenre: action.payload,
      });
    case (ActionType.CHANGE_MOVIE_CARD):
      return extend(state, {
        currentMovie: action.payload,
      });
    case (ActionType.PLAY_MOVIE):
      return extend(state, {
        isVideoPlayer: action.payload,
      });
    case ActionType.GO_TO_SIGN_IN_PAGE:
      return extend(state, {
        currentPage: action.payload,
      });
    case ActionType.GO_TO_MAIN_PAGE:
      return extend(state, {
        currentPage: action.payload,
      });
    case (ActionType.STOP_MOVIE):
      return extend(state, {
        isVideoPlayer: action.payload,
      });
    case ActionType.GO_TO_MOVIE_PAGE:
      return extend(state, {
        currentPage: action.payload,
      });
    case ActionType.ADD_REVIEW:
      return extend(state, {
        currentPage: action.payload,
      });
  }

  return state;
};

export {initialState, reducer, ActionType, ActionCreator};
