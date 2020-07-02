import React, {PureComponent} from 'react';

import Tabs from '../components/tabs/tabs.jsx';

const withTabs = (Component) => {
  class WithTabs extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: `Overview`,
      };

      this._getTabs = this._getTabs.bind(this);
      this._handleTabClick = this._handleTabClick.bind(this);
    }

    _getTabs() {
      const {activeTab} = this.state;

      return (
        <Tabs
          activeTab={activeTab}
          onTabClick={this._handleTabClick}
        />
      );
    }

    _handleTabClick(currentTab) {
      this.setState({
        activeTab: currentTab
      });
    }

    render() {
      const {activeTab} = this.state;

      return <Component
        {...this.props}
        renderTabs={this._getTabs}
        activeTab={activeTab}
      />;
    }
  }

  return WithTabs;
};

export default withTabs;
