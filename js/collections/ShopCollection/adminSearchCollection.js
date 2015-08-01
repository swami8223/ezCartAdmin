define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var AdminSearchCollection = Backbone.Collection.extend({

    
    initialize: function(searchText,type){

this.searchTerm = searchText;
this.type = type;
    },

    url:function(){
      switch(this.type){
case 0:
      return BackendURL+'Credential/SearchUsers?SearchTerm='+this.searchTerm+"&Role=admin";
break

case 1:
  return BackendURL+'Shop/MapShopAdmin?BranchId='+this.branchId+'&UserId='+this.searchTerm;
break;
}
      


    }

  });
 
  return AdminSearchCollection;
});
