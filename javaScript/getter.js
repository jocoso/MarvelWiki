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


function get(url, responseFunction){
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = responseFunction;
  request.send();
}

function getSearchUrl(name){
    var ts = new Date().getTime();
    var characAPI =  characterAPI + '?' +
        'hash=' + CryptoJS.MD5(ts + privateKey + publicKey).toString() + '&' +
        'apikey=' + publicKey + '&' +
        'ts=' + ts;

    return characAPI + '&nameStartsWith=' + name;
}

function getCharacterUrl(id){
    var charComicAPI = marvelAPI + '/characters/'+ id.toString();
    var ts = new Date().getTime();

    return charComicAPI + '?' +
        'hash=' + CryptoJS.MD5(ts+ privateKey + publicKey).toString() + '&' +
        'apikey=' + publicKey + '&' +
        'ts=' + ts;
}

function getComicUrl(id){
    var charComicAPI = marvelAPI + '/characters/'+ id.toString() +'/comics';
    var ts = new Date().getTime();

    return charComicAPI + '?' +
        'hash=' + CryptoJS.MD5(ts+ privateKey + publicKey).toString() + '&' +
        'apikey=' + publicKey + '&' +
        'ts=' + ts;
}

function characterResponse(){
    var response = JSON.parse(this.responseText);
    var pre = response.data.results[0];

    description = pre.description;
    document.body.innerHTML+=description;
}

function touch(){
     this.classList.toggle('hover');
}

function createButton(src, desc){
    var flip_container = document.createElement("DIV");
    var flipper = document.createElement("DIV");
    var front = document.createElement("DIV");
    var presentation_img = document.createElement("IMG");
    var back = document.createElement("DIV")
    var back_logo = document.createElement("DIV");
    var back_title = document.createElement("DIV");
    var description = document.createElement("P")

    flip_container.className = "flip-container";
    flipper.className = "flipper";
    front.className = "front";
    presentation_img.className = "presentation-img"
    back.className = "back";
    back_logo.className = "back-logo";
    back_title.className = "back-title";
    description.className = "back-description";

    //front.style.background = "url(" + src + ") 0 0 no-repeat";
    presentation_img.src = src;
    description.innerHTML = desc;

    flip_container.addEventListener("touchstart", touch , {capture: true});
    flip_container.appendChild(flipper);
    flipper.appendChild(front);
    front.innerHTML = "<span class='name'></span>";
    flipper.appendChild(presentation_img);
    flipper.appendChild(back);
    back.appendChild(back_logo);
    back.appendChild(back_title);
    back.appendChild(description);

    return flip_container;


    // var img = document.createElement("IMG");
    // img.src = src;
    // return img;
}

function searchResponse(){
    var response = JSON.parse(this.responseText);
    for(var i = 0; i < response.data.results.length; i++){
        var character = response.data.results[i];
        var image = character.thumbnail.path + '/landscape_incredible.' + character.thumbnail.extension;
        var description = character.description;
         document.body.appendChild(createButton(image, description));
        //document.body.innerHtml += createButton(image);
    }

}

function comicsResponse(){
    var response = JSON.parse(this.responseText);
    var pre = response.data.results[0];

    for(var i = 0; i < pre.creators.length; i++){
        creators_s[i] = pre.creators[i].items[0].name;
    }
}

    var characterRequest = getSearchUrl(name);
    get(characterRequest, searchResponse)
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
