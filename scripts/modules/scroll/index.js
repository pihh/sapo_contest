var Scroll = (function(Scroll) {

 	'use strict';

  Scroll.to = function(id){
    var element = document.getElementById(id);
    var alignWithTop = true;
    if(null !== element){
      element.scrollIntoView(alignWithTop);
    }
  }

  return Scroll;

})(Scroll || {});
