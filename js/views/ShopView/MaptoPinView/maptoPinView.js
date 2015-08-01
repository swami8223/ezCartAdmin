define([
'jquery',
  'underscore',
  'backbone',
  'views/shopView/shopView',
  'collections/ShopCollection/map2PinShopCollection',
  'text!../../../../templates/shop/MaptoShop/shopListPin.html',
   'text!../../../../templates/shop/MaptoShop/maptoShop.html'
 ],function($,_,Backbone,ShopView,MaptoPinShopCollection,BLockShop,maptoShop){

//homeTemplate = _.template( $("#home-content").html());

var MaptoPinView = ShopView.extend({


events:{
  'change #maptoPin #retriveData': 'retriveDetails',
 'click .updatePin':'updatePin',

 },

  initialize : function(){
$(".active").removeClass("active");
$("#menu-23").addClass("active");
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
handleResult(JsonData[0]);
var compiledTemplate = _.template(BLockShop,{optionItem : JsonData});
$("#ShopView").html(compiledTemplate);
 $(".loadingBlock").hide();
},


retriveDetails : function(e){

this.maptopinShopCollection =  new MaptoPinShopCollection(1);
 $(".loadingBlock").show();
 $(".branchid").html("");
 $(".branchid").html($(e.currentTarget).val());
 $(".branchIdadd").val($(e.currentTarget).val());
 this.maptopinShopCollection.branchId = $(e.currentTarget).val();
this.listenTo(this.maptopinShopCollection, 'add', this.PinCodeShop);
this.maptopinShopCollection.fetch({type:'POST'});


},


PinCodeShop : function(){
var JsonData = this.maptopinShopCollection.toJSON();
var compiledTemplate = _.template(maptoShop,{optionItem : JsonData});
$("#MapshopToPin").html(compiledTemplate);
 $(".loadingBlock").hide();
},

updatePin : function(e){
//alert("value"+$(e.currentTarget).parent(".updateformPIn").children("addpincode").value);
//alert("Update PIn call");

//alert($(e.currentTarget).parent("form").find(".addpincode").val().trim().length)
$(e.currentTarget).parent("form").find(".addpincode").css("border","1px solid #000");
if($(e.currentTarget).parent("form").find(".addpincode").val().trim().length !=6){
$(e.currentTarget).parent("form").find(".addpincode").css("border","1px solid #C00");
alert("invalid pincode ")
return;
}
else if($("#retriveData").val() !== "Yes"  ){

this.maptopinShopCollection =  new MaptoPinShopCollection(2);
this.maptopinShopCollection.fetch({ success : this.formSubmitSucess,type: 'POST',data : $(e.currentTarget).parent("form").serialize(),data_type:"application/json"});  

}
else{
alert("Select shop")
//retriveData.css("border","1px solid #C00");
}
},

formSubmitSucess : function(collections,response){
 if(response.Result == 1){
   sucessPopup(response.Message);
 }


  onSucessofForm(response);
}

});

//


 return MaptoPinView;
});