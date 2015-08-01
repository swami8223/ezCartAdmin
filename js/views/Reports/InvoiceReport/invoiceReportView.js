define([
'jquery',
  'underscore',
  'backbone',
  'views/Reports/reportView',
  'collections/ReportsCollection/invoiceReportCollection',
  'text!../../../../templates/reports/invoiceReport/invoiceReportTemplate.html',
  'text!../../../../templates/reports/invoiceReport/invoiceResultTemplate.html',
  'collections/OrderCollection/cancelCollection',
 ],function($,_,Backbone,ReportView,InvoiceReportCollection,InvoiceReportsTemplate,InvoiceReportResultTemplate,CancelCollection){

//homeTemplate = _.template( $("#home-content").html());
var dispatcher = _.clone(Backbone.Events)


var InvoiceReportView = ReportView.extend({
	render : function(){

        $(".active").removeClass("active");
$("#menu-18").addClass("active");
$("#reports").html('<section id="InvoiceReports" class="reports wrapper90"></section>');
  var compiledTemplate = _.template( InvoiceReportsTemplate);
  $("#InvoiceReports").html(compiledTemplate);
this.cancelRemarksCollection = new CancelCollection();
//this.cancelRemarksCollection.orderStatus = 'cancelremarks'
//this.listenTo(this.assignToCollection, 'add', this.assignToaction);
 
this.cancelRemarksCollection.fetch({error: this.cancelerrorHandler,success:this.cancelRemarks, type:'POST',xhrFields: {
       withCredentials: true
    },'Access-Control-Allow-Credentials' : 'true'})

},

 
events:{
  'click #invoiceSearch': 'invoiceReports'

 },

  invoiceReports:function(){
  var invoiceReportCollection = new InvoiceReportCollection();
 $(".loadingBlock").show();
 var userReport = $("#userReportForm").serialize();
invoiceReportCollection.fetch({success :this.requestInvoiceReports,
  type:'POST'
  ,data:userReport ,'Access-Control-Allow-Credentials' : 'true',
xhrFields: {
       withCredentials: true
    }
  
});

 },


cancelRemarks : function(collections,response){
  var option_data = new Array();
option_data[0] = response;


for(var stat=0; stat < option_data[0].CancelRemark.length; stat++){
console.log(option_data[0].CancelRemark[stat].Status);
$(".cancelRemark").append($('<option/>', { 
        value: option_data[0].CancelRemark[stat].Status,
        text : option_data[0].CancelRemark[stat].Status 
    }));
}

 },

requestInvoiceReports : function(collections,response){

   $(".loadingBlock").hide();
   console.log(response);

reportsuccess(response);
var option_data = new Array();

option_data[0] = response;

var compiledTemplate = _.template(InvoiceReportResultTemplate,{optionItem: option_data});
$("#invoiceReportResult").html(compiledTemplate);

}

});

 return InvoiceReportView;
});