define([
  'jquery',
  'underscore',
  'backbone',
  'models/MenuModel/menuModel'
], function($, _, Backbone, MenuModel){
  var SearchCollection = Backbone.Collection.extend({
    model: MenuModel, 
    initialize: function(options){
   
   if(options.loadMenu){

    this.loadmenu = options.loadMenu
   }



    this.searchTerm = options.searchTerm ;


    },

     url : function() {


 if(this.loadmenu){

return BackendURL+'Menu/GetCompleteMenu'

}
if(this.loadmenu == "parentId"){

return BackendURL+"Menu/GetAllParentMenu"

}

   else  if(!isNaN(parseInt(this.searchTerm))){

      
 return BackendURL+"Product/GetProductByPrdId/"+this.searchTerm;
    }

  else{
     
     return BackendURL+'Product/ProductSearchByName/?SearchTerm='+this.searchTerm;

    }
       
      
      },

  });
 
  return SearchCollection ;
});
