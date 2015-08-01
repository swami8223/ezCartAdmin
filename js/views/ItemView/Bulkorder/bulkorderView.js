define([
'jquery',
  'underscore',
  'backbone',
  'views/ItemView/ItemDisplayView',
  'text!../../../../templates/item/BulkTemplate/bulkTemplate.html'
 ],function($,_,Backbone,ItemDisplayView,BulkTemplate){

//homeTemplate = _.template( $("#home-content").html());

var BulkOrderView = ItemDisplayView.extend({


  initialize : function(){

      
      //this.render();
      //console.log(this)
    
      //this.model.on('change', this.render, this);
    //this.model.on('destroy', this.remove, this);
      
  },


	render : function(){
    //alert("inside bulk order")
    $(".active").removeClass("active");
$("#menu-8").addClass("active");
    
        $("#ItemDisplay").remove();
         $("#itemDiv").append('<div id="ItemDisplay"></div>');
     //console.log("two");
         var compiledTemplate = _.template(BulkTemplate);
       // console.log("three");
         $("#ItemDisplay").append('<div id="bulkOrder" class="bulkOrder"></div>');
         $(".bulkOrder").html(compiledTemplate);

},

events: {

'click  #bulkOrder #bulk_submit' : 'UploadExcel',
'click .bulkOrder .dummy' : 'dummy2', 
},
UploadExcel : function(e){

  alert('excel uploaded from bulk order 56 565 56');

},

  dummy2 : function(){
    alert("meow2");
  },
//_.bindAll(BulkOrderView, 'UploadExcel');
//$('.bulk_submit').bind('click', BulkOrderView.UploadExcel);

});

//


 return BulkOrderView;
});