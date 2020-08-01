import React from 'react';
import renderer from 'react-test-renderer';
import {GenresList} from './genres-list';
import {movies} from '../../utils/test-data';

const Settings = {
  activeFilter: `Action`,
  genres: [`All genres`].concat(Array.from(new Set(movies.map((movie) => movie.genre))))
};

describe(`GenresList`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <GenresList
            genres={Settings.genres}
            currentActiveGenre={Settings.activeFilter}
            onGenreClick={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
