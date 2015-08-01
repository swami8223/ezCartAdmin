define([
  'jquery',
  'underscore',
  'backbone',
  'views/homeView/homeView',
  'views/ItemView/itemView',
  'views/Notify/notifyView',
  'views/OrderView/orderView',
  'views/OrderView/OrderSheet/orderSheetView',
  'views/LoginView/loginView',
  'views/Reports/reportView',
  'views/ShopView/shopView',
  'views/UserAccount/userAccountView',
  'models/authenticatingModel/authenticatingModel'
],function($,_,Backbone,HomeView,ItemView,Notify,OrderView,OrderSheetView,LoginView,ReportView,ShopView,AccountView,Auth){


var initialize =  function(){
	//alert("PdpView"),
    this.ok = "samantha";
  
   window.app_router = new AppRouter ();
   //window.mainRouter = app_router;
    var auth = new Auth();
   var homeView,itemView,notify,orderView,orderSheetView,loginView,reportView,shopView;


 setInterval( function(){ 

$.ajax({
  type: "POST",
  url: "http://shoppingcartwebapi.4maven.com/Menu/GetAdminMenu/0",
  context: document.body
}).done(function() {

});

 }, 30000);






app_router.on("route:Home_page",function(){
  //alert("inside")
// if(auth.isLogin()){
// this.showView()
//  homeView = new HomeView();
// homeView.render();
// this.currentView = homeView;
// }

// else{

//         app_router.navigate('login', true);
//        }
   
  this.showView()
homeView = new HomeView();
 homeView.render();
this.currentView = homeView;


   });





app_router.on("route:Item_page",function(){
// if(auth.isLogin()){
// this.showView()
//   itemView = new ItemView();
// itemView.render();
// this.currentView = itemView;

// // if(!itemView){
// // itemView = new ItemView();
// // }else{
// // itemView.undelegateEvents() 

// // }
// //  itemView.createMenu();
//       }else{

//         app_router.navigate('login', true);
//        }

this.showView()
  itemView = new ItemView();
itemView.render();
this.currentView = itemView;

  });

app_router.on("route:Order_page",function(){
    
// if(!orderView){
//   
//  }else{
//   orderView.delegateEvents() 
//  }
// if(auth.isLogin()){
// this.showView();
//   orderView = new OrderView();
//   orderView.createMenu();
//   this.currentView = orderView;

// }else{

//         app_router.navigate('login', true);
//        }
this.showView();
  orderView = new OrderView();
  orderView.createMenu();
  this.currentView = orderView;
  });

app_router.on("route:Order_sheet",function(){

//this.showView()

    //orderSheetView.();
    // this.currentView = orderView;
// if(auth.isLogin()){
// if(!orderSheetView){
//      orderSheetView = new OrderSheetView();
//  }else{
//   orderSheetView.delegateEvents() 
//  }
//   //

// }
if(!orderSheetView){
     orderSheetView = new OrderSheetView();
 }else{
  orderSheetView.delegateEvents() 
 }
  //
  });
app_router.on("route:Login_page",function(actions){
    

 if(!loginView){
   loginView = new LoginView();
 }else{
  loginView.delegateEvents() 
 }
// this.showView()
  loginView.render();
  // this.currentView = orderView;

  }); 

app_router.on("route:Report_page",function(actions){
  //alert("report")
//   if(auth.isLogin()){
//     this.showView();
//     reportView = new ReportView();
//    //reportView.render();
//      this.currentView = reportView;
//  // if(!reportView){
   
//  // }else{
//  //  //reportView.delegateEvents() 
//  // }

//   reportView.render();
// }
    this.showView();
    reportView = new ReportView();
   //reportView.render();
     this.currentView = reportView;
 // if(!reportView){
   
 // }else{
 //  //reportView.delegateEvents() 
 // }

  reportView.render();
// else{

//         app_router.navigate('login', true);
//        }
  }); 
app_router.on("route:Shop_page",function(actions){
//   if(auth.isLogin()){
//    // alert("damam;")
//    this.showView();
//    shopView = new ShopView();
// shopView.createMenu();
//  this.currentView = shopView;
//  // if(!shopView){
   
//  // }else{
//  //  shopView.delegateEvents() 
//  // }
   
//   //shopView.render();
// }
// else{

//         app_router.navigate('login', true);
//        }
   this.showView();
   shopView = new ShopView();
shopView.createMenu();
 this.currentView = shopView;
  }); 


app_router.on("route:User_account",function(actions){
//   if(auth.isLogin()){
//    // alert("damam;")
//    this.showView();
//    shopView = new ShopView();
// shopView.createMenu();
//  this.currentView = shopView;
//  // if(!shopView){
   
//  // }else{
//  //  shopView.delegateEvents() 
//  // }
   
//   //shopView.render();
// }
// else{

//         app_router.navigate('login', true);
//        }
   this.showView();
   accountView = new AccountView();
accountView.createMenu();
 this.currentView = accountView;
  }); 




if(!Backbone.History.started){
  Backbone.history.start();
}
   

};




var AppRouter = Backbone.Router.extend({
    routes: {

      
      'menu-1':"Item_page",
      'menu-4':"Order_page",
      'menu-6':'Report_page',
      'menu-3':'Shop_page',
      'menu-2':'User_account',
      'order-sheet' : 'Order_sheet',
      'home': 'Home_page',
      'login':'Login_page',
      '*actions': 'Login_page',
      
    },



showView: function (view) {
        if (this.currentView) {
console.log("VIEW"+this.currentView);
         // this.currentView.close()

          console.log("on close")
  this.currentView.remove();
  this.currentView.unbind();
$("#web-box").html("")
  $("#web-box").append("<div id='container'></div>")
        };
        // $('.container').html(view.$el);
        // this.currentView = view;
        //return view;
    },


  });


(function(){

  window.App = {
      Models: {},
      Collections: {},
      Views: {},
      Router: {},
    mainRouter : {},
  initializer: function() {
    //alert("INSIDE APP INTIALIER")
     window.mainRouter = new AppRouter();
  }



  };
  App.initializer();
})();



 return { 
    initialize: initialize
  };
});



