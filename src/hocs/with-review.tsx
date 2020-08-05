import * as React from 'react';
import {connect} from 'react-redux';
import {Operations as DataOperations, ActionCreator} from '../reducer/data/data';
import {getCurrentMovieById} from '../reducer/app-state/selectors';
import {ReviewLength} from '../const';
import {getIsReviewSending, getIsDispatchError} from '../reducer/data/selectors';
import {MovieType} from '../types'
interface Props {
  onReviewSubmit(movieId: number, review: {
    rating: number;
    comment: string;
  }): void;
  isDataSending: boolean;
  clearSendingError(): void;
  currentMovie: MovieType;
}

interface State {
  comment: string;
  rating: number;
  isSubmitDisabled: boolean;
}

const withReview = (Component) => {
  class WithReview extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        rating: 5,
        comment: ``,
        isSubmitDisabled: true,
      };

      this.handleFormChange = this.handleFormChange.bind(this);
      this.handleSubmitClick = this.handleSubmitClick.bind(this);
      this.handleReviewChange = this.handleReviewChange.bind(this);
      this.handleRatingChange = this.handleRatingChange.bind(this);
    }

    private handleFormChange() {
      const {clearSendingError} = this.props;
      clearSendingError();
    }

    private handleRatingChange(evt) {
      this.setState({
        rating: evt.target.value,
      });
    }

    private handleReviewChange(evt) {
      const {isDataSending} = this.props;

      this.setState({
        comment: evt.target.value,
        isSubmitDisabled: evt.target.value.length < ReviewLength.MIN || isDataSending,
      });
    }

    private handleSubmitClick(evt) {
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
          onFormChange={this.handleFormChange}
          onSubmitClick={this.handleSubmitClick}
          onRatingChange={this.handleRatingChange}
          onReviewChange={this.handleReviewChange}
          isSubmitDisabled={this.state.isSubmitDisabled}
        />
      );
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    currentMovie: getCurrentMovieById(state, ownProps),
    isDataSending: getIsReviewSending(state),
    isDispatchError: getIsDispatchError(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onReviewSubmit(movieId, review) {
      dispatch(DataOperations.pushReview(movieId, review));
    },
    clearSendingError() {
      dispatch(ActionCreator.clearSendingError());
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
