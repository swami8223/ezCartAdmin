define([
  'jquery',
  'underscore',
  'backbone',
  'models/menuModel'
], function($, _, Backbone, ProjectModel){
  var ProjectsCollection = Backbone.Collection.extend({
    model: ProjectModel,
    
    initialize: function(){


    }

  });
 
  return ProjectsCollection;
});
