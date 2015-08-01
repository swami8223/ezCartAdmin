define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var SearchCollection = Backbone.Collection.extend({
 
    initialize: function(options){
 
this.form_action = options.form_action
    },

     url : function() {
  if(this.form_action == "create"){
     return  BackendURL+'Product/CreateNewProduct/';
 }
 else if(this.form_action == "update"){
 
    return BackendURL+"Product/EditProduct/"

 }
 else if(this.form_action == "create_img"){
return BackendURL+"Product/ChangeProductImage"

 }
     
      },

  });
 
  return SearchCollection ;
});
