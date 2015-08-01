define([
  'jquery',
  'underscore',
  'backbone',

], function($, _, Backbone){
  var ProductReportCollection = Backbone.Collection.extend({

    
    initialize: function(){


    },

    url:function(){

        return BackendURL+'Reports/GetInvoiceReport';


    }

  });
 
  return ProductReportCollection;
});
