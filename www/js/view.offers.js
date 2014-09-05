/**
*
 */
 
function getUserCards() {
      var objectType = Parse.Object.extend("UserCards");
      var query = new Parse.Query(objectType);
      query.ascending("cardName");
      query.equalTo("username", localStorage.getItem("username"));
      retrieveByQuery(query, displayUserCards);
}
 
var Markup = new Object();
 
Markup.Collapsible = function (results) {
    $('#makecollapsible')
        .append($('<div>')
        .attr({
        'data-role': 'collapsible-set',
            'id': 'primary'
    }));
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      var cardName = object.get('cardName');
      var offers = getLocalOffers(cardName);
      var cardContent = '<ul data-role="listview" data-theme="b">';
      for(var j=0;j<offers.length;j++){
            var description = offers[j];
            cardContent += '<li data-icon="none"><a href="#">'+description +'</a></li>';
      }
      cardContent += '</ul>';
        ($('<div>')
            .attr({
            'data-role': 'collapsible',
                'data-content-theme': 'c',
                'data-collapsed': 'true'
        })
            .html('<h4>' + object.get('cardName') + '</h4>'+cardContent))
            .appendTo('#primary');
    }
    $('#makecollapsible').collapsibleset().trigger('create');
};
 
var displayUserCards = function() {
      function executeMethod(results) {
            Markup.Collapsible(results);
      }
      return {
            displayMethod : executeMethod
      };
}();
 
function getOffers() {
      retrieveOrderBy("Offer", storeOffers, 'cardName','asc');
}
 
var storeOffers = function() {
      function executeMethod(results) {
            localStorage.setItem("offers", JSON.stringify(results));
      }
      return {
            displayMethod : executeMethod
      };
}();
 
 
function getLocalOffers(cardName) {
      var results = JSON.parse(localStorage.getItem("offers"));
      var offers = [];
      var j = 0;
      for(var i=0; i< results.length;i++){
            var object = results[i];
            if(object.cardName == cardName){
                  offers[j++] = object.description + ' @ ' + object.merchantName;
            }
      }
      if(offers.length == undefined || offers.length == 0){
            offers[j++] = 'No available offers';
      }
      return offers;
};
 
$(document).ready(function() {
      getOffers();
      getUserCards();
});