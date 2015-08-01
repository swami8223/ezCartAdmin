define([
'jquery',
  'underscore',
  'backbone',
  'models/homeModel/homeModel',
  'collections/NotifyCollection/notifyCollection',
  'text!../../../templates/notify/notifyTemplate.html'
 ],function($,_,Backbone,MenuModel,NotifyCollection,NotifyPermissionTemplate){

var NotifyView = Backbone.View.extend({
el: $("#notification"),
initialize: function(options){

        this.notifyCollection = new NotifyCollection();
        this.listenTo(this.notifyCollection, 'add', this.updateNotify,this.popup);
  },

 

render : function(){
  //alert("Inside render");
   var that = this;
   var compiledTemplate = _.template(NotifyPermissionTemplate);
 this.$el.html(compiledTemplate); 
  //alert("notify not working")
//http://jsfiddle.net/dandv/wT26x/

   /*this.havePermission = window.webkitNotifications.checkPermission();
   var that = this;
if(this.havePermission !== 0 ){
 var compiledTemplate = _.template(NotifyPermissionTemplate);
 this.$el.html(compiledTemplate); 
}
else{
  $("#notification").remove();
}*/

setInterval(this.check_Notify() ,3000);
 
 /*this.timer = setInterval(function() {
      that.notifyCollection.fetch({type: 'POST'})
 }, 1200);
*/
},

check_Notify : function(){
 this.notifyCollection.fetch({type: 'POST'})
//alert("jsa");
 
},


events : {

    'click #allow-notification' : 'allow_notification'
  },

updateNotify : function(){

  var that = this;
 var option_data = this.notifyCollection.toJSON();

$.each(option_data[0].Notifications, function( index, value ){
         var userName = value.UserName;
         var userId = value.UserId;
         //that.notify(value);
      }); 

},

allow_notification : function(){
$("#notification").remove();
window.webkitNotifications.requestPermission();
this.notifyCollection.fetch({type: 'POST'});  

},


notify :function (OrderDetails) {
return true;
  this.havePermission = window.webkitNotifications.checkPermission();
  if (this.havePermission == 0) {
    // 0 is PERMISSION_ALLOWED
    var notification = window.webkitNotifications.createNotification(
      'http://i.stack.imgur.com/dmHl0.png',
      'Guset '+OrderDetails.UserName+'('+OrderDetails.UserId+')'+' has an order !',
    'Invoice number'+ OrderDetails.InvoiceNo+ ' TIME ('+ OrderDetails.InvoiceDateTime +')'
    );
    
    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");
      notification.close();
    }
    notification.show();
  } else {
      window.webkitNotifications.requestPermission();
  }
} 

});

 


 return NotifyView;
});