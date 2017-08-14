import React from 'react';
import './save-button.css';

export default class Load extends React.Component {

  async componentWillReceiveProps() {
    const {} = this.props;

  }

render() {
    return (
      <button className="button-style" onClick={this.props.loadGame}>Load Game</button>
      )
  }
}