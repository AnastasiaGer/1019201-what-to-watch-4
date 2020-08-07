import * as React from 'react';
import {MovieType} from "../../types";
import VideoPlayer from '../video-player/video-player';

import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

interface Props {
  movie: MovieType;
  isPlaying: boolean;
  handlePlayFilm: (b: boolean) => void;
}

const SmallMovieCard: React.FC<Props> = (props: Props) => {
  const {movie, isPlaying, handlePlayFilm} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => handlePlayFilm(true)}
      onMouseLeave={() => handlePlayFilm(false)}
    >
      <Link
        className="small-movie-card__link"
        to={`${AppRoute.MOVIE_PAGE}/${movie.id}`}>
        <div
          className="small-movie-card__image">
          <VideoPlayer
            isPlaying={isPlaying}
            source={movie.preview}
            poster={movie.poster}
          />
          <img src={movie.poster} alt={movie.title} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">{movie.title}</h3>
      </Link>
    </article>
  );
};

export default SmallMovieCard;

