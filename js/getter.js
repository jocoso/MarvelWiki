
//Global variables to be used in the program
var name= null;     //The name is to look for a superheroe
var charComicAPI;   //Why is this here again?
var selectedItems = []; //A list of all the selected items
var allCardsDisplayed = []; //List of all items... Coming soon
//I am writing this to complete the Frame... Looks quite cute






//I made this function for the search bar. So it searched for a character everytime
//the user wrote something and pressed enter. 20/10 very useful
function handle(e){
    //If user pressed enter
    if(e.keyCode === 13){

        //Prevent unwanted stuff from happening
        e.preventDefault();
        name = document.getElementById('input_search').value;

        //If the name is not null it do what i ought to do. Otherwise
        //it gives the user a lecture about input responsability.
        if(name !== ''){

            open();

        }else{

            alert("Please, fill the search bar with content");

        }
    }
}






//ToggleSelection: make border look gross and place the card into a
//special array i called selectedItems. Also take it out if the card is pressed
//once more.
function toggleSelection(id){
    //The default border
    var defaultBorder = '3px solid blue';

    //If the image don't have the default border put it and make it member
    //of the selective selectiveItem array. Otherwise destroy the border
    //and exiliate the object in shame.
    if(document.getElementById(id).style.border !== defaultBorder){
        document.getElementById(id).style.border= defaultBorder;
        selectedItems[selectedItems.length] = id;
        console.log("Add");     //DEBUG
        console.log(selectedItems);//DEBUG
    }else{

        document.getElementById(id).style.border='0px';

        for(var i = 0; i < selectedItems.length; i++)
            if(selectedItems[i] == id){
                selectedItems.splice(i, 1); //Erase the item in i from array... Very useful
                console.log("Erase");//DEBUG
                console.log(selectedItems);//DEBUG
                break; //No need to keep looking after it find what it was looking for
            }
    }
}


//This function will clean all the cards in the screen but those selected
function removeButSelected(){
    var isInThere = false;
    for(var i = 0; i < allCardsDisplayed.length; i++){
        console.log("getting deeper");
        for(var j = 0; j < selectedItems.length; j++){
            if(allCardsDisplayed[i] == selectedItems[j]){
                console.log("it was there")
                isInThere = true;
                break;
            }
        }
        if(!isInThere){
            var tmp = document.getElementById(allCardsDisplayed[i]);
            tmp.remove();
        }
        isInThere = false;
    }
}







//Heart of this project and also the most annoying part
function open(){

//Information required by the API
var publicKey =  '3e90d0fc4165b08b58fe7aaa12896014';
var privateKey = 'd91f11281056d2227753ea91699a32385f12b42d';
var marvelAPI = 'https://gateway.marvel.com/v1/public';
var characterAPI = marvelAPI + '/characters';

//Retrieving different data from API
var character = new XMLHttpRequest();
var comics = new XMLHttpRequest();

//Why in heavens is this function inside another function?
//Wait, that is legal? OMG the possibilities!!
function get(url, responseFunction){
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = responseFunction;
  request.send();
}






//My desires to comment died here. RIP
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
//The innapropiated part of this function.
//Check to erase if the hover animation is nomore.
function touch(){
     this.classList.toggle('hover');
}
//It creates a card? I am not sure anymore.
function createCard(charactername, src, desc){

    //Create the 'card' using materialize
    var cardTemplate = `<div class="col s12 m4">
         <div id="${src}" class="card">
         <img class="responsive-img" src="${src}">
         <a id ="button" class="btn-floating halfway-fab waves-effect waves-light red" onclick='toggleSelection("${src}")'>
         <i class="material-icons">add</i></a>
        <div>
    </div>`;

    allCardsDisplayed[allCardsDisplayed.length] = `"${src}"`;
    var card = document.createElement('div');
    card.innerHTML = cardTemplate;
    return card;
}






//This class return the number 20... If you ever need it
function noCards() {
    var a = 20;
    return a;
}






function searchResponse(){
    var image = [];
    var description = [];
    var name = [];

    var response = JSON.parse(this.responseText);
    for(var i = 0; i < response.data.results.length; i++){
        var character = response.data.results[i];
        image[i] = character.thumbnail.path + '/portrait_uncanny.' + character.thumbnail.extension;
        description[i] = character.description;
        name[i] = character.name;
        document.getElementById("card-row").appendChild(createCard(name[i], image[i], description[i]));
    }
    console.log(allCardsDisplayed);
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






function getURLParameter(name) {
    return decodeURIComponent(
        (RegExp('[?|&]'+name + '=' + '(.+?)(&|$)').exec(location.search)||[null,null])[1]
    )
}
