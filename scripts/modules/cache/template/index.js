var CacheTemplate = (function(){

    if(!instance ){
      var instance = {};
    };

    if(!instance.hasOwnProperty('loadedTemplates')){
      instance.loadedTemplates = [];
    }

    if(!instance.hasOwnProperty('view')){
      instance.view = $('#render');
    }


    var getTemplate = function(name){

      var endpoint = 'templates/'+name+'.html';

      if(!instance.loadedTemplates.hasOwnProperty(name)){
        $.get( endpoint, function(data) {

          instance.loadedTemplates[name] = data;

          instance.view.html(instance.loadedTemplates[name]);
          return instance.loadedTemplates[name];

        }).done(function() {
            //
        }).fail(function() {

        }).always(function() {

        });
      }else{
        instance.view.html(instance.loadedTemplates[name]);
        return instance.loadedTemplates[name];
      }

    }

    return {
      getTemplate: getTemplate
    };
})();
