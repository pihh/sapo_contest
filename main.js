
//JSOP callback methos
function callback(data){
    StartGame.run(data);
    console.log( data ); // server response
}

function openTab(element){

  each.array(elements.tabViews, function(element){
    if(hasClass(element, 'active')){
      removeClass(element,'active');
    }
  });

  addClass(this,'active');

  //get attribute
  var attr = this.getAttribute('data-template');

  CacheTemplate.get(attr,function(data){

    // add attributes to game html
    if(attr == 'game' ){
      if(elements.prototyped.startGame.hasOwnProperty('touchAndClick')){
        addTouchAndClick(elements.startGame, StartGame.start,'startGame');
      }
    }

  });
}

function bootstrap(){
  document.addEventListener("DOMContentLoaded", function(event) {
    CacheTemplate.get('game');
    var elsLen = elements.tabViews.length ,element;
    //Setup clicks and touchstart
    for (var i = 0, len = elsLen; i < len; i++) {
      element = elements.tabViews[i];
      addTouchAndClick(element,openTab, false);
    }
  });

}


bootstrap();
