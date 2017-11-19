function changeButtonName(buttonName, content){
  document.getElementById(buttonName).innerHTML=content;
}

window.onload = function(){
var allLinks = document.getElementById('search-type').getElementsByTagName('a');

for(var i = 0; i < allLinks.length; i++){
  allLinks[i].addEventListener('click', redirect, false);
}
}

function redirect(ev){
  ev.preventDefault();
}
