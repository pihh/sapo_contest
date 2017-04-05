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
