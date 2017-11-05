

$(function(){
var publicKey =  '3e90d0fc4165b08b58fe7aaa12896014';
var privateKey = 'd91f11281056d2227753ea91699a32385f12b42d';
var marvelAPI = 'https://gateway.marvel.com/v1/public/comics';
var ts = new Date().getTime();
$.getJSON( marvelAPI, {
    hash:  CryptoJS.MD5(ts+ privateKey + publicKey).toString(),
    apikey: publicKey,
    ts: ts
  })
    .done(function( response ) {
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
      $('#results').append(output);
  });

});
