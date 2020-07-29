import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operations as DataOperations} from '../reducer/data/data.js';
import {getCurrentMovie} from '../reducer/app-state/selectors.js';
import {CustomPropTypes} from '../utils/props';
import {ReviewLength} from '../const';

import {getLoadingDataStatus, getErrorLoadingDataStatus} from '../reducer/data/selectors.js';

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 5,
        comment: ``,
        isSubmitDisabled: true,
      };

      this._handleSubmitClick = this._handleSubmitClick.bind(this);
      this._handleReviewChange = this._handleReviewChange.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
    }

    _handleRatingChange(evt) {
      this.setState({
        rating: evt.target.value,
      });
    }

    _handleReviewChange(evt) {
      const {isReviewSending} = this.props;

      this.setState({
        comment: evt.target.value,
        isSubmitDisabled: evt.target.value.length < ReviewLength.MIN || isReviewSending,
      });
    }

    _handleSubmitClick(evt) {
      const {currentMovie, onReviewSubmit} = this.props;
      const review = {
        rating: this.state.rating,
        comment: this.state.comment,
      };

      evt.preventDefault();
      onReviewSubmit(currentMovie.id, review);
    }

    render() {
      const {currentMovie} = this.props;

      return (
        <Component
          {...this.props}
          currentMovie={currentMovie}
          onSubmitClick={this._handleSubmitClick}
          onRatingChange={this._handleRatingChange}
          onReviewChange={this._handleReviewChange}
          isSubmitDisabled={this.state.isSubmitDisabled}
        />
      );
    }
  }

  WithReview.propTypes = {
    currentMovie: CustomPropTypes.MOVIE,
    isReviewSending: PropTypes.bool.isRequired,
    isSendingError: PropTypes.bool.isRequired,
    onReviewSubmit: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    currentMovie: getCurrentMovie(state),
    isReviewSending: getLoadingDataStatus(state),
    isSendingError: getErrorLoadingDataStatus(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onReviewSubmit(movieId, review) {
      dispatch(DataOperations.pushReview(movieId, review));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
