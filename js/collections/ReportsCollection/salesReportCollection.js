define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var SalesReportCollection = Backbone.Collection.extend({

    
    initialize: function(){


    },

    url:function(){

        return BackendURL+'Reports/GetSalesReport';


    }

  });
 
  return SalesReportCollection;
});
