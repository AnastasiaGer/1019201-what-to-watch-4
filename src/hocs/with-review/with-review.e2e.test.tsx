import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withReview from "./with-review";
import history from "../../history";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureMockStore from 'redux-mock-store';
import {adaptMovie, adaptMovies} from "../../adapters/movie";
import thunk from "redux-thunk";
import {movieCard as movie, movies} from '../../test-data';

const mockStore = configureMockStore([thunk]);

jest.mock(`../../reducer/data/data`, () => ({
  __esModule: true,
  default: `mockedDefaultExport`,
  Operation: jest.fn(),
}));

const store = mockStore({
  data: {movies: adaptMovies(movies), promoMovie: adaptMovie(movie)},
  application: {activeGenre: `All genres`},
  user: {user: {avatarURL: `img/1.png`}},
});

const MockComponent = () => <div/>;
const WrappedMockComponent = withReview(MockComponent);

configure({adapter: new Adapter()});

test(`onReviewSubmit called by handleSubmitClick`, () => {
  const api = {post: null};
  const onReviewSubmit = jest.fn().mockImplementationOnce(() => Promise.resolve(``));
  const wrapper = shallow(
      <Provider store={store}>
        <Router history={history}>
          <WrappedMockComponent
            onReviewSubmit={onReviewSubmit}
            currentMovie={movie}
            store={store}
            match={{params: {id: 1}}}
            api={api}
          />
        </Router>
      </Provider>
  );

  expect(onReviewSubmit).toEqual(onReviewSubmit);
});
