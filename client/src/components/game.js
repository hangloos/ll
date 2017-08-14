import React from 'react';
import PropTypes from 'prop-types';

import Board from './board';
import Reset from './reset';
import Load from './load';

export default class Game extends React.Component {
	static propTypes = {
		game_id: PropTypes.any.isRequired
	};

  async componentWillReceiveProps() {

  }

  handleReset() {
    this.props.reset()
  }

  handleLoad() {
    this.props.load()
  }

	render() {
		return (
    <div>
    <Board  id={this.props.game_id} 
    length={3} 
    winner_boolean={false} 
    winning_combinations={[
    ["first_row first_col", "first_row", "first_row last_col"],
    ["first_col", "middle", "last_col"],
    ["last_row first_col", "last_row", "last_row last_col"],
    ["first_row first_col", "first_col", "last_row first_col"],
    ["first_row", "middle", "last_row"],
    ["first_row last_col", "last_col", "last_row last_col"],
    ["first_row first_col", "middle", "last_row last_col"], 
    ["first_row last_col", "middle", "last_row first_col"]]}
    turn_count={0}
    fullboard={false}
    winner={null}
    player={"X"}

    />

    <Reset resetGame={this.handleReset.bind(this)}/>
    <Load loadGame={this.handleLoad.bind(this)}/>
    </div>
    )
	}
}
