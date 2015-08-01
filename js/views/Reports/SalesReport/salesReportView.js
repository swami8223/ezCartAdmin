define([
'jquery',
  'underscore',
  'backbone',
  'views/Reports/reportView',
  'collections/ReportsCollection/salesReportCollection',
  'text!../../../../templates/reports/salesReport/salesReportTemplate.html',
  'text!../../../../templates/reports/salesReport/salesReportResult.html'
 ],function($,_,Backbone,ReportView,ProductReportCollection,productReportTemplate,userReportResultTemplate){

//homeTemplate = _.template( $("#home-content").html());
var dispatcher = _.clone(Backbone.Events)
var SalesReportView = ReportView.extend({
	render : function(){

    $(".active").removeClass("active");
$("#menu-19").addClass("active");
    $("#UserReports").remove();
$("#reports").html('<section id="SalesReports" class="reports wrapper90"></section>');
  var compiledTemplate = _.template( productReportTemplate);
  $("#SalesReports").html(compiledTemplate);

},

 
events:{
  'click #salesReport': 'searchReports'

 },

  searchReports:function(){
  var productReportCollection = new ProductReportCollection();

 var userReport = $("#productReportForm").serialize();
productReportCollection.fetch({success :this.requestProductReports,type:'POST',data:userReport,'Access-Control-Allow-Credentials' : 'true',
xhrFields: {
       withCredentials: true
    }
  });

 },

requestProductReports : function(collections,response){

   $(".loadingBlock").hide();
   console.log(response);

reportsuccess(response);
var option_data = new Array();
option_data[0] = response;
var compiledTemplate = _.template(userReportResultTemplate,{optionItem: option_data});
$("#searchReportResult").html(compiledTemplate);

}

});

 return SalesReportView;
});