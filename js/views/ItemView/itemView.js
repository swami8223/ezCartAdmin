define([
'jquery',
  'underscore',
  'backbone',
  'models/itemModel/itemModel',
  'collections/ItemCollection/itemCollection',
  'views/MenuView/menuView',
  'views/ItemView/itemDisplayView',
'collections/ItemCollection/searchCollection',
  'text!../../../templates/item/itemTemplate.html',
  'text!../../../templates/item/ItemsTemplate/searchItemTemplate.html', 
 ],function($,_,Backbone,MenuModel,MenuCollection,ItemMenuView,ItemsDisplayView,SearchCollection,ItemTemplate,SearchItemTeplate){

 

var ItemView = Backbone.View.extend({

  el: "#container",
   initialize: function(options){
    //$("#container").html("");
      //this.itemsDisplayView;
       //console.log(this);
        //this.createMenu();

      
        
  },

createMenu : function(){
//alert("createMenu")

 //.$("#container").html("");
  this.render();
     
},

   
   render : function(){
console.log($(this.el))
  $(this.el).html("");
         $(this.el).append('<section id="menu" class="wrapper row2"></section>');
      var itemMenuView = new ItemMenuView({ id: 1,name:"item" }); 
     
      $(this.el).append('<section id="itemDiv" class="itemPage"></section>');

      // itemsDisplayView= new ItemsDisplayView();
      // itemsDisplayView.render();
     
 
  },

events : {
"click #itemMenu li" : "menuUiupdate"

},

menuUiupdate : function(e){

$(".active").removeClass("active");
$(e.currentTarget).addClass("active");

},
suggestProduct : function(searchTerm){
          this.value = searchTerm;
          console.log(this.value );
          searchcollection =  new SearchCollection({searchTerm : this.value });
       // $(".loadingBlock").show();
          searchcollection.fetch({ success : this.onSearchHandler,type: 'POST','Access-Control-Allow-Credentials' : 'true',xhrFields: {
       withCredentials: true
    },data_type:"application/json"});  
         
          $(".searchResults").show();


},

onSearchHandler : function(collection,response){
   
 
      var option_data = new Array();
      option_data[0] = response;
 
  if(option_data[0].ProductSearchResult !== undefined && option_data[0].ProductSearchResult.SearchTerm == $("#search-resulit").val()){
  
      var parsedJSON = JSON.stringify(option_data);
      var compiledTemplate = _.template(SearchItemTeplate,{optionItem: option_data});
       $(".searchResults").html(compiledTemplate);
       $(".searchResults").show();
       }

       else{
        $(".searchResults").hide();
       return ;

       }

},

select_search : function(e){
 var search_string = $(e.currentTarget).html();
 var search_id = $(e.currentTarget).attr("id");
$("#search-resulit").val(search_string);
$("#search-id").val(search_id);
$(".searchResults").hide();
 this.getProductDetails();

},

});

 return ItemView;
});