var CONST = (function() {
     var private = {
         'GAME_COUNTER': 10,
         'JSONP_ENDPOINT': 'https://services.sapo.pt/Codebits/listbadges/?callback=callback',
         'MODAL_ID': 'myModal',
         'DEFAULT_BACK_IMAGE': 'https://i2.wp.com/codebits.eu/logos/defaultavatar.jpg'
     };

     return {
        get: function(name) { return private[name]; }
    };
})();

var GLOBALS = {
  GAME_RUNNING: false,
  ELEMENTS: {
    VIEW: document.getElementById('render'),// constante
    COUNTER: function(){ return document.getElementById('counter')},
  }
}
