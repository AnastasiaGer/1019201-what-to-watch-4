import * as React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../page-header/page-header';
import {CustomPropTypes} from '../../utils/props';
import {ReviewLength, reviewSubmitButton, NUMBER_OF_RATINGS} from '../../const';
import {PageNames, AppRoute} from "../../const";
import {Link} from 'react-router-dom';

const AddReview = ({currentMovie, isReviewSending, isDispatchError, onSubmitClick, onFormChange, onRatingChange, onReviewChange, isSubmitDisabled}) => {
  const {backgroundColor, title, background, poster} = currentMovie;
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

          <PageHeader currentPage={PageNames.ADD_REVIEW}
          >
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link
                    to={`${AppRoute.MOVIE_PAGE}/${currentMovie.id}`}
                    className="breadcrumbs__link">{currentMovie.title}
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
          </PageHeader>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={poster} alt={title} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form
            action="#"
            className="add-review__form"
            onSubmit={onSubmitClick}
            onChange={onFormChange}
          >
            <div className="rating">
              <div
                className="rating__stars"
                onChange={onRatingChange}>
                {Array.from(Array(NUMBER_OF_RATINGS)).map((_, index) => {
                  const rating = index + 1;
                  return (
                    <React.Fragment key={rating}>
                      <input
                        className="rating__input"
                        id={`star-${rating}`}
                        type="radio"
                        name="rating"
                        value={rating}
                        disabled={isRadioDisabled}
                      />
                      <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
                    </React.Fragment>
                  );
                })}
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
          {isDispatchError &&
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
  isDispatchError: PropTypes.bool,
  onSubmitClick: PropTypes.func,
  onFormChange: PropTypes.func,
  onRatingChange: PropTypes.func,
  onReviewChange: PropTypes.func,
  isSubmitDisabled: PropTypes.bool,
};

export default AddReview;
