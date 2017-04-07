//inherits from Constants & globals

var Game = (function(Game, CONST, GLOBALS,Aux){
  var endpoint = CONST.get('JSONP_ENDPOINT');
  var elements = GLOBALS.ELEMENTS;

  var init = function(){
    var el = GLOBALS.ELEMENTS.COUNTER();
    var missingTime = CONST.get('GAME_COUNTER');
    el.innerHTML = missingTime;

    document.getElementById('start-the-game').style.display = "block";
    document.getElementById('board').style.display = "hidden";
    document.getElementById('run-the-game').style.display = "hidden";
  }

  var startGame = function(){
    if(!GLOBALS.GAME_RUNNING){
      GLOBALS.GAME_RUNNING = true;
      Aux.jsonP(endpoint);
    }
  }

  // jsonP array shuffle
  var _aux_get_x_elements_from_array = function(arr, x){
    arr = arr.slice(0, x);
    return arr;
  }

  var _aux_shuffle_array = function(arr){
    var index = arr.length, tmp, rand;

    // While there remain elements to shuffle...
    while (0 !== index) {

      // Pick a remaining element...
      rand = Math.floor(Math.random() * index);
      index -= 1;

      // And swap it with the current element.
      tmp = arr[index];
      arr[index] = arr[rand];
      arr[rand] = tmp;
    }

    return arr;
  }

  var build_array = function(arr,x){
    arr = _aux_shuffle_array(arr);
    arr = _aux_get_x_elements_from_array(arr,9);
    arr = arr.concat(arr);
    game_cards = _aux_shuffle_array(arr);
    console.log(game_cards);
  }

  //Timmer
  var countdown = function() {
    var el = GLOBALS.ELEMENTS.COUNTER();
    var missingTime = CONST.get('GAME_COUNTER');

    var intervalId = setInterval(function() {
      el.innerHTML = --missingTime;
      if (missingTime === 0) {
        endGame();
         clearInterval(intervalId);
      }
    }, 1000);
  };


  var endGame = function(){
      GLOBALS.GAME_RUNNING = false;
      alert('Game ended');
  }

  // funcões do load
  var loadTable = function(){
      var board = document.getElementById('board');
      var i = 0;
      // dispor tabuleiros
      Aux.each.array(game_cards,function(obj){
        var div = document.createElement('div');
        div.innerHTML = '<div class="col col-xs-2 card-background id=game-card-'+i+' game-cards" data-index='+i+'></div>';
        board.appendChild(div);

        i++;
      });
      // esconder e fazer aparecer butoes
      document.getElementById('start-the-game').style.display = "none";
      board.style.display = "block";
      document.getElementById('run-the-game').style.display = "block";
  }

  // build , shuffle, start counter, set end function.
  var load = function(data){

    build_array(data,9);
    loadTable();
    //countdown();

  }

  var run = function(){

  }

  return {
    start: startGame,
    load: load,
    run: run,
    init: init,
    end: endGame
  }
})(Game || {},CONST, GLOBALS, Aux);
