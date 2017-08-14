import React from 'react';
import PropTypes from 'prop-types';
import './board.css';

import BoardSpace from './board-space';
import Reset from './reset';
import SaveButton from './save-button';
import Announcement from './announcement';
import AlertContainer from 'react-alert'

import axios from 'axios'


//firebase

var firebase = require('firebase');


  var config = {
    apiKey: "AIzaSyD2GQaZJySjzHUceW0m7jFmzNFocQuuXck",
    authDomain: "tic-tac-toe-af5ed.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-af5ed.firebaseio.com",
    projectId: "tic-tac-toe-af5ed",
    storageBucket: "tic-tac-toe-af5ed.appspot.com",
    messagingSenderId: "133604893145"
  };
  firebase.initializeApp(config);


export default class Board extends React.Component {

	state = {
		
  };
                     
	static propTypes = {
		length: PropTypes.number.isRequired
	};

	static defaultProps = {
		length: 3 
	};


	//react-alert

alertOptions = {
    offset: 14,
    position: 'top left',
    theme: 'light',
    time: 5000,
    transition: 'fade'
  }
 
  showWinAlert = () => {
    this.msg.show('You Won!!!', {
      time: 2000,
      type: 'success'
    })
  }

  showCatsAlert = () => {
    this.msg.show('Cats Game', {
      time: 2000,
      type: 'error'
    })
  }

  showInvalidAlert = () => {
    this.msg.show('Invalid Move', {
      time: 2000,
      type: 'error'
    })
  }


//setting my state with the locations
	async componentWillReceiveProps() {
		const {length, id, player, winning_combinations, winner_boolean, fullboard, turn_count, winner} = this.props;

		for(let row = 0; row < length; row++) {

			for(let col = 0; col < length; col++) {
				const current_loc = this.getBoardSpaceClass(row, col, length)
				this.setState({
					[current_loc]: ""
				})
		}
	}
	console.log(this.props, "props")

	this.setState({
			id: id,
			player: player,
			winning_combinations: winning_combinations,
			winner_boolean: winner_boolean,
			fullboard: fullboard, 
			turn_count: turn_count, 
			winner: winner,
			player: player
		})

	}

	//  async componentWillMount() {
 //    this.setState({player: await this.updatePlayer()});
 //  }

 //  // here is my node api structure 
 //  async updatePlayer() {
 //    const response = await fetch('http://localhost:3001/api/title').then(res => res.json());

 //    return response.player;
	// }

	// generateRandBoardValue() {
	// 	const rand = Math.random() * 3;

	// 	if (rand < 1) {
	// 		return 'X';
	// 	} else if (rand < 2) {
	// 		return 'O';
	// 	} else return ' ';
	// }

	handleSpaceClick(loc) {

		if (this.state[loc] === "") {

		const current_player = this.state.player
		const next_player = this.state.player === "X" ? "O" : "X";

		this.setState({
			[loc]: this.state.player,
			"player": next_player
		}, () => {
			this.checkEnd(current_player)
		})
		} else {
			this.showInvalidAlert();
		}
			
	}

	//check to see if someone has won or full board
	checkEnd(player) {
		const state_ref = this.state

		//win
		this.state.winning_combinations.some(function(combo) {
			if (state_ref[combo[0]] !== "" && state_ref[combo[0]] === state_ref[combo[1]] 
				&& state_ref[combo[1]] === state_ref[combo[2]]) {
				state_ref.winner_boolean = true
			}
		})

		if (state_ref.winner_boolean === true) {
			this.setState({
				["winner_boolean"]: true,
				["winner"]: player
			}, () => {
				this.endGame("win", player);
			})
		}


		this.setState((prevState, props) => ({
			["turn_count"]: prevState.turn_count + 1
		}))
		//fullboard
		if (state_ref.turn_count === (this.props.length * 3 - 1) && !state_ref.winner_boolean) {
			this.setState({
				["fullboard"]: true
			}, () => {
				this.endGame("full", player);
			})
		}

	}

	setBlankBoard() {
			const {length} = this.props;

			for(let row = 0; row < length; row++) {

				for(let col = 0; col < length; col++) {
					const current_loc = this.getBoardSpaceClass(row, col, length)
					this.setState({
						[current_loc]: ""
					})
			}
		}

	}


	endGame(type, player) {

		switch(type) {
			case "win": 
				this.showWinAlert();
				this.saveGame();
				break;
			case "full":
				this.showCatsAlert();
				this.saveGame();
				break;
		}


	}


	saveGame() {

		let id = this.props.id
		let state = this.state

		let game_data = this.state
		axios.post('http://localhost:3001/api/games', {
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: game_data
		})
		.then(function (response) {
			console.log(response)
		})
		.catch(function (error) {
			console.log(error)
		})

	}

	getBoardSpaceClass(row, col, length) {
		const classes = [];

		if (row === 0) {
			classes.push('first_row');
		} else if (row === length - 1) {
			classes.push('last_row');
		} 

		if (col === 0) {
			classes.push('first_col');
		} else if(col === length - 1) {
			classes.push('last_col');
		} 

		if (col === length-2 & row === length-2) {
			classes.push("middle")
		}

		return classes.join(' ');
	}


	buildBoard() {
		const {length, id} = this.props;
		const rows = [];

		for(let row = 0; row < length; row++) {
			let cols = []

			for(let col = 0; col < length; col++) {
				cols.push(
					<BoardSpace 
						key={`${row}_${col}`}
						value={this.state[this.getBoardSpaceClass(row,col,length)]}
						onClick={this.handleSpaceClick.bind(this)}
						className={this.getBoardSpaceClass(row, col, length)}
						game_id={id}
					/>
				);
			}

			rows.push(<div key={row} className="board_row">{cols}</div>);
		}
		return rows;

	}

	render() {
		return (
			<div className="board_wrap">
				<Announcement game_id={this.props.id} winner={this.state.winner}/>
				<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
				{this.buildBoard()}
				<SaveButton save={this.saveGame.bind(this)}/>
			</div>

		);
	}
}