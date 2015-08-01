define([
  'jquery',
  'underscore',
  'backbone',
  'models/menuModel'
], function($, _, Backbone, ProjectModel){
  var SpecialOfferFormSubmit = Backbone.Collection.extend({
    model: ProjectModel,
    
    initialize: function(options){

   this.type = options.type;

    },
     url: function(){
if(this.type === "load_offer" ){
  return  BackendURL+'Offer/AdminGetOfferNameList';
}
  
else{
  return  BackendURL+'Offer/GetOfferById/'+this.type; 
}
      
     }

  });
 
  return SpecialOfferFormSubmit;
});
