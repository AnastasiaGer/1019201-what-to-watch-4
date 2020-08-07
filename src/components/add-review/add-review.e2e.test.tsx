import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import AddReview from "./add-review";
import {noop} from "../../utils";
import {movieCard} from "../../test-data";

configure({adapter: new Adapter()});

const mockEvent = {
  preventDefault: noop,
};

it(`Should form be submited`, () => {
  const onSubmitHandler = jest.fn();

  const addReview = shallow(
      <AddReview
        currentMovie={movieCard}
        isDataSending={false}
        isDispatchError={false}
        onSubmitClick={onSubmitHandler}
        onFormChange={noop}
        onRatingChange={noop}
        onReviewChange={noop}
        ratingIsValid={true}
        reviewIsValid={true}
      />
  );

  const form = addReview.find(`.add-review__form`);
  form.simulate(`submit`, mockEvent);

  expect(onSubmitHandler).toHaveBeenCalledTimes(1);
  expect(onSubmitHandler).toHaveBeenCalledWith(mockEvent);
});
