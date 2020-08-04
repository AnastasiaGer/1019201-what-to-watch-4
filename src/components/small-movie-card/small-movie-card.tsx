import * as React from 'react';
import {MovieType} from "../../types";
import VideoPlayer from '../video-player/video-player';

import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

interface Props {
  movie: MovieType;
  isPlaying: boolean,
  setPlayingFilm: (b: boolean) => boolean;
}

const SmallMovieCard: React.FC<Props> = (props: Props) => {
  const {movie, isPlaying, setPlayingFilm} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => setPlayingFilm(true)}
      onMouseLeave={() => setPlayingFilm(false)}
    >
      <Link
        className="small-movie-card__link"
        to={`${AppRoute.MOVIE_PAGE}/${movie.id}`}>
        <div
          className="small-movie-card__image">
          <VideoPlayer
            movie={movie}
            isPlaying={isPlaying}
            src={movie.preview}
            poster={movie.picture}
          />
          <img src={movie.poster} alt={movie.title} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">{movie.title}</h3>
      </Link>
    </article>
  );
};

export default SmallMovieCard;

