define([
'jquery',
  'underscore',
  'backbone',
  'models/menuModel',
  'collections/menuCollection',
  'text!../../templates/home/homeTemplate.html'
 ],function($,_,Backbone,MenuModel,MenuCollection,HomeTemplate){

//homeTemplate = _.template( $("#home-content").html());

var PdpView = Backbone.View.extend({
  el: $("#container"),
	render : function(){
     
var menu0 = new  MenuModel({text:"right",text2:"right2"});
var amenu = [menu0];
var menuCollection = new MenuCollection(amenu);

//alert(menuCollection.models);
var data = {

  projects: menuCollection.models,
 _: _ 

};
//alert("PROJECTSSSS"+projects);

  var compiledTemplate = _.template( HomeTemplate,data);
		//alert("In render PDp"+this.$el.html());
     // $('.menu li').removeClass('active');
     // $('.menu li a[href="#"]').parent().addClass('active');
     //alert("beforeing template")
     this.$el.html(compiledTemplate);

}

});

 return PdpView;
});