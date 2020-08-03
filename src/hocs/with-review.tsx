import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operations as DataOperations} from '../reducer/data/data';
import {getCurrentMovieById} from '../reducer/app-state/selectors';
import {CustomPropTypes} from '../utils/props';
import {ReviewLength} from '../const';
import {getIsReviewSending, getIsDispatchError} from '../reducer/data/selectors';

const withReview = (Component) => {
  class WithReview extends React.PureComponent {
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
      const {isDataSending} = this.props;

      this.setState({
        comment: evt.target.value,
        isSubmitDisabled: evt.target.value.length < ReviewLength.MIN || isDataSending,
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
    isDataSending: PropTypes.bool.isRequired,
    isDispatchError: PropTypes.bool.isRequired,
    onReviewSubmit: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state, ownProps) => ({
    currentMovie: getCurrentMovieById(state, ownProps),
    isDataSending: getIsReviewSending(state),
    isDispatchError: getIsDispatchError(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onReviewSubmit(movieId, review) {
      dispatch(DataOperations.pushReview(movieId, review));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
