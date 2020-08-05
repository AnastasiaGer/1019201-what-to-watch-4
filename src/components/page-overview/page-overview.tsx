import * as React from 'react';
import {MovieType} from "../../types";
import {getMovieRatingDescription} from '../../utils.js';

interface Props {
  currentMovie: MovieType;
}

const PageOverview: React.FC<Props> = (props: Props) => {
  const {currentMovie}= props;
  const {rating, scores, description, director, starring} = currentMovie;
  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getMovieRatingDescription(rating)}</span>
          <span className="movie-rating__count">{scores} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>
        <p className="movie-card__director"><strong>Director: {director}</strong></p>
        <p className="movie-card__starring"><strong>Starring: {starring}</strong></p>
      </div>
    </>
  );
};

export default PageOverview;
