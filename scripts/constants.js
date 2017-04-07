var CONST = (function() {
     var private = {
         'GAME_COUNTER': 10,
         'JSONP_ENDPOINT': 'https://services.sapo.pt/Codebits/listbadges/?callback=callback',
     };

     return {
        get: function(name) { return private[name]; }
    };
})();

var GLOBALS = {
  GAME_RUNNING: false,
  ELEMENTS: {
    VIEW: document.getElementById('render'),// constante
  }
}

/*
var game_counter = 10; // 1000 secs
var game_running = false; // checks if the game is running or not
var elements = { // HTML elements

  view: document.getElementById('render'),// constante

  prototyped: {//data mapper para elementos nos quais quero adicionar funcionalidades extra apenas uma x

  }
}


var jsonp_endpoint = 'https://services.sapo.pt/Codebits/listbadges/?callback=callback';
*/
