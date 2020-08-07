import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {GenresList} from './genres-list';
import {genres} from '../../test-data';
import {noop} from '../../utils';

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
