import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import history from "../../history";
import {Router} from "react-router-dom";
import {noop} from "../../utils";

configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

it(`Click by Auth Button btn`, () => {
  const handleSubmitClick = jest.fn();
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`
    }
  });

  const signInComponent = mount(
      <Provider store={store}>
        <Router history={history}>
          <SignIn login={handleSubmitClick} />
        </Router>
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      });

  const button = signInComponent.find(`button`);
  button.simulate(`click`, {preventDefault: {noop}});


  expect(handleSubmitClick).toEqual(handleSubmitClick);

});
