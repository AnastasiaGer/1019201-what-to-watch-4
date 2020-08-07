import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ShowMoreButton from './show-more-btn';

const handleButtonClick = jest.fn();
describe(`ShowMoreButton`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(<ShowMoreButton
        onShowMoreClick={handleButtonClick}
      />)
          .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
