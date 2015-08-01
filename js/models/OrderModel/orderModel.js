define([
  'jquery',
  'underscore',
  'backbone'
], function($,_,Backbone) {
  
  var OrderModel = Backbone.Model.extend({

setInvoiceId : function() { 
	this.invoiceID = 21;

},

getInvoiceId : function(){
	return this.invoiceID;
}

 

});
 return OrderModel;
 });