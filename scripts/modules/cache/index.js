var CacheTemplate;

(function(){

    if(!CacheTemplate){
      CacheTemplate = {};
      CacheTemplate.name = '';

      if(!CacheTemplate.hasOwnProperty('loadedTemplates')){
        CacheTemplate.loadedTemplates = [];
      }

      if(!CacheTemplate.hasOwnProperty('view')){
        CacheTemplate.view = elements.view;
        /*
        console.table({
            'jquery': $('#render'),
            'js': document.getElementById('render'),
            'match': $('#render') == document.getElementById('render')
        });
        */
      }

      var loadTemplate = function(data){

        CacheTemplate.loadedTemplates[CacheTemplate.name] = data;
        CacheTemplate.view.innerHTML = CacheTemplate.loadedTemplates[CacheTemplate.name];

        return CacheTemplate.loadedTemplates[CacheTemplate.name];

      }

      var getTemplate = function(name){
        var endpoint = 'templates/'+name+'.html';
        CacheTemplate.name = name;
        if(!CacheTemplate.loadedTemplates.hasOwnProperty(name)){
          ajax_get(endpoint,false,CacheTemplate.loadTemplate);
        }else{
          CacheTemplate.view.innerHTML = CacheTemplate.loadedTemplates[name];
          return CacheTemplate.loadedTemplates[name];
        }
      }

      CacheTemplate.get = getTemplate;
      CacheTemplate.loadTemplate = loadTemplate;

      return CacheTemplate;

    }else{
      return CacheTemplate;
    };

})();
