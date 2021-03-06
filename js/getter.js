//Global variables to be used in the program
var name= 'Hulk';     //The name is to look for a superheroe
var charComicAPI;   //Why is this here again?
var selectedItems = []; //A list of all the selected items
var allCardsDisplayed = []; //List of all items... Coming soon
var namesAsked = [] //Store all names that were previously asked
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

function nameRepeated(name2Search){
    //Is gonna traverse list of asked names and if the name to search
    //is already in the list is going to return false
    //otherwise it is gonna return true

    for(var i = 0; i < namesAsked.length; i++){
        if(name2Search === namesAsked[i]){
            return true;
        }
    }
    namesAsked[namesAsked.length] = name2Search;
    return false;
}

//ToggleSelection: make button look gross and place the card into a
//special array i called selectedItems. Also take it out if the card is pressed
//once more.
function toggleSelection(id){
    //The default color
    var defaultColor = 'blue';

    //If the image don't have the default color put it and make it member
    //of the selective selectiveItem array. Otherwise destroy the color
    //and exiliate the object in shame.
    if(document.getElementById(id).style.backgroundColor !== defaultColor){
        document.getElementById(id).style.backgroundColor = defaultColor;
        selectedItems[selectedItems.length] = id;
    }else{

        document.getElementById(id).style.backgroundColor = '#f44336';

        for(var i = 0; i < selectedItems.length; i++)
            if(selectedItems[i] == id){
                selectedItems.splice(i, 1); //Erase the item in i from array... Very useful
                break; //No need to keep looking after it find what it was looking for
            }
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
    function createCard(charactername, src, desc, id){

        //Create the 'card' using materialize
        var cardTemplate = `
        <div data-target="${id}" class="modal-trigger" style="cursor: pointer;">
        <div class="column">
            <div class="col s12 m3">
            <div class="card" style="border-radius: 7px;">
                <div class="card-image">
                    <img class="responsive-img" src="${src}" style="border-radius: 7px;">
                    <span class="card-title">${charactername}</span>
                </div>
            </div>
            </div>
        </div>
        </div>`;

        allCardsDisplayed[allCardsDisplayed.length] = `"${src}"`;
        var card = document.createElement('div');
        card.innerHTML = cardTemplate;
        return card;
    }

    function createModal(character){
        var events = '';
        var series = '';
        var comics = '';
        if (character.events.items.length) {
            events = `<ul/><b style="font-size: 20px;>Events</b>`;
            for (var i = 0; i < character.events.items.length; i++) {
                events += `<p>${character.events.items[i].name}</p>`;
            }
            events += `</ul>`;
        }
        if (character.series.items.length) {
            series = `<ul/><b style="font-size: 20px;">Series</b>`;
            for (var i = 0; i < character.series.items.length; i++) {
                series += `<p>${character.series.items[i].name}</p>`;
            }
            series += `</ul>`;
        }
        if (character.comics.items.length) {
            comics = `<ul/><b style="font-size: 20px;>Comics</b>`;
            for (var i = 0; i < character.comics.items.length; i++) {
                comics += `<p>${character.comics.items[i].name}</p>`;
            }
            comics += `</ul>`;
        }
        var modalTemplate = `
          <div class="modal-content">
            <h4>${character.name}</h4>
            <p>${character.description || 'No description available'}</p>
            ${series}
            ${events}
            ${comics}
          </div>
        `;

        var modal = document.createElement('div');
        modal.id = character.id;
        modal.classList = "modal";
        modal.innerHTML = modalTemplate;
        return modal;
    }

    function searchResponse(){
        var image = [];
        var description = [];
        var name = [];
        var alreadyCalled = true;

        var response = JSON.parse(this.responseText);
        var noImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg'
        //All these things are just going to happen if the name being asked is not in name list already.
        for(var i = 0; i < response.data.results.length; i++){
            var character = response.data.results[i];
            name[i] = character.name;
            image[i] = character.thumbnail.path + '/portrait_uncanny.' + character.thumbnail.extension;
            description[i] = character.description;


            if(image[i] !== noImage && !nameRepeated(character.id)){
                document.getElementById("card-row").insertBefore(
                    createCard(name[i], image[i], description[i], character.id),
                    document.getElementById("card-row").firstChild );

                document.getElementById("stuff").insertBefore(
                    createModal(character),
                    document.getElementById("stuff").firstChild );
            }
            $('.modal').modal();
            $('.trigger-modal').modal();
        }
    }

    function comicsResponse(){
        var response = JSON.parse(this.responseText);
        var pre = response.data.results[0];
        for(var i = 0; i < pre.creators.length; i++){
            creators_s[i] = pre.creators[i].items[0].name;
        }
    }
    //Check if the name was already asked. If not look for it,
    var characterRequest = getSearchUrl(name);
    get(characterRequest, searchResponse);
}

function getURLParameter(name) {
    return decodeURIComponent(
        (RegExp('[?|&]'+name + '=' + '(.+?)(&|$)').exec(location.search)||[null,null])[1]
    )
}

open();
