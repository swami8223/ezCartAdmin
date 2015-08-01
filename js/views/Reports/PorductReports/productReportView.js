define([
'jquery',
  'underscore',
  'backbone',
  'views/Reports/reportView',
  'collections/ReportsCollection/productReportCollection',
  'text!../../../../templates/reports/productReport/productReportTemplate.html',
  'text!../../../../templates/reports/productReport/productResultTemplate.html'
 ],function($,_,Backbone,ReportView,ProductReportCollection,productReportTemplate,userReportResultTemplate){

//homeTemplate = _.template( $("#home-content").html());
var dispatcher = _.clone(Backbone.Events)
var ProductReportView = ReportView.extend({
	render : function(){
    $("#UserReports").remove();
$("#reports").html('<section id="ProductReports" class="reports wrapper90"></section>');
  var compiledTemplate = _.template( productReportTemplate);
  $("#ProductReports").html(compiledTemplate);
    //$( "#datepicker" ).datepicker({ dateFormat: 'dd-M-yy' });

},

 
events:{
  'click #productSearch': 'searchReports'

 },

  searchReports:function(){
  var productReportCollection = new ProductReportCollection();

 var productReport = $("#productReportForm").serialize();

 $(".loadingBlock").show();
productReportCollection.fetch({success :this.requestProductReports,type:'POST',data:productReport,'Access-Control-Allow-Credentials' : 'true',xhrFields: {
       withCredentials: true
    },data_type:"application/json"});

 },

requestProductReports : function(collections,response){

   $(".loadingBlock").hide();
   console.log(response);

reportsuccess(response);
var option_data = new Array();
option_data[0] = response;
if(option_data[0].ProductList != null){
  var compiledTemplate = _.template(userReportResultTemplate,{optionItem: option_data});
$("#productReportResult").html(compiledTemplate);

}

}

});

 return ProductReportView;
});