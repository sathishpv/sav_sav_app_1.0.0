/**
* This js file contains all the parse methods to save and retrieve generically
*/
 
 
 
/**
* save the single object to parse and returns the Id
*/
function save(object, callbackService, callbackView) {
      object.save(null, {
            success : function(object) {
                  callbackService.getMethod(callbackView);
            },
            error : function(object, error) {
                  $("#_error").html(error.message);
            }
      });
}
 
/**
* save the single object to parse and returns the Id
*/
function save(object) {
      object.save(null, {
            success : function(object) {
                  runtimePopup("Suuccessfully added card!");
            },
            error : function(object, error) {
                  showError(error);
            }
      });
}
 
 
function runtimePopup(message, popupafterclose) {
        var template = "<div data-role='popup' class='ui-content messagePopup' style='max-width:280px' data-transition='flow'>"
            + "<span> "
            + message + " </span> </div>";
       
        popupafterclose = popupafterclose ? popupafterclose : function () {};
     
        $.mobile.activePage.append(template).trigger("create");
     
        $.mobile.activePage.find(".closePopup").bind("tap", function (e) {
          $.mobile.activePage.find(".messagePopup").popup("close");
        });
     
        $.mobile.activePage.find(".messagePopup").popup().popup("open").bind({
          popupafterclose: function () {
            $(this).unbind("popupafterclose").remove();
            popupafterclose();
          }
        });
       
        setTimeout(function () {
              $.mobile.activePage.find(".messagePopup").popup().popup("close");
            }, 2000);
      }
 
/**
* retrieves the single object from parse and returns
*/
function queryById(id, object) {
      query.get(id, {
            success : function(object) {
                  return object;
            },
            error : function(object, error) {
                  $("#_error").html(error.message);
            }
      });
}
 
/**
* If you need to refresh an object you already have with the latest data that is in the Parse Cloud, you can call the fetch method
 */
function fetch(object) {
      object.fetch({
            success : function(object) {
                  return object;
            },
            error : function(object, error) {
                  $("#_error").html(error.message);
            }
      });
}
 
 
/**
* Updating an object 
 */
function update(object, jsonArray) {
      object.save(null, {
            success : function(object) {
                  for ( var i = jsonArray.length - 1; i >= 0; --i) {
                        var o = jsonArray[i];
                        for ( var key in o) {
                              if (o.hasOwnProperty(key)) {
                                    var result = o[key];
                                    object.set(key, result);
                              }
                        }
                  }
                  object.save();
                  return true;
            },
            error : function(object, error) {
                  $("#_error").html(error.message);
            }
      });
}
 
/**
* Deleting an object 
 */
function deleteObject(object) {
      object.destroy({
            success : function(object) {
                  return true;
            },
            error : function(object, error) {
                  $("#_error").html(error.message);
            }
      });
}
 
 
/**
* Retrieve a list of objects
 */
function retrieve(type, callbackView) {
      var objectType = Parse.Object.extend(type);
      var query = new Parse.Query(objectType);
      query.find({
        success: function(results) {
              callbackView.displayMethod(results);
        },
        error: function(error) {
              $("#_error").html(results);
        }
      });
}
 
 
/**
* Retrieve a list of objects
 */
function retrieveOrderBy(type, callbackView, orderBy, order) {
      var objectType = Parse.Object.extend(type);
      var query = new Parse.Query(objectType);
      if(order == 'asc')
            query.ascending(orderBy);
      else
            query.descending(orderBy);
     
      query.find({
        success: function(results) {
              callbackView.displayMethod(results);
        },
        error: function(error) {
              $("#_error").html(results);
        }
      });
}
 
/**
* Retrieve a list of objects
 */
function retrieveByQuery(query, callbackView) {
      query.find({
        success: function(results) {
              callbackView.displayMethod(results);
        },
        error: function(error) {
              $("#_error").html(results);
        }
      });
}
 
function showError(error){
      $('<div>').simpledialog2({
        mode: 'blank',
        headerText: "Error",
        headerClose: true,
        transition: 'flip',
        themeDialog: 'a',
        zindex: 2000,
        blankContent :
          "<div style='padding: 15px;'><p>"+error.message+"</p>"+
          "<a rel='close' data-role='button' href='#'>OK</a></div>"
      });
}