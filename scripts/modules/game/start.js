//inherits from constants @ /SCRIPTS/CONSTANTS.JS

var StartGame = (function(){
  var endpoint = "";


  var startGame = function(){
    debugger;
    if(!game_running){
      game_running = true;

      $.ajax({
        url: "https://services.sapo.pt/Codebits/listbadges",

        // The name of the callback parameter, as specified by the YQL service
        jsonp: "callback",

        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",

        // Tell YQL what we want and that we want JSON
        data: {
    //        q: "select title,abstract,url from search.news where query=\"cat\"",
            format: "json"
        },

        // Work with the response
        success: function( data ) {
            build_array(data,9);
            countdown();
            console.log( data ); // server response
        }

      });
    }
  }

  // jsonP array shuffle
  var _aux_get_x_elements_from_array = function(arr, x){
    arr = arr.slice(0, x);
    console.log(arr);
    debugger;
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
    debugger;
    game_cards = _aux_shuffle_array(arr);
  }

  //Timmer
  var countdown = function() {
    var el = document.getElementById('counter');
    var missingTime = parseInt(el.innerHTML, game_counter);

    var intervalId = setInterval(function() {
      el.innerHTML = --missingTime;
      if (value === 0) {

         clearInterval(intervalId);
      }
    }, 1000);
  };


  var endGame = function(){
    game_running = false;
    alert('Game ended');
  }

  return {
    start: startGame
  }
})();
