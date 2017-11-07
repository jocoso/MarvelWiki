

document.addEventListener("DOMContentLoaded", open);


function open(){
var publicKey =  '3e90d0fc4165b08b58fe7aaa12896014';
var privateKey = 'd91f11281056d2227753ea91699a32385f12b42d';
var marvelAPI = 'https://gateway.marvel.com/v1/public/comics';
var xhttp = new XMLHttpRequest();

var ts = new Date().getTime();


xhttp.onload = function() {
  var response = JSON.parse(this.responseText);
  var results = response.data.results;
  var resultsLen = results.length;
  var output = '<ul>';

  for(var i=0; i<resultsLen; i++){
    if(results[i].images.length > 0) {
      var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
      output += '<li><img src="' + imgPath + '"><br>'+results[i].title+'</li>';
    }
  }
  output += '</ul>'
  document.getElementById('results').innerHTML=output;
}



var apiRequest = marvelAPI + '?' +
      'hash=' +  CryptoJS.MD5(ts+ privateKey + publicKey).toString() + '&' +
      'apikey=' + publicKey + '&' +
      'ts=' + ts;

  xhttp.open("GET", apiRequest, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send();
}
