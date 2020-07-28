import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {ErrorMsg} from './error-msg.jsx';

const mockStore = configureStore([]);

describe(`ErrorMsg test`, () => {
  it(`ErrorMsg component should render correctly`, () => {
    const store = mockStore({
      ERROR: {
        message: ``,
        show: false,
      },
    });
    const tree = renderer
    .create(
        <Provider store={store}>
          <ErrorMsg
            errMessage={`Error 401. Unauthorized status`}
          />)
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
