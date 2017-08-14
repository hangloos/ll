var uuid = require('uuid');

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

export default function(app) {
  //start game
	app.post('/api/game', function(req, res) {
		let game_obj = {
			id: uuid.v1()
		}

		firebase.database().ref('/games/' + game_obj.id).set({
			id: game_obj.id
		});

		res.send({
			id: game_obj.id
		});
	});

//get a game
	app.get('/api/game/:game_id', function(req, res) {
  
    var firebaseGame = firebase.database().ref('/games/' + req.params.game_id )
    firebaseGame.once("value", function(snapshot) {
      res.send(snapshot)
    }, function(errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
		
	});

//get all games
  app.get('/api/games', function(req, res) {
     var firebaseAll = firebase.database().ref()
     firebaseAll.once("value", function(snapshot) {
      res.send(snapshot)
     }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
     });
  
  })

  //save game

  app.post('/api/games', function(req, res) {
    
    firebase.database().ref('/games/' + req.body.data.id).set(
      req.body.data)
    

  });


}