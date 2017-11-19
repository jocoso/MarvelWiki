
//Change the name on the button when this is clicked.
function changeButtonName(buttonName, content){
  document.getElementById(buttonName).innerHTML=content;
}
//

//Avoid the annoying upward scrolling everytime the user select a type selection
//In the dropdown box.
window.onload = function(){
var allLinks = document.getElementById('search-type').getElementsByTagName('a');

for(var i = 0; i < allLinks.length; i++){
  allLinks[i].addEventListener('click', redirect, false);
}
}

function redirect(ev){
  ev.preventDefault();
}
//
