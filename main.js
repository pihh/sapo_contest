
//JSOP callback methos
function callback(data){
    Game.load(data);
}

function openTab(e){
  if(true == GLOBALS.GAME_RUNNING){
    Aux.coms.store(e);
    Ui.modal.open({
      title: 'Atenção',
      body: 'O jogo encontra-se neste momento a decorrer, se pretender mudar de página irá perder o seu progresso, continuar?',
      options :'<a href="#" data-dismiss="modal" class="btn btn-default" onclick="Game.end(); openTabRun()">Sim</a><a href="#" data-dismiss="modal" aria-hidden="true" class="btn btn-danger">Não</a>'
    });
  }else{
    openTabRun(e);
  }

}

function openTabRun(e){
  if(!e){
    e = Aux.coms.broadcast();
  }

  Aux.each.array(document.querySelectorAll('.tab-view'), function(element){
    if(Aux.hasClass(element, 'active')){
      Aux.removeClass(element,'active');
    }
  });

  Aux.addClass(e,'active');

  var attr = e.getAttribute('data-template');
  //get attribute
  Router.get(attr);

}


//Start the application
function bootstrap(){

  //Debug purposes
  Cache.clear();

  //Load the game
  document.addEventListener("DOMContentLoaded", function(event) {
    Router.get('game').then(function(){

    });
  });
}

/*
Aux.ajax({
  headers: {},
  //params: {'callback':'callback'},
  endpoint: 'https://services.sapo.pt/Codebits/listbadges/'
},callback,function(error){
  console.log(error);
});
*/

//Bootstrap the application
bootstrap();
