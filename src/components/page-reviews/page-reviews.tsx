import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Review from '../review/review';

import {CustomPropTypes} from '../../utils/props';
import {sliceReviews} from '../../utils/utils';

import {getMovieReviews} from '../../reducer/data/selectors';

const PageReviews = ({movieReviews}) => {
  const slicedReviews = sliceReviews(movieReviews);

  return (
    <React.Fragment>
      <div className="movie-card__reviews movie-card__row">
        {slicedReviews.map((slicedReview, index) => {
          return (
            <div key={Math.random() + index} className="movie-card__reviews-col">
              {slicedReview.map((review) => <Review movieReview={review} key={Math.random() + review.id} />)}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};
PageReviews.propTypes = {
  movieReviews: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(CustomPropTypes.REVIEWS),
    PropTypes.bool,
  ]),
};

const mapStateToProps = (state) => ({
  movieReviews: getMovieReviews(state)
});
export default connect(mapStateToProps)(PageReviews);

