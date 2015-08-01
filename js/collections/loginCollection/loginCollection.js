define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var ProjectsCollection = Backbone.Collection.extend({
 
    
    initialize: function(){


    },

    url : function(){
return BackendURL+'Credential/SignIn'
    }

  });
 
  return ProjectsCollection;
});
