var name=getURLParameter('s');
var image;
var charComicAPI;
var creator_s = [];

//Stuff i still don't get
document.addEventListener("DOMContentLoaded", open);

function open(){
var publicKey =  '3e90d0fc4165b08b58fe7aaa12896014';
var privateKey = 'd91f11281056d2227753ea91699a32385f12b42d';
var marvelAPI = 'https://gateway.marvel.com/v1/public';
var characterAPI = marvelAPI + '/characters';


var character = new XMLHttpRequest();
var comics = new XMLHttpRequest();

var ts = new Date().getTime();

character.onload = function(){
    var response = JSON.parse(this.responseText);
    var pre = response.data.results[0].thumbnail;
    var imgResult = pre.path + '/portrait_incredible.' + pre.extension;
    var titleResult = response.data.results[0].name;
    var descResult = response.data.results[0].description;
    image = imgResult;
    var id = response.data.results[0].id;
    charComicAPI = marvelAPI + '/characters/'+ id.toString() +'/comics';
    // document.getElementById('title').innerHTML=titleResult;
    // document.getElementById('image').innerHTML=image;
    // document.getElementById('description').innerHTML=descResult;

}

comics.onload = function(){
    var response = JSON.parse(this.responseText);
    var pre = response.data.results[0];

    for(var i = 0; i < pre.creators.length; i++){
      creator_s[i] = pre.creators[i].items[0].name;
    }


}

  var characAPI= characterAPI + '?' +
    'hash=' + CryptoJS.MD5(ts + privateKey + publicKey).toString() + '&' +
    'apikey=' + publicKey + '&' +
    'ts=' + ts;


  var cComicAPI= charComicAPI + '?' +
        'hash=' + CryptoJS.MD5(ts+ privateKey + publicKey).toString() + '&' +
        'apikey=' + publicKey + '&' +
        'ts=' + ts;


    var characterRequest = characAPI + '&nameStartsWith=' + name;
    //var charComicRequest = cComicAPI + '&characterId=' + id;

    //xhttp.open("GET", apiRequest, true);
    character.open("GET", characterRequest, true);
    character.setRequestHeader('Content-Type', 'application/json');
    character.send();

    comics.open("GET", charComicRequest, true);
    character.setRequestHeader('Content-Type', 'application/json');
    character.send();
}


function createLayout(img, description){
  document.getElementById('image').src = img;
  document.getElementById('description').innerHTML = description;
}

function getURLParameter(name) {
    return decodeURIComponent(
        (RegExp('[?|&]'+name + '=' + '(.+?)(&|$)').exec(location.search)||[null,null])[1]
    );
}
