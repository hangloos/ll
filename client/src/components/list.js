import React from 'react';

import Board from './board'
export default class List extends React.Component {

  constructor(props) {
    super(props)
  }

  showGame(game) {
    // debugger
    // return <Board  id={game.id} 
    // length={3} 
    // winner_boolean={game.winner_boolean} 
    // winning_combinations={game.winning_combinations}
    // turn_count={game.turn_count}
    // fullboard={game.fullboard}
    // winner={game.winner}
    // player={game.player}

    // />

    window.location = '/game/' + game.id
  }


  render() {
    return (
      <div>
      
      <button className="button-style" onClick={this.showGame.bind(this, this.props.game)}>{this.props.id} - 
      {this.props.game.winner_boolean || this.props.game.fullboard ? 'Closed' : 'Open'}</button>
      </div>
    );
  }

}