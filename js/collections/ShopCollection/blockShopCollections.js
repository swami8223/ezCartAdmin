define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var BlockShopCollection = Backbone.Collection.extend({

    
    initialize: function(type){

this.type = type
    },

    url:function(){

switch(this.type){
  case 0:
    return BackendURL+'Shop/GetShopList';
  break;

  case 1:
     return BackendURL+'Shop/GetShopByBranchId/'+this.branchId;
  break;
  case 2 :
  return BackendURL+"Shop/BlockShop?id="+this.blockId+"&BlockValue="+this.blockStatus
  break;
}





       


    }

  });
 
  return BlockShopCollection;
});
