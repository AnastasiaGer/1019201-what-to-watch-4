import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';
import {CustomPropTypes} from '../../utils/props.js';

export default class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null
    };

    this._handleSmallMovieCardHover = this._handleSmallMovieCardHover.bind(this);
  }

  _handleSmallMovieCardHover(movie) {
    this.setState({
      activeCard: movie,
    });
  }

  render() {
    const {movies, onMovieCardClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => {
          return (
            <SmallMovieCard
              key={movie.id}
              movie={movie}
              onMovieCardClick={onMovieCardClick}
              onMovieCardHover={this._handleSmallMovieCardHover}
            />
          );
        })}
      </div>
    );
  }
}


MoviesList.propTypes = {
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  onMovieCardClick: PropTypes.func,
};
