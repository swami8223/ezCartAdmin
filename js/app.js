define([
  'jquery', 
  'underscore', 
  'backbone',
  'router',
  'itemMenurouter',
  'global',
  'formValidator'
], function($, _, Backbone,Router,ItemMenurouter){
  var initialize = function(){
    //alert(Router)
    // Pass in our Router module and call it's initialize function
   //alert("Thambi")
 
    Router.initialize();
    ItemMenurouter.initialize();
  };

  return { 
    initialize: initialize
  };
});