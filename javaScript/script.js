
//Change the name on the button when this is clicked.
function changeButtonName(buttonName, content){
  document.getElementById(buttonName).innerHTML=content;
}
//

function whatever(nameID){
  var name = document.getElementById(nameID).value;
  window.location.href = "pageTemplate.html?s="+ name;
}



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
function getURLParameter(name) {
    return decodeURIComponent(
        (RegExp('[?|&]'+name + '=' + '(.+?)(&|$)').exec(location.search)||[null,null])[1]
    );
}

function setURLParameter(name,value){
	var search;
	if(getURLParameter(name)){
		search =location.search.replace(new RegExp('([?|&]'+name + '=)' + '(.+?)(&|$)'),"$1"+encodeURIComponent(value)+"$3");
	}else if(location.search.length){
		search = location.search +'&'+name + '=' +encodeURIComponent(value);
	}else{
		search = '?'+name + '=' +encodeURIComponent(value);
	}
	History.pushState({state:History.getStateId()+1},document.title,search);
}
