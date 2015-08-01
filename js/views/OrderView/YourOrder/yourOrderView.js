define([
'jquery',
  'underscore',
  'backbone',
  'views/OrderView/orderView',
  'collections/OrderCollection/assignToCollection',
  'collections/OrderCollection/yourOrderCollection',
  'collections/OrderCollection/cancelCollection',
   'text!../../../../templates/order/YourOrder/yourOrderTemplate.html',
   'text!../../../../templates/order/YourOrder/cancelRemarksTemplate.html'
 ],function($,_,Backbone,Orderview,AssignToCollection,OrderCollection,CancelCollection,YourOrderTemplate,CancelRemarksTemplate){

//homeTemplate = _.template( $("#home-content").html());

var YourOrderView = Orderview.extend({






  initialize : function(){
  //$("#container").append(this.$el);

// this.render();

},

events:{
'click .get-invoice' : "navigate_invoice",
'click .assign_stat' : 'assignStatus',

},
  render : function(){ 
  // this.orderCollection.fetch({type:'POST'})
  //window.that = "";

   _.bindAll(this, "assignStatus");
$(".active").removeClass("active");
  $("#menu-14").addClass("active");


   this.orderCollection = new OrderCollection();
   this.listenTo(this.orderCollection, 'add', this.updatePendingOrder);
   $(".loadingBlock").show();
   this.orderCollection.fetch({error:this.errorHandler,type:'POST',xhrFields: {
       withCredentials: true
    },'Access-Control-Allow-Credentials' : 'true'});


},

errorHandler : function(e){
$(".loadingBlock").hide();
alert("login again not valid user");
Global.signout();
},

cancelerrorHandler : function(e){
$(".loadingBlock").hide();
},

cancelRemarks : function(collections,response){


var option_data = new Array();
option_data[0] = response;

var compiledTemplate = _.template(CancelRemarksTemplate,{optionItem : option_data});
$(".cancelTemplate").each(function( index ) {

  $(this).html(compiledTemplate);
  $(this).hide();

});

},

updatePendingOrder : function(){
  var JsonData = new Array();

JsonData = this.orderCollection.toJSON();
try{
if(JsonData[0].Result != 1){

Global.signout();
}
  
var compiledTemplate = _.template(YourOrderTemplate,{optionItem : JsonData[0].Notifications});
$("#OrderTrack").html(compiledTemplate); 
 $(".loadingBlock").hide();
}catch(e){
  console.log("ERROR"+e)
}

this.cancelRemarksCollection = new CancelCollection();
//this.cancelRemarksCollection.orderStatus = 'cancelremarks'
//this.listenTo(this.assignToCollection, 'add', this.assignToaction);
 
this.cancelRemarksCollection.fetch({error: this.cancelerrorHandler,success:this.cancelRemarks, type:'POST',xhrFields: {
       withCredentials: true
    },'Access-Control-Allow-Credentials' : 'true'})


},




assignStatus : function(e){ 
  //alert("assign status");
this.assignToCollection = new AssignToCollection('AssignOrder');
var billNo =$(e.currentTarget).parents("li").children(".billno").val();
this.assignToCollection.orderStatus = $(e.currentTarget).attr("orderStatus");
window.that = this;
if(this.assignToCollection.orderStatus == 'reason'){
  //$(e.currentTarget).parents(".normal-items").css("background","#ccc");
  $(e.currentTarget).parents(".normal-items").find(".cancelTemplate" ).toggle();
  return ;
}




else if(this.assignToCollection.orderStatus == 'cancel'){
 loadShow();
$(e.currentTarget).parents(".normal-items").addClass("removeUL");
 this.assignToCollection.invoiceId = $(e.currentTarget).parents("ul").attr("invoiceId");
  //alert($('.reason input[name="status"]:checked').val());
  this.assignToCollection.remarks = $('.reason input[name="status"]:checked').val()
  

  this.assignToCollection.fetch({success:this.cancelValidate,type:'POST',xhrFields: {
       withCredentials: true
    },'Access-Control-Allow-Credentials' : 'true'})


  return ;
}

else if(this.assignToCollection.orderStatus == 'Delivered'){
 loadShow();
$(e.currentTarget).parents(".normal-items").addClass("removeUL");
 this.assignToCollection.invoiceId = $(e.currentTarget).parents("ul").attr("invoiceId");
  //alert($('.reason input[name="status"]:checked').val());
 // return ;
 this.assignToCollection.amountRecived = $(e.currentTarget).parents("li").children(".amount").val()

if(this.assignToCollection.amountRecived == "" || isNaN(this.assignToCollection.amountRecived) == true){
   alert("Please enter amount you received and Try again");
   $(".loadingBlock").hide();
   $(e.currentTarget).parents("li").children(".amount").val("")
   return;
}


}



 this.assignToCollection.invoiceId = $(e.currentTarget).parents("ul").attr("invoiceId");
this.assignToCollection.billno = $(e.currentTarget).parents("li").children(".billno").val();
//$(e.currentTarget).parents("li").children(".billno").attr("disabled");
if( billNo == "" || billNo == undefined){
alert("enter bill no");
return false;
}
//this.listenTo(this.assignToCollection, 'add', this.assignToaction);

this.assignToCollection.fetch({success:this.assignToValidate,type:'POST',xhrFields: {
       withCredentials: true
    },'Access-Control-Allow-Credentials' : 'true'})

},


cancelValidate : function(collections,response){

onSucessofForm(response);
if(response.Result == 1){
 that.render();
}



},

assignToValidate : function(collections,response){
  //alert("response "+jQuery.parseJSON(response));
  onSucessofForm(response);
  //that.render();
if(response.Result == 1){
 that.render();
}
},


navigate_invoice : function(e){
var invoice_id = $(e.currentTarget).attr("invoiceid");
window.open( Global.serverUrl+Global.appname+'#/order-sheet?invoiceId='+invoice_id,'_blank');
},




});

//

return YourOrderView;

});