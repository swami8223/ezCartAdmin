define([
  'jquery',
  'underscore',
  'backbone',
  'models/homeModel/homeModel'
], function($, _, Backbone, homeModel){
  var SignUpCollection = Backbone.Collection.extend({
    model: homeModel,
    
    initialize: function(models, options) {},
    url : function() {

   //alert("inside collection")
        return BackendURL+'Credential/SignUp';
      
      },

  });
 
  return SignUpCollection;
});
