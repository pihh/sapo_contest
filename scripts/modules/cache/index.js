var Cache = (function(Cache){

  Cache._storage = {};
  Cache._storageType = "none"; // none, sessionStorage

  function bootstrap(){
    // Não estamos a fazer um framework portanto não vou configurar uma coisa muito simples
    if(undefined !== window.sessionStorage){
      Cache._storageType = "sessionStorage";
    }

    // Nota: não meti aqui json parses nem isso porque nao tenciono guardar objectos
    switch(Cache._storageType){
      case "sessionStorage":
        Cache.get = function(key){
          return sessionStorage.getItem(key);
        }
        Cache.set = function(key,pair){
          return sessionStorage.setItem(key,pair);
        }
        Cache.delete = function(key){
          return sessionStorage.removeItem(key);
        }
        Cache.clear = function(){
          sessionStorage.clear();
        }
      break;
      default:
        Cache.get = function(key){
          return Cache._storage[key] || undefined;
        }
        Cache.set = function(key,pair){
          return Cache._storage[key] = pair;
        }
        Cache.delete = function(key){
            delete Cache._storage[key];
        }
        Cache.clear = function(){
          //
        }
      break;
    }
  }

  if(!Cache.hasOwnProperty('get')){
    bootstrap();
  }


  return Cache;
})(Cache || {});
