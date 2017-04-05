
/**
 | @name: Storage,
 | @desc: Modulo para armazenar a informação na localStorage ( caso haja  ), SQLite ( caso na haja localStorage e haja SQLite ) ou caso n haja nenhum, num objecto qualquer.
 | @todo: tudo, em principio não vou seguir este código ( embora tivesse a sua piada ver isto a carregar a aplicação em offline também caso o user não tenha net e tenha )
 | @notes: guardar este progresso para projectos pessoais.
 */


var Storage;

(function(){
  if(!Storage){
    Storage = {};

    var protectedWords = ['get','set','remove','storageType','storageKey','_db'],
      protectedString;

    var queryDB = function(query,callbackFunction){
     try{
        var res;
         if(window.openDatabase && Storage._db){
           Storage._db.transaction(function(tx){
             tx.executeSql($query,[],function(tx,result){
                if(typeof(callback) == "function"){
                   callback(result);
                 }else{
                   if(callback != undefined){
                     eval(callback+"(result)");
                   }
                 }
            },function(tx,error){

            });

          });

         }
      }catch(e){}
        //Fails
        alert('Este browser não suporta sqlite');
      }
    }

    var _checkSupport = function(){
      Storage.storageType = false;

      //Test localStorage
      try {
         if(!Storage.storageType && 'localStorage' in window && window['localStorage'] !== null){
           Storage.storageType = 'localStorage';
         };
      } catch(e) {
        //Fails
      }

      //Test SQLite
      try {
        if(!Storage.storageType && window.openDatabase){
          var shortName = 'db_xyz';
          var version = '1.0';
          var displayName = 'Display Information';
          var maxSize = 65536; // in bytes
          Storage._db = openDatabase(shortName, version, displayName, maxSize);
          Storage.storageType = 'openDatabase';

          // Cria uma tabela para armazenamento de templates, variaveis, imagens, etc etc ( se bem que n vou extender isto com blogs ).
          // Dev note: estou a perder demasiado tempo com esta brincadeira k n entra no exercicio.
          queryDB()'CREATE TABLE storage (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL, value TEXT NOT NULL)');

        }

      } catch(e) {
        //Fails
      }

      if(!Storage.storageType){
        // Não é storage mas é fallback para o sistema não estoirar
        Storage.storageType = 'object';
        Storage.storageKey = {};
      }

    }

    Storage.get = function(key){
      switch (Storage.storageType) {
          case 'localStorage':
            return localStorage.getItem(key);
          break;
          case: 'openDatabase':
            return queryDB('get from image WHERE key = '+key+' LIMIT 1;"', function(data){return data});
          default:

      }
    }

    Storage.set = function(key,pair){
      if(protectedWords.indexOf(key)> -1){
        if(!protectedString){
          protectedString = '';
          each.array(protectedWords,function(word){
            protectedString += word + ', ';
          });

          //Regex not mine - falho largo em Regex ( mas irei corrigir num futuro proximo )
          protectedString = str.replace(/,\s*$/, "");

          //Notas de quem fez para consulta futura
          //The / mark the beginning and end of the regular expression
          //The , matches the comma
          //The \s means whitespace characters (space, tab, etc) and the * means 0 or more
          //The $ at the end signifies the end of the string

        }
        alert('Não se pode user palavras de funcionalidades de armazenamento : ' + protectedString);
        return false;
      }else{
        switch (Storage.storageType) {
            case 'localStorage':
              return localStorage.setItem(key,pair);
            break;
            case: 'openDatabase':
              return queryDB('insert into storage (key,value) VALUES ("'+key+'","'+pair+'")';, function(data){return data});
            default:
              Storage.storageKey[key] = pair;
        }
      }
    }

    Storage.remove = function(key){

    }
    _checkSupport();

    return Storage;
  }else{
    return Storage;
  }
})();
