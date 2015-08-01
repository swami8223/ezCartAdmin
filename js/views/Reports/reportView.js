define([
'jquery',
  'underscore',
  'backbone',
  'views/MenuView/menuView',
  'text!../../../templates/reports/reportsView.html'
 ],function($,_,Backbone,ReportsMenuView,ReportsTemplate){

//homeTemplate = _.template( $("#home-content").html());

var ReportsView = Backbone.View.extend({
  el: "#container",
	render : function(){

		//alert("reportview")
     //$("#container").html("");
     $(this.el).append('<section id="menu" class="wrapper row2"></section>');
 var reportsMenuView = new ReportsMenuView({ id: 6,name:"reports" });
$(this.el).append('<section id="reports" class="reports wrapper90"></section>');
},





});

 return ReportsView;
});