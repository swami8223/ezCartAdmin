define([
'jquery',
  'underscore',
  'backbone',
  'views/MenuView/menuView',

 ],function($,_,Backbone,MenuView){

var AccountView = Backbone.View.extend({
el: "#container",
initialize: function(options){

//this.render();

        /*this.orderCollection = new OrderCollection();
        this.orderCollection.fetch({type:'POST'})
        this.listenTo(this.orderCollection, 'add', this.renderNotification);
        console.log("Inside order ")  */

  },

 

render : function(){



},

createMenu : function(){
      //var itemMenu_router = ItemMenuRouter.ItemMenuRouter();
     // $("#container").html("");
      $(this.el).append('<section id="menu" class="wrapper row2"></section>');
      var menuView = new MenuView({ id: 2,name:"item" }); 
     $(this.el).append('<section id="UserAccount"></section>')
       //var pendingorderView = new PendingorderView();
       //pendingorderView.render();
       //itemMenu_router.navigate('some_route', { trigger: true });

},




});

 


 return  AccountView;
});