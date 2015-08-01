define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var ParentIdCollection = Backbone.Collection.extend({

    initialize: function(options){


    },
     url: function(){

  //return  'http://ShoppingCart1.somee.com/ShoppingCart/Menu/GeAllParenttMenu'
  return  BackendURL+"Menu/GetAllParentMenu"



      
     }

  });
 
  return ParentIdCollection;   
}); 
