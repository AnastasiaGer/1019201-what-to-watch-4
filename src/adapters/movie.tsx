export const adaptMovie = (movie) => {
  return {
    id: movie.id,
    title: movie.name,
    genre: movie.genre,
    date: movie.released,
    background: movie.background_image,
    poster: movie.poster_image,
    picture: movie.preview_image,
    description: movie.description,
    rating: movie.rating,
    scores: movie.scores_count,
    director: movie.director,
    starring: movie.starring,
    movieDurationTime: movie.run_time,
    preview: movie.preview_video_link,
    videoLink: movie.video_link,
    isFavorite: movie.is_favorite,
    backgroundColor: movie.background_color,
  };
};

export const adaptMovies = (movies) => movies.map((movie) => adaptMovie(movie));
