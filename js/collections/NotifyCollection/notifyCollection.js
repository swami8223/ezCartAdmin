define([
  'jquery',
  'underscore',
  'backbone',
  'models/NotifyModel/notifyModel'
], function($, _, Backbone, NotifyModel){
  var ProjectsCollection = Backbone.Collection.extend({
    model: NotifyModel,
    
    initialize: function(){


    },

    url:function(){

        return BackendURL+'Invoice/GetOrderNotification';


    }

  });
 
  return ProjectsCollection;
});
