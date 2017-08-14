import React from 'react';
import PropTypes from 'prop-types';

import Board from './board';
import Reset from './reset';
import List from './list';

import axios from 'axios'
import createFragment from 'react-addons-create-fragment';


export default class Home extends React.Component {

  state = {
  }

  constructor(...args) {
    super(...args);

    this.state = {
      games: []
    };
  }

  componentWillMount() {
    
    this.updateData().then((result) => {
      let games = Object.keys(result.data.games).map(key => {
        return  result.data.games[key]
      })

        console.log(games, "componentWillMount")
        this.setState({games: games})
      }, this)

  }

  updateData() {
    return axios.get('http://localhost:3001/api/games')
      
  }

  render() {
    console.log(this.state, "before return")
    return  (
    <ul>
      <h1>Games</h1>
      {this.state.games.map(game => 
        <List key={game.id} id={game.id} game={game}/>
      )} 
    </ul>
    )
  }


}