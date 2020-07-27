import React from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../../utils/props.js';
import Review from '../review/review.jsx';
import {sliceReviews} from '../../utils/utils';

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
export default PageReviews;
