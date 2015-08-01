define([
'jquery',
  'underscore',
  'backbone',
  'views/shopView/shopView',
  'collections/ShopCollection/blockShopCollections',
  'text!../../../../templates/shop/BLockShop/blockShop.html',
   'text!../../../../templates/shop/BLockShop/blockedInfo.html'
 ],function($,_,Backbone,ShopView,BlockShopCollection,BLockShop,BlockedInfo){

//homeTemplate = _.template( $("#home-content").html());

var BlockShopView = ShopView.extend({


events:{
  'change #blockShop #retriveData': 'retriveDetails',
  'click #blockStore': 'blockStoreCall',
 'click #unBlockStore': 'blockStoreCall'

 },

  initialize : function(){
$(".active").removeClass("active");
$("#menu-22").addClass("active");
//this.invoiceId = Global.GetURLParameter('invoiceId',"","true");
this.blockShopCollection =  new BlockShopCollection(0);
 $(".loadingBlock").show();
 //this.blockShopCollection.type = 0
this.listenTo(this.blockShopCollection, 'add', this.showBlockedShopOptions);
this.blockShopCollection.fetch({type:'POST','Access-Control-Allow-Credentials' : 'true'
,xhrFields: {
       withCredentials: true
    }
  });
},



showBlockedShopOptions : function(){
var JsonData = this.blockShopCollection.toJSON();
handleResult(JsonData[0])
var compiledTemplate = _.template(BLockShop,{optionItem : JsonData});
$("#ShopView").html(compiledTemplate);
 $(".loadingBlock").hide();
},


retriveDetails : function(e){
this.blockShopCollection =  new BlockShopCollection(1);
 $(".loadingBlock").show();
  this.branchIdis = $("#retriveData").val();

this.blockShopCollection.branchId =  this.branchIdis;
 //this.blockShopCollection.type = 1
this.listenTo(this.blockShopCollection, 'add', this.showBlockedShop);
this.blockShopCollection.fetch({type:'POST'});
},


showBlockedShop : function(){
var JsonData = this.blockShopCollection.toJSON();
var compiledTemplate = _.template(BlockedInfo,{optionItem : JsonData});
$("#BlockedInfo").html(compiledTemplate);
 $(".loadingBlock").hide();
},

blockStoreCall : function(e){
this.blockShopCollection =  new BlockShopCollection(2);
this.blockShopCollection.blockId=$(e.currentTarget).attr("blockid");
this.blockShopCollection.blockStatus =$(e.currentTarget).attr("blockStatus");
 $(".loadingBlock").show();
 //this.blockShopCollection.type = 1
//this.listenTo(this.blockShopCollection, 'add', this.blockStore);
that = this;
this.blockShopCollection.fetch({success:this.blockStore,type:'POST'});
},
blockStore : function(collections,response){
onSucessofForm(response);
	 $(".loadingBlock").hide();
that.retriveDetails();
   //$(".blockstatus").html($(e.currentTarget).attr("blockStatus"));

}


});

//


 return BlockShopView;
});