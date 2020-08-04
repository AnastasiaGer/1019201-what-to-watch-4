import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {GenresList} from './genres-list';
import {genres, noop} from '../../test-data';

describe(`GenresList`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <GenresList
            genres={genres}
            activeGenre={`All genres`}
            onGenreItemClick={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
