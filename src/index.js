import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {Movie, movies} from './mocks/movies.js';

const root = document.querySelector(`#root`);

ReactDOM.render(
    <App
      promoMovie={Movie}
      movies={movies} />,
    root
);
