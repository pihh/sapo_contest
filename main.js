
//JSOP callback methos
function callback(data){
    StartGame.run(data);
    console.log( data ); // server response
}


function bootstrap(){
  CacheTemplate.getTemplate('rules');

  //Set
  $('.tab-view').on('click touchstart', function(){
    $('.tab-view').removeClass('active');
    $(this).addClass('active');
    CacheTemplate.getTemplate($(this).attr('data-template'));
  });

  $(document).on('click touchstart','#start-the-game', function(){
    StartGame.start();
  });
}


bootstrap();
