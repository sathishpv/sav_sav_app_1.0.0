/**
*
 */
 
function login() {
      var username = $("#_username").val();
      var password = $("#_password").val();
      if(username =="" || password==""){
            return;
      }
      Parse.User.logIn(username, password, {
            success : function(data) {
                  localStorage.setItem("username", username);
                  emailVerified = data.get("emailVerified");
                  cardAdded = data.get("cardAdded");
                  if(emailVerified){
                        redirect(cardAdded);
                  }else{
                        $( "#popupLogin" ).popup( "close" );
                        $('<div>').simpledialog2({
                        mode: 'blank',
                        transition: 'flip',
                        themeDialog: 'a',
                        zindex: 2000,
                        blankContent :
                          "<div style='padding: 15px;'><p>Please verify your account by clciking on the link send to your email address.</p>"+
                          "<a rel='close' data-role='button' href='#'>OK</a></div>"
                      });
                  }
            },
            error : function(data, error) {
                  showError(error);
            }
      });
}
 
function signUp() {
     
      var username = $("#_rusername").val();
      var password = $("#_rpassword").val();
      var email = $("#_email").val();
      var firstName = $("#_fname").val();
      var lastName = $("#_lname").val();
     
      var user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);
      // other fields can be set just like with Parse.Object
      user.set("firstName", firstName);
      user.set("lastName", lastName);
 
      user.signUp(null, {
            success : function(user) {
                  $( "#popupSignUp" ).popup( "close" );
                  $('<div>').simpledialog2({
                  mode: 'blank',
                  transition: 'flip',
                  themeDialog: 'a',
                  zindex: 2000,
                  blankContent :
                    "<div style='padding: 15px;'><p>You have sccessfuly registered. We have sent an email to verify the account. Please verify the account by clicking the link in the email.</p>"+
                    "<a rel='close' data-role='button' href='#'>OK</a></div>"
                });
            },
            error : function(user, error) {
                  showError(error);
            }
      });
}
 
function redirect(cardAdded) {
      if(cardAdded){
            window.location.replace("offers.html");
      }else{
            window.location.replace("cards.html");
      }
}