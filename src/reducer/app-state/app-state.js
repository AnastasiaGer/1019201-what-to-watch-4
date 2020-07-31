import {ALL_GENRES, MAX_SHOWN_MOVIES_LIKE_THIS, PageNames, emptyMovie} from "../../const";
import {extend} from '../../utils/utils';


const initialState = {
  activeGenre: ALL_GENRES,
  currentMovie: emptyMovie,
  cardsToShow: MAX_SHOWN_MOVIES_LIKE_THIS,
  isVideoPlayer: false,
  currentPage: PageNames.MAIN,
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  PLAY_MOVIE: `PLAY_MOVIE`,
  STOP_MOVIE: `STOP_MOVIE`,
  ADD_REVIEW: `ADD_REVIEW`,
  SET_CURRENT_MOVIE: `SET_CURRENT_MOVIE`,
};

const ActionCreator = {
  changeFilter: (activeGenre) => ({
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: activeGenre,
  }),
  setCurrentMovie: (movie) => {
    return {
      type: ActionType.SET_CURRENT_MOVIE,
      payload: movie,
    };
  },
  addReview: () => {
    return {
      type: ActionType.ADD_REVIEW,
      payload: PageNames.ADD_REVIEW,
    };
  },
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
    case (ActionType.PLAY_MOVIE):
      return extend(state, {
        isVideoPlayer: action.payload,
      });
    case ActionType.SET_CURRENT_MOVIE:
      return extend(state, {
        currentMovie: action.payload,
      });
    case (ActionType.STOP_MOVIE):
      return extend(state, {
        isVideoPlayer: action.payload,
      });
    case ActionType.ADD_REVIEW:
      return extend(state, {
        currentPage: action.payload,
      });
  }

  return state;
};

export {initialState, reducer, ActionType, ActionCreator};
