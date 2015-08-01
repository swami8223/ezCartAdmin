define([
'jquery',
  'underscore',
  'backbone',
  'views/shopView/shopView',
  'collections/ShopCollection/map2PinShopCollection',
  'collections/ShopCollection/adminSearchCollection',
  'text!../../../../templates/shop/MaptoAdmin/shopListAdmin.html',
   'text!../../../../templates/shop/MaptoAdmin/maptoAdmin.html',
    'text!../../../../templates/shop/MaptoAdmin/adminDetails.html',
     'text!../../../../templates/shop/MaptoAdmin/adminaddBLock.html',
 ],function($,_,Backbone,ShopView,MaptoPinShopCollection,AdminSearchCollection,BLockShop,maptoShop,adminDetails,adminaddBLock){

//homeTemplate = _.template( $("#home-content").html());

var MaptoPinView = ShopView.extend({


events:{
  'change #mapToAdmin #retriveData': 'retriveDetails',
  'click #blockStore': 'blockStoreCall',
 'click #unBlockStore': 'blockStoreCall',
 'click #adddAdmin' : 'adddAdmin',
 'keyup #search_admin' : "searchAdmin"

 },

  initialize : function(){
$(".active").removeClass("active");
$("#menu-24").addClass("active");
//this.invoiceId = Global.GetURLParameter('invoiceId',"","true");
this.maptopinShopCollection =  new MaptoPinShopCollection(0);
 $(".loadingBlock").show();
 //this.blockShopCollection.type = 0
this.listenTo(this.maptopinShopCollection, 'add', this.showMapPinShopOptions);
this.maptopinShopCollection.fetch({type:'POST','Access-Control-Allow-Credentials' : 'true'
,xhrFields: {
       withCredentials: true
    }
  });
},



showMapPinShopOptions : function(){
var JsonData = this.maptopinShopCollection.toJSON();
handleResult(JsonData[0])
var compiledTemplate = _.template(BLockShop,{optionItem : JsonData});
$("#ShopView").html(compiledTemplate);
 $(".loadingBlock").hide();
},


retriveDetails : function(e){

this.maptopinShopCollection =  new MaptoPinShopCollection(3);
 $(".loadingBlock").show();
 //this.blockShopCollection.type = 1
 this.branchIdis = $(e.currentTarget).val();
 this.maptopinShopCollection.branchId =  this.branchIdis;
this.listenTo(this.maptopinShopCollection, 'add', this.PinCodeShop);
this.maptopinShopCollection.fetch({type:'POST'});
},


PinCodeShop : function(){
var JsonData = this.maptopinShopCollection.toJSON();
var compiledTemplate = _.template(maptoShop,{optionItem : JsonData});
$("#MapshopToPin").html(compiledTemplate);
this.maptopinShopCollection =  new MaptoPinShopCollection(4);
this.maptopinShopCollection.branchId =  this.branchIdis 
this.listenTo(this.maptopinShopCollection, 'add', this.adminDetails);
this.maptopinShopCollection.fetch({type:'POST'});
// $(".loadingBlock").hide();


},


adminDetails : function(){

var JsonData = this.maptopinShopCollection.toJSON();
var compiledTemplate = _.template(adminDetails,{optionItem : JsonData});
$("#adminlist").html(compiledTemplate);
$(".loadingBlock").hide();

},

searchAdmin:function(e){
  e.preventDefault();
    var unicode=e.keyCode? e.keyCode : e.charCode
      console.log(unicode)
     var searchBox = $(e.currentTarget);
     var searchValue = searchBox.val();
  
 switch(unicode)
{

  // On Enter Press
case 13:
  $(".searchResults").hide(); 
$(".loadingBlock").hide();
  this.getAdminDetails();
  break;
//On Back Press
case 8:
   $(".searchResults").hide();
   searchBox.val(""); 
  break;

default:
if(searchValue.length > 2 && isNaN(searchValue) == true ){
   this.suggestAdmin(searchValue);  
}
  }
},

getAdminDetails : function(){
console.log("enter pressed")
},
suggestAdmin : function(admin){
 this.adminSearchCollection = new AdminSearchCollection(admin,0)
  this.adminSearchCollection.branchId =  this.branchIdis;
 this.adminSearchCollection.type = 0
this.listenTo(this.adminSearchCollection, 'add', this.showAdmin);
 $(".loadingBlock").show();
this.adminSearchCollection.fetch({type:'POST'});

},

showAdmin : function(){
var JsonData = this.adminSearchCollection.toJSON();
console.log(JsonData);
var compiledTemplate = _.template(adminaddBLock,{optionItem : JsonData});
$("#adminResult").html(compiledTemplate);
 $(".loadingBlock").hide();
},

adddAdmin : function(e){
   var adminVal = $(e.currentTarget).parent(".adminDetailsList").attr("admindetails");

   this.adminSearchCollection2 = new AdminSearchCollection(adminVal ,1);
   //alert(this.branchIdis)
     this.adminSearchCollection2.branchId =  this.branchIdis;
//this.listenTo(this.adminSearchCollection2, 'add', this.formSubmitSucess2);
 $(".loadingBlock").show();
this.adminSearchCollection2.fetch({success : this.formSubmitSucess2,type:'POST'});



},

formSubmitSucess2 : function(collection,response){
 // alert("Result"+response[].Action);
 // console.log("Before displaying result");

 console.log(response);
  if(response.Result == 1){
   sucessPopup(response.Message);
 }
  onSucessofForm(response);
 // alert("admin added succesfully")
  $(".loadingBlock").hide();
}

});

//


 return MaptoPinView;
});