define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var OrderCollection = Backbone.Collection.extend({

    
    initialize: function(type){
this.type = type;

    },



    url:function(){

switch(this.type){
 case 0:
    return BackendURL+'Shop/GetShopList';
 break;
 case 1:
 return BackendURL+'Invoice/GetPendingOrdersByBranch?BranchId='+this.branchId;
 break;



}


    }

  });
 
  return OrderCollection;
});
