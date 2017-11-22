var name="hulk";
var searchType = " ";

document.addEventListener("DOMContentLoaded", open);

function open(){
var publicKey =  '3e90d0fc4165b08b58fe7aaa12896014';
var privateKey = 'd91f11281056d2227753ea91699a32385f12b42d';
var marvelAPI = 'https://gateway.marvel.com/v1/public';
var comicAPI = marvelAPI + '/comics';
var characterAPI = marvelAPI + '/characters';


var xhttp = new XMLHttpRequest();
var ts = new Date().getTime();

xhttp.onload = function(){
  var response = JSON.parse(this.responseText);
  var pre = response.data.results[0].thumbnail;
  var imgResult = pre.path + '/portrait_incredible.' + pre.extension;
  var titleResult = response.data.results[0].name;
  var descResult = response.data.results[0].description;
  var image = '<img src=' + imgResult + '>'

  // document.getElementById('title').innerHTML=titleResult;
  // document.getElementById('image').innerHTML=image;
  // document.getElementById('description').innerHTML=descResult;
  createLayout();

}

var characAPI= characterAPI + '?' +
  'hash=' + CryptoJS.MD5(ts + privateKey + publicKey).toString() + '&' +
  'apikey=' + publicKey + '&' +
  'ts=' + ts;


var apiRequest = comicAPI + '?' +
      'hash=' +  CryptoJS.MD5(ts+ privateKey + publicKey).toString() + '&' +
      'apikey=' + publicKey + '&' +
      'ts=' + ts;

function setName(valueId){
  name = document.getElementById(valueId).value;
}

function getName(){
  return name;
}

function createLayout(){
  var charImage = document.createElement("IMG");
  image.src=image;
  document.body.appendChild(charImage);
}

//if(searchType === 'Characters'){-->
  //alert("worked");
  var characterRequest = characAPI + '&nameStartsWith=' + name;

  //xhttp.open("GET", apiRequest, true);
  xhttp.open("GET", characterRequest, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send();
}
