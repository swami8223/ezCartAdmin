define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var OrderCollection = Backbone.Collection.extend({

    
    
    initialize: function(){


    },

    url:function(){
        return BackendURL+'Invoice/GetYourPendingOrders';


    }

  });
 
  return OrderCollection;
});
