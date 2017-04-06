//Not my code
function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

//Not my code
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}

//Not my code
function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

//Auxiliares
function _checkIfFunction(callbackFunction){
  if(typeof callbackFunction === "string"){
    if(callbackFunction.indexOf('.') > -1){
      var end = 2;
      var arr = callbackFunction.split(".");
      //check namespace
      if(typeof window[arr[0]] === "object" && typeof window[arr[1]] === "function"){
        return true;
      }
    }
  }
  return typeof callbackFunction === "function" || typeof window[callbackFunction] === "function";
}

function _callFunction (callbackFunction,data){
  if(_checkIfFunction(callbackFunction)){
    callbackFunction.call(callbackFunction,data);
  }else{
    alert(callbackFunction +' is not a function');
  }
}


//loops
var each = {
  object: function(obj, callbackFunction){
    for (var p in obj) {
      if( obj.hasOwnProperty(p) && _checkIfFunction(callbackFunction)) {
        _callFunction(callbackFunction,{key:p,pair:obj[p]});
      }
    }
  },
  array: function(arr, callbackFunction){
    if( _checkIfFunction(callbackFunction)) {
      arr.forEach(function(a){
        _callFunction(callbackFunction,a);
      });
    }else{
      alert('callbackFunction: '+callbackFunction+' não é valida : /scripts/ui.js::each.array(arr)');
    }
  }
}



//ajax get -> nota, só vou trabalhar com JSON ou texto
function ajax_get (endpoint, data, callbackFunction){

  var x = new XMLHttpRequest();
  x.open("GET", endpoint, true);
  //x.setRequestHeader('Content-type', 'text/html');
  x.onreadystatechange = function () {
    if (x.readyState == 4 || x.status == 200 && x.responseText){
      _callFunction(callbackFunction,x.responseText);
    }
    //tracking 201 porque não tenciono ter outros que não 200 por aqui.
    if(x.status > 201){
      alert('Falha ao carregar xhr no endpoint: '+ endpoint + ' com status code: ' + x.status);
    }
  }

  if(data && typeof data == 'object'){ // tem de ser um objecto simples com key pair
    // falta método para passar isto ao formato a=b mas como n me vejo a fazer muitos requests, vou saltar para já
    var send = "";
    x.send(send);
  }else{
    x.send(null);
  }

}

function ajax_jsonp(){
  ajax_get(jsonp_endpoint,false,callback);
}

// Event Listeners
function trackPrototypedPropertys(name,prop){
  if(elements.prototyped[name] && !elements.prototyped[name].hasOwnProperty(prop)){
    elements.prototyped[name][prop] = true;
  }
}

function addTouchAndClick(element,callbackFunction, name){
  if(_checkIfFunction(callbackFunction) && element){
    element.addEventListener('click', callbackFunction , element);
    element.addEventListener('touchstart', callbackFunction , element);
    if(name){ // adiciona o prototype do click ao elemento para n tentar fazer bind 50 mil x.
      trackPrototypedPropertys(name,'clickAndTrack');
    }
    return true;
  }else{

    if(!element){
      alert('elemento inválido ou inexistente: '+element+' : /scripts/ui.js::addTouchAndClick');
    }else{
      alert('callbackFunction: '+callbackFunction+' não é valida : /scripts/ui.js::addTouchAndClick');
    }

    return false;
  }
}

// tabs
function openTab(e){

  each.array(document.querySelectorAll('.tab-view'), function(element){
    if(hasClass(element, 'active')){
      removeClass(element,'active');
    }
  });

  addClass(e,'active');

  //get attribute

  CacheTemplate.get(e.getAttribute('data-template'));
}
