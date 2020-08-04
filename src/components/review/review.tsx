import * as React from 'react';
import * as moment from 'moment';
import {ReviewType} from "../../types";
import {getRatingFormat} from '../../utils';

interface Props {
  movieReview: ReviewType;
}


const Review: React.FC<Props> = (props: Props) => {
  const {movieReview} = props;

  const rating = getRatingFormat(movieReview.rating);
  const date = moment(movieReview.date).format(`MMMM D, YYYY`);
  const dateToISO = moment(movieReview.date).format(`YYYY-MM-DD`);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{movieReview.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{movieReview.user.name}</cite>
          <time className="review__date" dateTime={dateToISO}>{date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

export default Review;
