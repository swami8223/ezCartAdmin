define([
'jquery',
  'underscore',
  'backbone',
  'views/OrderView/orderView',
  'models/OrderModel/orderModel',
  'collections/OrderCollection/orderCollection',
  'collections/OrderCollection/assignToCollection',
  'text!../../../../templates/order/PendingOrder/pendingOrder.html'
 ],function($,_,Backbone,Orderview,OrderModel,OrderCollection,AssignToCollection,OrderTemplate){

//homeTemplate = _.template( $("#home-content").html());

var PendingOrderView = Orderview.extend({


  initialize : function(){
  //$("#container").append(this.$el);  

 //this.render();
},

events:{
'click .pendingOrder .get-invoice' : "navigate_invoice",
//'click .assign_stat' : 'assignStatus',
'click .pendingOrder .take_stat' : 'takeStat'
},

  render : function(){ 
    //window.that = "";
    $(".active").removeClass("active");
  $("#menu-13").addClass("active");
   this.orderCollection = new OrderCollection();
   loadShow();
   
   this.listenTo(this.orderCollection, 'add', this.updatePendingOrder);
   this.orderCollection.fetch({type:'POST',xhrFields: {
       withCredentials: true
    },'Access-Control-Allow-Credentials' : 'true'})

},

updatePendingOrder : function(){
var JsonData = this.orderCollection.toJSON();
//console.log("RESLUT"+JsonData[0].Result)
handleResult(JsonData[0])
if(JsonData[0].Result ==1){
  var compiledTemplate = _.template(OrderTemplate,{optionItem : JsonData[0].Notifications});
$("#OrderTrack").html(compiledTemplate); 
 $(".loadingBlock").hide();
}
// else if(JsonData[0].Result ==2){
//   //var approuter = new AppRouter(
//  // console.log(App)
// $(".loadingBlock").hide();
// //app_router.navigate("/#login", true);
// Global.signout();

// }



},

takeStat : function(e){
  window.that = this;
this.assignToCollection = new AssignToCollection('AssignOrder');
this.assignToCollection.orderStatus = $(e.currentTarget).attr("orderStatus");
this.assignToCollection.invoiceId = $(e.currentTarget).parents("ul").attr("invoiceId");
this.listenTo(this.assignToCollection, 'add', this.assignToactionTakeReport );
 $(".loadingBlock").show();
this.assignToCollection.fetch({type:'POST',xhrFields: {
       withCredentials: true
    },'Access-Control-Allow-Credentials' : 'true'})

},

assignToactionTakeReport : function(collection,response){
var JsonData = this.assignToCollection.toJSON();

 $(".loadingBlock").hide();
that.render();
},

navigate_invoice : function(e){

var invoice_id = $(e.currentTarget).attr("invoiceid");
window.open( Global.serverUrl+Global.appname+'#/order-sheet?invoiceId='+invoice_id,'_blank');
},





close: function() {
        
console.log("dsds");
        // Unregister for event to stop memory leak
       dispatcher.off( 'PendingOrderView', this.close, this );
        // Do other close stuff here.

        alert("closed")
    }


});

//


 return PendingOrderView;
});