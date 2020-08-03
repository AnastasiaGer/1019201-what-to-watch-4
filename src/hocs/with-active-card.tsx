import * as React from 'react';

interface State {
  activeCard: boolean;
}

interface InjectedProps {
  activeCard: boolean;
  setActiveCard: (activeCard: boolean) => void;
}

const withActiveCard = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  class WithActiveCard extends React.PureComponent<P, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: false,
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

  return WithActiveCard;
};

export default withActiveCard;
