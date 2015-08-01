define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var assignTOCollection = Backbone.Collection.extend({

    billno : "",
    invoiceId : "",
    orderStatus :"",
    initialize: function(switches,invoiceId){

    },

    url:function(){

 switch(this.orderStatus){

case 'billNo':
 return BackendURL+'Invoice/MapInvoiceToBill/?'+'BillNo='+this.billno+'&'+'InvoiceId='+this.invoiceId;
 break;
  case 'takeOrder':
   return BackendURL+'Invoice/TakeInvoiceForOperation/'+this.invoiceId;
   break;
  case 'cancel':
   return BackendURL+'Invoice/MapInvoiceToCancel?id='+this.invoiceId+"&Remark="+this.remarks;
   break;
  case 'ReadyDelivery':
   return BackendURL+'Invoice/MapInvoiceToReady/'+this.invoiceId;
   break;
  case 'Delivered':

   return BackendURL+'Invoice/MapInvoiceToDelivered?id='+this.invoiceId+"&AmountReceived="+this.amountRecived;
   break;
case 'cancelremarks' : 
   return BackendURL+'Invoice/GetInvoiceCancelRemark'
   break;
 }
   


    }

  });
 
  return assignTOCollection;
});
