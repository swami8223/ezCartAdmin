define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var CategoryCollection = Backbone.Collection.extend({

    initialize: function(options){
this.type =  options.type;
this.data = options.offerDetails;

    },
     url: function(){
if(this.type == "create"){
  return  BackendURL+'Menu/CreateUserMenu'
}

if(this.type == "edit"){
  return  BackendURL+'Menu/UpdateUserMenu'
}
      
     }

  });
 
  return CategoryCollection;
});
