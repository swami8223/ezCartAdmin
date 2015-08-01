define([
  'jquery',
  'underscore',
  'backbone',
  'models/menuModel'
], function($, _, Backbone, ProjectModel){
  var SpecialOfferFormSubmit = Backbone.Collection.extend({
    model: ProjectModel,
    
    initialize: function(options){
this.type =  options.type;
this.data = options.offerDetails;

    },
     url: function(){
if(this.type == "create"){
  return  BackendURL+'Offer/CreateOffer/'
}

if(this.type == "edit"){
  return  BackendURL+'Offer/UpdateOffer/'
}
      
     }

  });
 
  return SpecialOfferFormSubmit;
});
