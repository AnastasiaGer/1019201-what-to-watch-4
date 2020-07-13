import React, {PureComponent} from 'react';

const withActiveCard = (Component) => {
  class WithActiveCard extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: {},
      };

      this._setActiveCard = this._setActiveCard.bind(this);
    }

    _setActiveCard(activeCard) {
      this.setState({
        activeCard
      });
    }

    render() {
      const {activeCard} = this.state;

      return <Component
        {...this.props}
        activeCard={activeCard}
        setActiveCard={this._setActiveCard}
      />;
    }
  }

  WithActiveCard.propTypes = {};

  return WithActiveCard;
};

export default withActiveCard;
