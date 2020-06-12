import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app.jsx";

const Movie = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  DATE: `2014`,
};

const root = document.querySelector(`#root`);

ReactDOM.render(
    <App
      movieTitle={Movie.TITLE}
      movieGenre={Movie.GENRE}
      movieDate={Movie.DATE} />,
    root
);
