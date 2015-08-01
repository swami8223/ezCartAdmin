define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var MaptoPinShopCOllection = Backbone.Collection.extend({

    
    initialize: function(type){

this.type = type
    },

    url:function(){


switch(this.type){
  case 0:
    return BackendURL+'Shop/GetShopList';
  break;

  case 1:
     return BackendURL+'Shop/GetPicodeForBranchId/'+this.branchId ;
  break;
  case 2 :
  return BackendURL+"Shop/MapPincodeShop"
  break;
  case 3:
  return BackendURL+"Shop/GetShopByBranchId/"+this.branchId ;
  break;
  case 4:
  return BackendURL+"Shop/GetAdminForBranch/"+this.branchId;
  break;
}








       


    }

  });
 
  return MaptoPinShopCOllection;
});
