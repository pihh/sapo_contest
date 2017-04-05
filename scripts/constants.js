var game_counter = 10; // 1000 secs
var game_running = false; // checks if the game is running or not
var elements = { // HTML elements
  counter: document.getElementById('counter'),
  view: document.getElementById('render'),
  tabViews: document.querySelectorAll('.tab-view'),
  startGame: document.getElementById('start-the-game'),

  prototyped: {//data mapper para elementos nos quais quero adicionar funcionalidades extra apenas uma x
    startGame: {}
  }
}

var jsonp_endpoint = 'https://services.sapo.pt/Codebits/listbadges/?callback=callback';
