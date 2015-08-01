define([
'jquery',
  'underscore',
  'backbone',
  'models/itemModel/itemModel',
  'collections/MenuCollection/menuCollection',
  'text!../../../templates/menu/itemMenuTemplate.html',
  'text!../../../templates/menu/menuItemsTemplate.html'
 ],function($,_,Backbone,MenuModel,ItemMenuCollection,ItemMenuTemplate,MenuItemsTemplate){

 

var ItemView = Backbone.View.extend({
  el: $("#container"),
   
   initialize: function(options){
      this.id = options.id;
      this.name = options.name;
      this.render();
      
},
  
   
   render : function(collection,response){
 
        this.itemMenuCollection = new ItemMenuCollection({id : this.id , name: this.name});
 $(".loadingBlock").show();
this.listenTo(this.itemMenuCollection, 'add', this.onDataHandler);
    this.itemMenuCollection.fetch({type: 'POST','Access-Control-Allow-Credentials' : 'true',xhrFields: {
       withCredentials: true
    },data_type:"application/json"});  
 
  },

onDataHandler :function() {
   $(".loadingBlock").hide();
      var option_data = new Array();
      response = this.itemMenuCollection.toJSON();
      option_data = response;
      if(option_data[0].Result == 2){
        Global.signout();
        return;
      }
      var parsedJSON = JSON.stringify(option_data);
     if(this.id != 1){
      var compiledTemplate = _.template(ItemMenuTemplate,{optionItem: option_data});
     }
     else{
      var compiledTemplate = _.template(MenuItemsTemplate,{optionItem: option_data});
     }
      
     // $(".homePage").append(compiledTemplate);
      $("#menu").append('<div id="topnav" class="menudiv"></div>');
      $(".menudiv").append(compiledTemplate);
        $('#itemMenu li:first-child').addClass("active");

      },





});

 return ItemView;
});