//Not my code
/*
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

*
//Auxiliares
function _isFunction(callbackFunction){
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

function _returnObjType(variable){
  return Object.prototype.toString.call( variable );
}

function _isAux(variable,type){
  return(_returnObjType(variable) === '[object '+type+']');
}

function _isArray(variable){
  //return(Object.prototype.toString.call( variable ) === '[object Array]');
  return _isAux(variable,'Array');
}

function _isObject(variable){
  //console.log(Object.prototype.toString.call(variable) === '[object Object]');
  return _isAux(variable,'Object');
}

function _callFunction (callbackFunction,data){
  if(_isFunction(callbackFunction)){
    callbackFunction.call(callbackFunction,data);
  }else{
    alert(callbackFunction +' is not a function');
  }
}
*


//loops
var each = {
  object: function(obj, callbackFunction){
    for (var p in obj) {
      if( obj.hasOwnProperty(p) && _isFunction(callbackFunction)) {
        _callFunction(callbackFunction,{
          key: p,
          pair: obj[p]
        });
      }
    }
  },
  array: function(arr, callbackFunction){
    if( _isFunction(callbackFunction)) {
      arr.forEach(function(a){
        _callFunction(callbackFunction,a);
      });
    }else{
      alert('callbackFunction: '+callbackFunction+' não é valida : /scripts/ui.js::each.array(arr)');
    }
  }
}



//ajax get -> nota, só vou trabalhar com JSON ou texto
function ajax_get (endpoint, data, callbackFunction,headers){

  var x = new XMLHttpRequest();
  x.open("GET", endpoint, true);

  if(headers){
    if(typeof headers === 'object'){
      each.object(headers, function(obj){
        x.setRequestHeader(obj.key,obj.pair);
      })
    }

    if(_isArray(headers)){
      each.array(headers, function(arr){
        each.object(arr, function(key,pair){
          x.setRequestHeader(obj.key,obj.pair);
        })
      })
    }
  }
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
  if(_isFunction(callbackFunction) && element){
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

//ajax try

function ajax(config,successCallback, errorCallback){
  this.data = null;
  this.config = {};
  var states = {
    finally:{
      set: false,
      callback:false
    }
  }
  this.req = new XMLHttpRequest();

  var method = "GET"; // metodo base
  var methods = ["GET","POST"]; // metodos disponiveis - n deve ser preciso

  buildConfig = function(self){
    if(!config || !config.endpoint){
      alert('Para correr ajax é preciso existir um objecto de configuração e esse objecto ter uma key endpoint com um endpoint');
    }

    if(config.method && methods.indexOf(config.method.toUpperCase())){
      method = config.method.toUpperCase();
    }

    // meter parametros
    if(config.params && _isObject(config.params)){
       var count = 0;
       each.object(config.params, function(obj){
         // nota, não estou a construir um framework portanto não vou serializar isto
         if(0 === count) {
           config.endpoint += '?'+obj.key+'='+obj.pair;
         }else{
           config.endpoint += '&'+obj.key+'='+obj.pair;
         }
         count++;
       });
    }

    // Abrir o request
    self.req.open(method, config.endpoint, true);

    // meter headers depois de aberto
    if(config.headers && _isObject(config.headers)){
        each.object(config.headers, function(obj){
          self.req.setRequestHeader(obj.key,obj.pair);
        });
    }

  }

  buildConfig(this);

  this.req.onreadystatechange = function () {

    if (this.readyState == 4){
        if(this.status == 200 && this.responseText){
          if(_isFunction(successCallback)){
            _callFunction(successCallback,this.responseText);
          }
          //console.log('success');
        };

        if(states.finally.set){
          if(_isFunction(states.finally.callback)){
            _callFunction(states.finally.callback,this.req.responseText || false);
          }
          //console.log('finally');
        }

        //tracking 201 porque não tenciono ter outros que não 200 por aqui.
        if(this.status > 201){
          alert('Falha ao carregar xhr no endpoint: '+ config.endpoint + ' com status code: ' + this.status);

          if(_isFunction(errorCallback)){
            _callFunction(errorCallback,this.data);
          }
        }
    }


  }

  this.finally = function(callbackFunction){
    states.finally.set = true;
    states.finally.callback = callbackFunction;
  }

  this.req.send(null);

  return this;


}
*/
