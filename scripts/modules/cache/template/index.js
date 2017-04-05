var CacheTemplate = (function(){

    if(!instance ){
      var instance = {};
    };

    if(!instance.hasOwnProperty('loadedTemplates')){
      instance.loadedTemplates = [];
    }

    if(!instance.hasOwnProperty('view')){
      instance.view = elements.view;
      /*
      console.table({
          'jquery': $('#render'),
          'js': document.getElementById('render'),
          'match': $('#render') == document.getElementById('render')
      });
      */
    }


    var getTemplate = function(name){

      var endpoint = 'templates/'+name+'.html';

      if(!instance.loadedTemplates.hasOwnProperty(name)){
        $.get( endpoint, function(data) {

          instance.loadedTemplates[name] = data;
          instance.view.innerHTML = instance.loadedTemplates[name];

          debugger;
          return instance.loadedTemplates[name];

        }).done(function() {
            //
        }).fail(function() {

        }).always(function() {

        });
      }else{
        instance.view.innerHTML = instance.loadedTemplates[name];
        return instance.loadedTemplates[name];
      }

    }

    return {
      getTemplate: getTemplate
    };
})();
