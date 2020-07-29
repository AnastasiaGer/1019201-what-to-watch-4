import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../page-header/page-header.jsx';
import {CustomPropTypes} from '../../utils/props.js';
import {ReviewLength, reviewSubmitButton} from '../../const';

const AddReview = ({currentMovie, isReviewSending, isSendingError, onSubmitClick, onFormChange, onRatingChange, onReviewChange, isSubmitDisabled}) => {
  const {backgroundColor, title, background, poster, rating} = currentMovie;
  const isRadioDisabled = isReviewSending ? true : false;

  return (
    <React.Fragment>
      <section
        className="movie-card movie-card--full"
        style={{backgroundColor}}
      >
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={background} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <PageHeader />

          <div className="movie-card__poster movie-card__poster--small">
            <img src={poster} alt={title} width="218" height="327" />
          </div>
        </div>

        {rating === 0 ?
          <div
            style={{
              position: `absolute`,
              color: `red`,
              top: `27%`,
              left: `46%`}}
          >
            Сhoose a rating
          </div> : ``}

        <div className="add-review">
          <form
            action="#"
            className="add-review__form"
            onSubmit={onSubmitClick}
            onChange={onFormChange}
          >
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"
                  disabled={isRadioDisabled} onChange={onRatingChange}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2"
                  disabled={isRadioDisabled} onChange={onRatingChange}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
                  disabled={isRadioDisabled} onChange={onRatingChange}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4"
                  disabled={isRadioDisabled} onChange={onRatingChange}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
                  disabled={isRadioDisabled} onChange={onRatingChange}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>
            <div
              className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"
                minLength={ReviewLength.MIN}
                maxLength={ReviewLength.MAX}
                onChange={onReviewChange}
                required
              ></textarea>
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled={isSubmitDisabled}
                >
                  {isReviewSending ? reviewSubmitButton.sending : reviewSubmitButton.post}
                </button>
              </div>

            </div>
          </form>
          {isSendingError &&
            <p style={{color: `red`}}>Error while sending data. Please, try again later.</p>
          }
        </div>
      </section>
    </React.Fragment>
  );
};

AddReview.propTypes = {
  currentMovie: CustomPropTypes.MOVIE,
  isReviewSending: PropTypes.bool,
  isSendingError: PropTypes.bool,
  onSubmitClick: PropTypes.func,
  onFormChange: PropTypes.func,
  onRatingChange: PropTypes.func,
  onReviewChange: PropTypes.func,
  isSubmitDisabled: PropTypes.bool,
  rating: PropTypes.number,
};

export default AddReview;
