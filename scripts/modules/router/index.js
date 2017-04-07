// herda Cache, Aux

var Router = (function(Router,Aux,Cache,GLOBALS){

  var view = GLOBALS.ELEMENTS.VIEW;
  var cache_preffix = '_view_';

  var getPreffix = function(name){
    return cache_preffix+name;
  }

  var load = function(route,callbackFunction){
    if(callbackFunction){
       Aux.callback(callbackFunction,Cache.get(route));
    }
    view.innerHTML = Cache.get(route);

    //carregar função init do objecto controlador desta view
    var attr = route.replace(cache_preffix,'');
    var capitalized = attr.charAt(0).toUpperCase() + attr.slice(1);
    var match = window[capitalized];
    if(typeof match === "object" && match.hasOwnProperty('init')){
      Aux.callback(match.init);
    }
  }

  var get = function(name,callbackFunction){

    return new Promise(function(resolve,reject){
      var endpoint = 'templates/'+name+'.html';
      var route = getPreffix(name);
      //CacheTemplate.name = name;
      if(!Cache.get(route)){
        //ajax_get(endpoint,false,CacheTemplate.loadTemplate,{key:'Content-type',pair:'text/html'});
        var ajax_config = {
          endpoint: endpoint,
          headers: {
            'Content-type':'text/html'
          }
        };

        Aux.ajax(ajax_config,function(success){
          Cache.set(route,success);
          load(route,callbackFunction);
          resolve(true);
        });
      }else{
        load(route,callbackFunction);
        resolve(true);
      }
    });

  }

  Router.get = get;

  return Router;

})(Router || {}, Aux, Cache, GLOBALS);
