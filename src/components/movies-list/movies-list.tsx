import * as React from 'react';

import {MovieType} from "../../types";

import SmallMovieCard from '../small-movie-card/small-movie-card';

import withVideo from "../../hocs/with-video";

const SmallMovieCardWrapped = withVideo(SmallMovieCard);

interface Props {
  movies: Array<MovieType>;
  render?: () => JSX.Element;
  handleSmallMovieCardHover(): void;
}

const MoviesList: React.FC<Props> = (props: Props) => {

  const {movies, handleSmallMovieCardHover, render} = props;

  return (
    <React.Fragment>
      <div className="catalog__movies-list">
        {movies.map((movie) => {
          return (
            <SmallMovieCardWrapped
              key={movie.id}
              movie={movie}
              handleSmallMovieCardHover={handleSmallMovieCardHover}
            />
          );
        })}
      </div>
      {render()}
    </React.Fragment>
  );
};

export default MoviesList;
