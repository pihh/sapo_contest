var Ui = (function(Ui,CONST){

  var scroll = {
    to: function(id){
      var element = document.getElementById(id);
      var alignWithTop = true;
      if(null !== element){
        element.scrollIntoView(alignWithTop);
      }
    }
  }

  var modal = {
    open: function(config){
      if(!config)
        config = {};

      var title = config.title || "Modal Header";
      var body = config.body || "<p>Some text in the modal.</p>";
      var options = config.options || '<a href="#" data-dismiss="modal" class="btn btn-default">Sim</a><a href="#" data-dismiss="modal" aria-hidden="true" class="btn btn-danger">Não</a>';

      document.getElementById('_modal_title').innerHTML = title;
      document.getElementById('_modal_body').innerHTML = body;
      document.getElementById('_modal_footer').innerHTML = options;

      $("#"+CONST.get('MODAL_ID')).modal('show');
    },
    hide: function(){
      $("#"+CONST.get('MODAL_ID')).modal('hide');
    }
  }

  return {
    scroll:scroll,
    modal:modal
  }
})(Ui || {},CONST);
