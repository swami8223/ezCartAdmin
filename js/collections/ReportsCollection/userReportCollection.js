define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var UserReportCollection = Backbone.Collection.extend({

    
    initialize: function(){


    },

    url:function(){

        return BackendURL+'Reports/GetAllUser';


    }

  });
 
  return UserReportCollection;
});
