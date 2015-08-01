define([
'jquery',
  'underscore',
  'backbone',
  'views/ItemView/ItemView',
  'views/ItemView/Bulkorder/bulkorderView',
 ],function($,_,Backbone,ItemView,BulkorderView){

//homeTemplate = _.template( $("#home-content").html());

var ItemDisplayView = ItemView.extend({


  initialize : function(){
this.bulkorderView;

      
  },


  render : function(){
    $("#itemDiv").html("");
     // console.log("0ne")
        $("#itemDiv").append('<div id="ItemDisplay"></div>');
      /*if(!this.bulkorderView){
        this.bulkorderView = new BulkorderView();
      }else{
        this.bulkorderView.delegateEvents();
      }
      this.bulkorderView.render() */
      



},

events: {

'click .bulkOrder .dummy' : 'dummy2',
},


  dummy2 : function(){
    alert("meow2");
  },
//_.bindAll(BulkOrderView, 'UploadExcel');
//$('.bulk_submit').bind('click', BulkOrderView.UploadExcel);

});

//


 return ItemDisplayView;
});