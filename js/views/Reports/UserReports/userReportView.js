define([
'jquery',
  'underscore',
  'backbone',
  'views/Reports/reportView',
  'collections/ReportsCollection/userReportCollection',
  'text!../../../../templates/reports/userReport/userReportTemplate.html',
  'text!../../../../templates/reports/userReport/userReportsResult.html'
 ],function($,_,Backbone,ReportView,UserReportCollection,UserReportsTemplate,userReportResultTemplate){

//homeTemplate = _.template( $("#home-content").html());
var dispatcher = _.clone(Backbone.Events)
var UserReportView = ReportView.extend({
	render : function(){
$("#reports").html('<section id="UserReports" class="reports wrapper90"></section>');
  var compiledTemplate = _.template( UserReportsTemplate);
  $("#UserReports").html(compiledTemplate);

},

 
events:{
  'click #userReportSearch': 'searchReports'

 },

  searchReports:function(){
  var userReportCollection = new UserReportCollection();
 $(".loadingBlock").show();
 var userReport = $("#userReportForm").serialize();
userReportCollection.fetch({success :this.requestUserReports,type:'POST',data:userReport,'Access-Control-Allow-Credentials' : 'true',
xhrFields: {
       withCredentials: true
    }
  });

 },

requestUserReports : function(collections,response){

   $(".loadingBlock").hide();
   console.log(response);

reportsuccess(response);
var option_data = new Array();
option_data[0] = response;
var compiledTemplate = _.template(userReportResultTemplate,{optionItem: option_data});
$("#userReportResult").html(compiledTemplate);

}

});

 return UserReportView;
});