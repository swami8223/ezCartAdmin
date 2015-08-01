define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var CancelCollection = Backbone.Collection.extend({

    
    initialize: function(){


    },

    url:function(){

        return BackendURL+'Invoice/GetInvoiceCancelRemark'


    }

  });
 
  return CancelCollection;
});
