define([
  'jquery',
  'underscore',
  'backbone',
  'models/homeModel/homeModel'
], function($, _, Backbone, homeModel){
  var HomeCollection = Backbone.Collection.extend({
    model: homeModel,
    
    initialize: function(models, options) {},
    url : function() {

   
        return BackendURL+'Menu/GetAdminMenu/0';
      
      },

  });
 
  return HomeCollection;
});
