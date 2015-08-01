define([
  'jquery',
  'underscore',
  'backbone',
  'models/MenuModel/menuModel'
], function($, _, Backbone, MenuModel){
  var MenuCollection = Backbone.Collection.extend({
    model: MenuModel, 
    initialize: function(options){
this.id = options.id


    },

     url : function() {

   
        return BackendURL+'Menu/GetAdminMenu/'+this.id;
      
      },

  });
 
  return MenuCollection;
});
