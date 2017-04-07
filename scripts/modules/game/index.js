//inherits from Constants & globals

var Game = (function(Game, CONST, GLOBALS,Aux,Ui,Router){
  var endpoint = CONST.get('JSONP_ENDPOINT');
  var elements = GLOBALS.ELEMENTS;
  var game_cards = [];
  var game_options = {
    swiped_cards: [],
    matched_cards:[],
    can_click: true,
    missing_cards: CONST.get('MANY_CARDS'),
    counter : false,
    missing_time: 0
  }


  var init = function(){
    document.getElementById('start-the-game').style.display = "block";
    document.getElementById('board').style.display = "hidden";
    document.getElementById('run-the-game').style.display = "hidden";
  }

  var startGame = function(){
    if(!GLOBALS.GAME_RUNNING){
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
  }

  //Timmer
  var countdown = function() {

    var el = GLOBALS.ELEMENTS.COUNTER();
    game_options.missing_time = CONST.get('GAME_COUNTER');
    el.innerHTML = game_options.missing_time;

    game_options.intervalId = setInterval(function() {
      el.innerHTML = --game_options.missing_time;
      if (game_options.missing_time === 0) {
        endGame();
        clearInterval(game_options.intervalId);
      }
    }, 1000);
  };

  var endGame = function(success){
      GLOBALS.GAME_RUNNING = false;

      if(success){
        var demorou = CONST.get('GAME_COUNTER') - game_options.missing_time;
        Ui.modal.open({
          title: 'Parabens , ganhaste o desafio',
          body: '<p>Carrega neste <a href="https://twitter.com/intent/tweet/?text=Memory%20JavaScript%20FTW%20em:'+demorou+'">link</a> para partilhar este desafio no twitter.</p>',
          options: '<a href="#" data-dismiss="modal" class="btn btn-default" onclick="Router.get(\'game\')">Ok</a>'
        });
      }else{
        alert('Game over.');
      }

      clearInterval(game_options.intervalId);
  }

  // funcoes relativas ao click
  var clickCard = function(e){

    if(!GLOBALS.GAME_RUNNING || !game_options.can_click)
      return false;

    var el = e.target;
    var index = el.getAttribute('data-index');

    // tentei com o remove listener mas não deu por alguma razao, nesse caso, fiz o track das cartas viradas actualmente
    try{
      if(game_options.matched_cards.indexOf(el) > -1 || el == game_options.swiped_cards[0].el || el == game_options.swiped_cards[1].el){
        return false;
      }
    }catch(ex){

    }

    // ir buscar o index da carta
    switch(game_options.swiped_cards.length){
      case 0:
        swipeCard(el,index);
      break;
      case 1:
        swipeCard(el,index);
        matchCards();
      break;
    }
  }

  var swipeCard = function(el,index){
    Aux.removeClass(el,'card-background');
    el.style.background= 'url("'+game_cards[index].img+'")';

    game_options.swiped_cards.push({
      el: el,
      card:game_cards[index]
    });
  }

  var matchCards = function(){
    //lock clicks
    game_options.can_click = false;
    //check cards
    if(game_options.swiped_cards[0].card.id === game_options.swiped_cards[1].card.id){
      foundMatch();
    }else{
      setTimeout(function(){
        rollback();
      },750);
    }

  }

  var foundMatch = function(){

    Aux.each.array(game_options.swiped_cards,function(obj){
      game_options.matched_cards.push(obj.el);
    });
    game_options.swiped_cards = [];
    game_options.missing_cards = game_options.missing_cards -2;

    if(game_options.missing_cards == 0){
      endGame(true);
    }

    game_options.can_click = true;
  }

  var rollback = function(){
    Aux.each.array(game_options.swiped_cards,function(obj){
      obj.el.style.background = '';
      Aux.addClass(obj.el,'card-background');
      obj.el.addEventListener('click',clickCard);
    });
    game_options.swiped_cards = [];
    game_options.can_click = true;

  }

  // funcões do load
  var loadTable = function(){
      var board = document.getElementById('board');
      var i = 0;
      // dispor tabuleiros
      Aux.each.array(game_cards,function(obj){
        var div = document.createElement('div');
        div.innerHTML = '<div class="col col-xs-2 card-background id=game-card-'+i+' game-cards" data-index='+i+' ></div>';
        board.appendChild(div);

        i++;
      });
      // esconder e fazer aparecer butoes
      document.getElementById('start-the-game').style.display = "none";
      board.style.display = "block";
      document.getElementById('run-the-game').style.display = "block";

      // Adicionar event listener ao click das cards e associa-las a um objecto
      var current_cards = document.getElementsByClassName("game-cards");

      for (var i = 0; i < current_cards.length; i++) {
        current_cards[i].addEventListener('click', clickCard, true);
      }
  }

  // build , shuffle, start counter, set end function.
  var load = function(data){
    build_array(data,9);
    loadTable();
  }

  var run = function(){
    GLOBALS.GAME_RUNNING = true;
    document.getElementById('run-the-game').style.display = "none";
    countdown();
  }

    Game.start= startGame;
    Game.load= load;
    Game.run= run;
    Game.init= init;
    Game.end= endGame;

  return Game;
})(Game || {},CONST, GLOBALS, Aux,Ui,Router);
