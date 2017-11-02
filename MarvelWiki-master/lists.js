

$(function(){
var marvelAPI = 'https://gateway.marvel.com/v1/public/comics';
$.getJSON( marvelAPI, {
    apikey: '3e90d0fc4165b08b58fe7aaa12896014'
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