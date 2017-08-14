import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios'
import './app.css';
import Game from './components/game';
import Home from './components/home';


class App extends React.Component {
  state = {
    title: ''
  };

	constructor(...args) {
		super(...args);

		this.startGame = this.startGame.bind(this);
	}

  async componentWillMount() {
    this.setState({title: await this.updateTitle(),
    	player: await this.updatePlayer()});
  }

  // here is my node api structure 
  async updateTitle() {
    const response = await fetch('http://localhost:3001/api/title').then(res => res.json());

    return response.title;
	}

	async updatePlayer() {
		const response = await fetch('http://localhost:3001/api/title').then(res => res.json());

    return response.player;
	}

  loadGame() {
    debugger
    axios.get('http://localhost:3001/api/game/' + this.game_id).then(res => console.log(res));


  }
		
	startGame() {

		const response = fetch('http://localhost:3001/api/game', {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
    		'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res => window.location.href= `/game/${res.id}`);

	}


	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<div className="app-header">

						<a className="white-link" href="/">{this.state.title}</a>

						<div className="app-buttons">
							<a onClick={this.startGame}>
								Start Game
							</a>
						</div>
					</div>
					
					<Route 
						path='/' 
						exact
						render={() => {
							return <Home />
						}}
					/>

					<Route 
						path='/game/:game_id' 
						render={(props) => {
							//contains game_id
							const params = props.match.params;


							return <Game load={this.loadGame} reset={this.startGame} {...params}/>
						}}
					/>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
