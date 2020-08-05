import * as React from 'react';
import PageHeader from '../page-header/page-header';
import {ReviewLength, reviewSubmitButton, NUMBER_OF_RATINGS} from '../../const';
import {PageNames, AppRoute} from "../../const";
import {Link} from 'react-router-dom';
import {MovieType} from '../../types';

interface Props {
  currentMovie: MovieType;
  isDataSending: boolean,
  isDispatchError: boolean,
  onSubmitClick(): void;
  onFormChange(): void;
  onRatingChange(): void;
  onReviewChange(): void;
  isSubmitDisabled: boolean,
}

const AddReview : React.FunctionComponent<Props> = (props: Props) => {
  const {currentMovie, isDataSending, isDispatchError, onSubmitClick, onFormChange, onRatingChange, onReviewChange, isSubmitDisabled} = props;
  const {backgroundColor, title, background, poster} = currentMovie;

  const isValidReview = Boolean(isDataSending);

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
                        disabled={isValidReview}
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
                  disabled={isDataSending || isValidReview || isSubmitDisabled}
                >
                  {isDataSending ? reviewSubmitButton.sending : reviewSubmitButton.post}
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

export default AddReview;
