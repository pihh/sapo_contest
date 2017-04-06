
//JSOP callback methos
function callback(data){
    console.log(data);
    StartGame.run(data);
}

//Start the application
function bootstrap(){
  document.addEventListener("DOMContentLoaded", function(event) {
    CacheTemplate.get('game');
  });
}

//Bootstrap the application
bootstrap();
