export const createMovie = (movie) => {
  return {
    title: movie.name,
    genre: movie.genre,
    date: movie.released,
    background: movie.background_image,
    poster: movie.preview_image,
    id: movie.id,
    description: movie.description,
    rating: movie.rating,
    votes: movie.scores_count,
    director: movie.director,
    starring: movie.starring,
    runTime: movie.run_time,
    preview: movie.preview_video_link,
    videoUrl: movie.video_link,
    isFavorite: movie.is_favorite,
    backgroundColor: movie.background_color,
  };
};
