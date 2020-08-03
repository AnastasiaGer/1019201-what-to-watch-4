import * as React from 'react';

const withActiveCard = (Component) => {
  class WithActiveCard extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: null,
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
