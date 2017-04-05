var game_counter = 10; // 1000 secs
var game_running = false;
var elements = {
  counter: document.getElementById('counter'),
  view: document.getElementById('render')
}
var jsonp_endpoint = 'https://services.sapo.pt/Codebits/listbadges/?callback=callback';

function ajax_get(){

}

function ajax_jsonp(){
  var scriptTag = document.createElement('script');
  scriptTag.src = jsonp_endpoint;
  document.body.appendChild(scriptTag);
}
