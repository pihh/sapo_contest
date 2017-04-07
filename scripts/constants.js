var CONST = (function() {
     var private = {
         'GAME_COUNTER': 10,
         'JSONP_ENDPOINT': 'https://services.sapo.pt/Codebits/listbadges/?callback=callback',
         'MODAL_ID': 'myModal'
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
