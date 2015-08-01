define([
  'jquery',
  'underscore',
  'backbone',
  'views/ItemView/Bulkorder/bulkorderView',
  'views/ItemView/ItemsViews/edititemsView',
  'views/ItemView/CategoryView/categoryView',
  'views/ItemView/SpecialOfferView/SpecialOfferView',
  'views/OrderView/PendingOrder/pendingorderView',
  'views/Reports/UserReports/userReportView',
  'views/Reports/PorductReports/productReportView',
  'views/Reports/SalesReport/salesReportView',

  'views/OrderView/YourOrder/yourOrderView',
  'views/Reports/InvoiceReport/invoiceReportView',
  'views/ShopView/BlockView/blockShopView',
  'views/ShopView/MaptoPinView/maptoPinView',
  'views/ShopView/MaptoAdminView/maptoAdminView',
  'views/OrderView/OrderByShop/orderByShopView',
  'views/UserAccount/CreateUser',
],function($,_,Backbone,BulkorderView,EditItemsView,CategoryView,SpecialOfferView,PendingorderView,UserReportView,ProductReportView,SalesReportView,YourOrderView,InvoiceReportView,BlockShopView,MaptoPinView,MaptoAdminView,OrderByShopView,CreateUser){


var initialize =  function(){
	//alert("PdpView")
    
   var itemMenu_router = new ItemMenuRouter();
   var bulkorderView,createItemsView,editItemsView,categoryView,specialOfferView,
   pendingorderView,userReportView,productReportView,yourOrderView,invoiceReports,blockShopView,maptoPinView,maptoAdmin;
  var orderByShopView,salesReportView;
   

   itemMenu_router.on("route:Bulk_order",function(){
//alert("inside bulk order")
    //this.showView();
      // if(!bulkorderView){
      //   bulkorderView = new BulkorderView();
        
      // }
      // else{
      //     bulkorderView.delegateEvents();
  

      // }

      try{
bulkorderView.undelegateEvents();
}catch(e){

   console.log(e)
}

       bulkorderView = new BulkorderView();
            bulkorderView.render();
       
   });
 
     itemMenu_router.on("route:Items_Page-a",function(){

             try{
editItemsView.undelegateEvents();
}catch(e){

   console.log(e)
}

editItemsView = new EditItemsView();
       editItemsView.render(1);
    
    });
        itemMenu_router.on("route:Items_Page-b",function(){



             try{
editItemsView.undelegateEvents();
}catch(e){

   console.log(e)
}

editItemsView = new EditItemsView();
       editItemsView.render(2);
    
    });
           itemMenu_router.on("route:Items_Page-c",function(){


             try{
editItemsView.undelegateEvents();
}catch(e){

   console.log(e)
}

editItemsView = new EditItemsView();
       editItemsView.render(3);
    
    });


itemMenu_router.on("route:SpecialOffer_page-a",function(){
try{
 specialOfferView.undelegateEvents();
}catch(e){
  console.log(e)
}
  specialOfferView = new SpecialOfferView();
specialOfferView.render(1);

       
    
    });
itemMenu_router.on("route:SpecialOffer_page-b",function(){
try{
 specialOfferView.undelegateEvents();
}catch(e){
  console.log(e)
}
  specialOfferView = new SpecialOfferView();
specialOfferView.render(2);

  
    
    });
itemMenu_router.on("route:SpecialOffer_page-c",function(){
try{
 specialOfferView.undelegateEvents();
}catch(e){
  console.log(e)
}
  specialOfferView = new SpecialOfferView();
specialOfferView.render(3);

   
    });

itemMenu_router.on("route:Category_page-a",function(){

try{
         categoryView.undelegateEvents();
}catch(e){
  console.log(e)
}
 categoryView = new CategoryView();
categoryView.render(1);

       
    
    });
itemMenu_router.on("route:Category_page-b",function(){
try{
         categoryView.undelegateEvents();
}catch(e){
  console.log(e)
}
 categoryView = new CategoryView();
categoryView.render(2);

  
    });
itemMenu_router.on("route:Category_page-c",function(){
try{
         categoryView.undelegateEvents();
}catch(e){
  console.log(e)
}
 categoryView = new CategoryView();
categoryView.render(3);

       
    
    });

itemMenu_router.on("route:Pending_order",function(){
  // this.showView();
try{
pendingorderView.undelegateEvents();
}catch(e){

   console.log(e)
}
// if(!pendingorderView){
//    pendingorderView = new PendingorderView();
// }

// else{
//   pendingorderView.render();
// }

   pendingorderView = new PendingorderView();
  pendingorderView.render();
       
    
    
    });

itemMenu_router.on("route:User_reports",function(){
  // this.showView();


//  if(!userReportView){
//  userReportView = new UserReportView();
// }else{
//          userReportView.delegateEvents();
         
//        }
$(".active").removeClass("active");
$("#menu-16").addClass("active");
try{
userReportView.undelegateEvents();
}catch(e){
   console.log(e)
}
userReportView = new UserReportView();
userReportView.render();
});




itemMenu_router.on("route:Product_reports",function(){
 //this.showView();

$(".active").removeClass("active");
$("#menu-17").addClass("active");


try{
         productReportView.undelegateEvents();
         
       }catch(e){
 console.log(e)
       }

   productReportView = new ProductReportView();     
productReportView.render();
});


itemMenu_router.on("route:Your_order",function(){
 this.showView();
try{
yourOrderView.undelegateEvents();
}catch(e){

   console.log(e)
}


 yourOrderView = new YourOrderView();

yourOrderView.render();
});



itemMenu_router.on("route:Invoice_reports",function(){
 this.showView();
try{
invoiceReportView.undelegateEvents();
}catch(e){

   console.log(e)
}
 invoiceReportView = new InvoiceReportView();

invoiceReportView.render();
});


itemMenu_router.on("route:Block_shop",function(){

try{
blockShopView.undelegateEvents();
}catch(e){

   console.log(e)
}

 blockShopView = new BlockShopView();

blockShopView.render();
});



itemMenu_router.on("route:MapToPin_shop",function(){

 this.showView();

 try{
maptoPinView.undelegateEvents();
}catch(e){

   console.log(e)
}


 maptoPinView = new MaptoPinView();

maptoPinView.render();
});


itemMenu_router.on("route:MapToAdmin_shop",function(){
 this.showView();
 try{
maptoAdminView.undelegateEvents();
}catch(e){

   console.log(e)
}


 maptoAdminView = new MaptoAdminView();

maptoAdminView.render();
});



itemMenu_router.on("route:OrderbyShop",function(){
 this.showView();

  try{
orderByShopView.undelegateEvents();
}catch(e){

   console.log(e)
}
orderByShopView = new OrderByShopView();
orderByShopView.render();
// maptoAdminView = new MaptoAdminView();
//maptoAdminView.render();

});

itemMenu_router.on("route:sales_report",function(){
   this.showView();
  try{
salesReportView.undelegateEvents();
}catch(e){

   console.log(e)
}
salesReportView = new SalesReportView();
salesReportView.render();


});
itemMenu_router.on("route:CreateUser",function(){
   this.showView();
  try{
CreateUser.undelegateEvents();
}catch(e){

   console.log(e)
}
createUser = new CreateUser();
createUser.render();


});


  //Backbone.history.start();
};
(function(){

  window.App = {
      Models: {},
      Collections: {},
      Views: {},
      Router: {}
  };

})();

var ItemMenuRouter = Backbone.Router.extend({
    routes: {
      'menu-8' : 'Bulk_order',
      'menu-10-a' : 'Items_Page-a',
      'menu-10-b' : 'Items_Page-b',
      'menu-10-c' : 'Items_Page-c',

      'menu-11-a' : 'SpecialOffer_page-a',
      'menu-11-b' : 'SpecialOffer_page-b',
      'menu-11-c' : 'SpecialOffer_page-c',

      'menu-12-a' : 'Category_page-a',
      'menu-12-b' : 'Category_page-b',
      'menu-12-c' : 'Category_page-c',

      'menu-13' : 'Pending_order',
      'menu-14' : 'Your_order',
      'menu-16' : 'User_reports',
      'menu-17' : 'Product_reports',
      'menu-18' : 'Invoice_reports',
      'menu-19' : 'sales_report',
      'menu-22' : 'Block_shop',
      'menu-23' : 'MapToPin_shop',
      'menu-24' : 'MapToAdmin_shop',
      'menu-25' : 'OrderbyShop',
      'menu-15' : 'CreateUser'
      
     },

showView: function (view) {
        if (this.currentView) {
console.log("VIEW"+this.currentView);
         // this.currentView.close()

          console.log("on close")
  this.currentView.remove();
  this.currentView.unbind();

 // $("#web-box").append("<div id='container'></div>")
        };
        // $('.container').html(view.$el);
        // this.currentView = view;
        //return view;
    },

  });


 return { 
    initialize: initialize
  };
});


