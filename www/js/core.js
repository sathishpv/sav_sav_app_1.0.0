/**
* This js file contains all the business custom methods.
*/
 
function saveOffer() {
      var name = $("#_name").val();
      var creditcard = $("#_creditcard").val();
      var description = $("#_description").val();
      var store = $("#_store").val();
      var activeFrom = $("#_activeFrom").val();
      var expiresOn = $("#_expiresOn").val();
     
      // Simple syntax to create a new subclass of Parse.Object.
      var Offer = Parse.Object.extend("Offer");
     
      // Create a new instance of that class.
      var offer = new Offer();
     
      offer.set("name", name);
      offer.set("creditcard", creditcard);
      offer.set("description", description);
      offer.set("store", store);
      offer.set("activeFrom", activeFrom);
      offer.set("expiresOn", expiresOn);
     
      save(offer, afterSaveOffer, displayOffers);
}
 
 
 
function logOut() {
      var signUpUrl = "loginPage.html";
      Parse.User.logOut();
      window.location.replace(signUpUrl);
}
 
 
 
 
function readFile(){
      jQuery.get('http://127.0.0.1:8080/SavingSavior/CardList.txt', function(data) {
            var array = data.split("\n");
            for (var i in array) {
                  saveCard(array[i]);
            }
      });
}
 
 
function saveCard(name){
      var Card = Parse.Object.extend("Card");
      // Create a new instance of that class.
      var card = new Card();
     
      card.set("cardName", name);
      card.set("username", "siteadmin");
      card.set("cardVerified", true);
      save(card);
}
 
 
 
function checkLoggedIn() {
      var signUpUrl = "loginPage.html";
      var currentUser = Parse.User.current();
      if (currentUser) {
            var header = "Hello " + currentUser.get("firstName")+ "<p><a href='javascript:logOut()'>Sign Out</a><p>";
            $('#welcome').html(header);
      }else{
            window.location.replace(signUpUrl);
      }
}