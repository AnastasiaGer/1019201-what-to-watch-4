import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Tabs from "./tabs";
import {noop} from '../..//test-data';

const Settings = {
  currentTab: `overview`
};

it(`Should Tabs render correctly`, () => {
  const tree = renderer
    .create(<Tabs
      onTabClick={noop}
      activeTab={Settings.currentTab}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
