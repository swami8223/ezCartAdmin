define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var OrderCollection = Backbone.Collection.extend({

    
    initialize: function(invoiceId){

this.invoiceId = invoiceId;

    },

    url:function(){

        return BackendURL+'Invoice/GetInvoiceById/'+this.invoiceId;


    }

  });
 
  return OrderCollection;
});
