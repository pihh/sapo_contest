var Aux = (function(Aux){
  //DOM Manipulation
  var DOM = {
    hasClass: function(elem, className) {
        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    },
    removeClass: function(elem, className) {
        var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
        if (DOM.hasClass(elem, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },
    addClass: function(elem, className) {
        if (!DOM.hasClass(elem, className)) {
            elem.className += ' ' + className;
        }
    }
  }

  //Validações
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
    return _isAux(variable,'Array');
  }

  function _isObject(variable){
    return _isAux(variable,'Object');
  }


  //Callback
  var parseCallback = function(callback,data){
    if(_isFunction(callback)){
      callback.call(callback,data);
    }else{
      alert(callback +' is not a function');
    }
  }


  //loops
  var each = {
    object: function(obj, callbackFunction){
      for (var p in obj) {
        if( obj.hasOwnProperty(p) && _isFunction(callbackFunction)) {
          parseCallback(callbackFunction,{
            key: p,
            pair: obj[p]
          });
        }
      }
    },
    array: function(arr, callbackFunction){
      if( _isFunction(callbackFunction)) {
        arr.forEach(function(a){
          parseCallback(callbackFunction,a);
        });
      }else{
        alert('callbackFunction: '+callbackFunction+' não é valida : /scripts/ui.js::each.array(arr)');
      }
    }
  }

  // Requests
  var ajax = function(config,successCallback, errorCallback){
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
              parseCallback(successCallback,this.responseText);
            }
            //console.log('success');
          };

          if(states.finally.set){
            if(_isFunction(states.finally.callback)){
              parseCallback(states.finally.callback,this.req.responseText || false);
            }
            //console.log('finally');
          }

          //tracking 201 porque não tenciono ter outros que não 200 por aqui.
          if(this.status > 201){
            alert('Falha ao carregar xhr no endpoint: '+ config.endpoint + ' com status code: ' + this.status);

            if(_isFunction(errorCallback)){
              parseCallback(errorCallback,this.data);
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

  // Reveal
  Aux.ajax = ajax;
  Aux.each = each;
  Aux.callback = parseCallback;
  Aux.hasClass = DOM.hasClass;
  Aux.addClass = DOM.addClass;
  Aux.removeClass = DOM.removeClass;

  return Aux;

})(Aux || {})
