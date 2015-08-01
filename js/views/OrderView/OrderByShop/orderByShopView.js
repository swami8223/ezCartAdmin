define([
'jquery',
  'underscore',
  'backbone',
  'views/OrderView/orderView',
  'collections/OrderCollection/OrderByShopCollection',
  'text!../../../../templates/order/OrderByShop/orderbyShop.html',
  'text!../../../../templates/order/OrderByShop/getorderbyShop.html'
 ],function($,_,Backbone,Orderview,OrderCollection,OrderTemplate,getOrderTemplate){

//homeTemplate = _.template( $("#home-content").html());

var OrderByShopView = Orderview.extend({


  initialize : function(){
  //$("#container").append(this.$el);  

 //this.render();
},

events:{
'click  .getOrder .get-invoice' : "navigate_invoice",
//'click .assign_stat' : 'assignStatus',
'change #getShopOrder #retriveData': 'retriveOrder',
'click .take_stat' : 'takeStat'
},

  render : function(){ 
    //window.that = "";
    $(".active").removeClass("active");
  $("#menu-25").addClass("active");
   this.orderCollection = new OrderCollection(0);
   loadShow();
   
   this.listenTo(this.orderCollection, 'add', this.updateShopOrder);
   this.orderCollection.fetch({type:'POST',xhrFields: {
       withCredentials: true
    },'Access-Control-Allow-Credentials' : 'true'})

},


updateShopOrder : function(){
var JsonData = this.orderCollection.toJSON();
handleResult(JsonData[0])
console.log("updateOrderBySHop"+JsonData)
var compiledTemplate = _.template(OrderTemplate,{optionItem : JsonData});
$("#OrderTrack").html(compiledTemplate); 
 $(".loadingBlock").hide();
},

retriveOrder : function(e){
  this.branchIdis = $(e.currentTarget).val();
 this.orderCollection = new OrderCollection(1);
this.orderCollection.branchId =  this.branchIdis;
 //this.listenTo(this.orderCollection, 'add', this.getShopOrder);
   this.orderCollection.fetch({success:this.getShopOrder , type:'POST',xhrFields: {
       withCredentials: true
    },'Access-Control-Allow-Credentials' : 'true'})
},

getShopOrder : function(collections,response){
onSucessofForm(response);
var compiledTemplate = _.template(getOrderTemplate,{optionItem : response});
$("#getShopOrderResult").html(compiledTemplate); 
 $(".loadingBlock").hide();


},
navigate_invoice : function(e){
    alert("NAVIGATE INVOICE IN ORDER BY SHOP");
var invoice_id = $(e.currentTarget).attr("invoiceid");
window.open( Global.serverUrl+Global.appname+'#/order-sheet?invoiceId='+invoice_id,'_blank');
},


});

//


 return OrderByShopView ;
});