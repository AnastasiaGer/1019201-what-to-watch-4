import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";

const Settings = {
  currentTab: `overview`
};

it(`Should Tabs render correctly`, () => {
  const tree = renderer
    .create(<Tabs
      onLinkClickHandler={() => {}}
      currentTab={Settings.currentTab}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
