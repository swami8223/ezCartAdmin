define([
'jquery',
  'underscore',
  'backbone',
    'views/OrderView/PendingOrder/pendingorderView',

  'collections/OrderCollection/orderSheetCollection',
  'text!../../../../templates/order/PendingOrder/orderSheet.html'
 ],function($,_,Backbone,PendingorderView,OrderSheetCollection,OrderSheet){

//homeTemplate = _.template( $("#home-content").html());

var PendingOrderView = PendingorderView.extend({


  initialize : function(){
  
this.invoiceId = Global.GetURLParameter('invoiceId',"","true");
this.orderSheetCollection =  new OrderSheetCollection(this.invoiceId);
 $(".loadingBlock").show();
this.listenTo(this.orderSheetCollection, 'add', this.updateOrderSheet);
this.orderSheetCollection.fetch({type:'POST','Access-Control-Allow-Credentials' : 'true',
xhrFields: {
       withCredentials: true
    }
  });
},



updateOrderSheet : function(){
var JsonData = this.orderSheetCollection.toJSON();
handleResult(JsonData[0])
var compiledTemplate = _.template(OrderSheet,{optionItem : JsonData[0]});
$("#container").html(compiledTemplate);
 $(".loadingBlock").hide();
}


});

//


 return PendingOrderView;
});