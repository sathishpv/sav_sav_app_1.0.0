/**
*
 */
 
function addCard(name) {
      // Simple syntax to create a new subclass of Parse.Object.
      var UserCards = Parse.Object.extend("UserCards");
      // Create a new instance of that class.
      var userCard = new UserCards();
      userCard.set("cardName", name);
      userCard.set("username", localStorage.getItem("username"));
      save(userCard);
}
 
function getCards() {
      retrieveOrderBy("Card", displayCards, "cardName", "asc");
}
 
var displayCards = function() {
      function executeMethod(results) {
            for ( var i = 0; i < results.length; i++) {
                  var object = results[i];
                  var card = '<li data-icon="plus"><a href="javascript:addCard()">'
                              + object.get('cardName') + '</a></li>';
                  $("#_cardView").append(card);
            }
            $("#_cardView").listview("refresh");
      }
      return {
            displayMethod : executeMethod
      };
}();
 
$(document).on("click", "#_cardView li a", function() {
      var name = this.text;
      if (name != undefined && name != "")
            addCard(this.text);
});
 
$(document).ready(function() {
      getCards();
});