
//JSOP callback methos
function callback(data){
    console.log(data);
    Game.run(data);
}

function openTab(e){

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
