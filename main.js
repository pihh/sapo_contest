
//JSOP callback methos
function callback(data){
    console.log(data);
    StartGame.run(data);
}


function bootstrap(){
  document.addEventListener("DOMContentLoaded", function(event) {

    CacheTemplate.get('game');

  });

}


bootstrap();
