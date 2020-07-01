import PropTypes from 'prop-types';

export const CustomPropTypes = {
  MOVIE: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    rating: PropTypes.number.isRequired,
    scores: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    videoUrl: PropTypes.string.isRequired,
    movieDurationTime: PropTypes.string.isRequired,
  }),
  REVIEWS: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }))
};
