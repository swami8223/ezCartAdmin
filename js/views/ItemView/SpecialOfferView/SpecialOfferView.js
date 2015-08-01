define([
'jquery',
  'underscore',
  'backbone',
  'collections/ItemCollection/searchCollection',
  'collections/ItemCollection/specialOfferCollection/loadOfferCollection',
  'views/ItemView/itemDisplayView',
  'collections/ItemCollection/SpecialOfferCollection/specialOfferFormSubmitCollection',
  'text!../../../../templates/item/SpecialOfferTemplate/specialOfferTemplate.html',
    'text!../../../../templates/item/SpecialOfferTemplate/specialOfferTemplateupdate.html',
      'text!../../../../templates/item/SpecialOfferTemplate/specialOfferTemplateimageUpload.html',


  'text!../../../../templates/item/SpecialOfferTemplate/specialOffereditTemplate.html',
  'text!../../../../templates/item/SpecialOfferTemplate/specialOfferProductTemplate.html'
 ],function($,_,Backbone,SearchCollection,LoadOfferCollection,ItemDisplayView,SpecialOfferForm,SpecialOfferTemplateCreate,SpecialOfferTemplateEdit,SpecialOfferTemplateImage,SpecialOfferEditTemplate,SpecialOfferPrductTemplate){

//homeTemplate = _.template( $("#home-content").html());

var SpecialOfferView = ItemDisplayView.extend({


  initialize : function(){
      //$("#itemDiv").html("");
      //this.render();
      
  },

events :{
'keyup #specialOffer .product-search'  : 'product_search',
'click #specialOffer .searchCategory2 li a'  : "select_search",
'focusout .offer-price':"updateOfferPrice",
'focusout .offer-qty':"updateOfferPrice",
'click #specialOffer #create-offer' : 'submit_offer',
'change #specialOffer #selectmenu ' : 'select_offer',
'click #specialOffer #edit-offer' : 'submit_offer',
'click #resetOffer' : 'reset_offer',
'click .remove': 'remove_product'
},




	render : function(type){
        $(".active").removeClass("active");
$("#menu-11").addClass("active");
         $("#ItemDisplay").remove();
         $("#itemDiv").append('<div id="ItemDisplay"></div>');
        // var compiledTemplate = _.template(SpecialOfferTemplate);
         $("#ItemDisplay").append('<div id="specialOffer" class="speecialOffer"></div>');
         //$("#specialOffer").html(compiledTemplate);
         this.load_offer()
         this.type = type

},

reset_offer : function(){

$(".Offer-Product").html("");
$("#offerImage").attr("src","images/sabari.png");
$(".total-price").html("");
$("#Offer_name").val("");
$("#offer_id").val("");
},
load_offer : function(){
this.loadOfferCollection = new LoadOfferCollection({type:"load_offer"});
this.listenTo(this.loadOfferCollection, 'add', this.load_offers);

this.loadOfferCollection.fetch({type:'POST','Access-Control-Allow-Credentials' : 'true',
xhrFields: {
       withCredentials: true
    }
  })


},
load_offers : function(collections,response){
   var option_data = new Array();
   var response = this.loadOfferCollection.toJSON();
 option_data = response;

if(this.type == 1){
var compiledTemplate = _.template(SpecialOfferTemplateCreate,{optionItem : option_data});
}else if(this.type == 2){
var compiledTemplate = _.template(SpecialOfferTemplateEdit,{optionItem : option_data});
}else if(this.type == 3){
  var compiledTemplate = _.template(SpecialOfferTemplateImage,{optionItem : option_data});
}

// 
// 
$("#specialOffer").html(compiledTemplate);
 $(".loadingBlock").hide();
},

select_offer : function(e){
var offer_id = $(e.currentTarget).val();
//console.log("Offer name"+ offer_name);
var loadOfferCollection = new LoadOfferCollection({type:offer_id});
loadOfferCollection.fetch({success:this.get_offer, type:'POST','Access-Control-Allow-Credentials' : 'true',
xhrFields: {
       withCredentials: true
    }
  });

},

get_offer : function(collections,response){
  var option_data = new Array();
 option_data[0] = response;
 $("#offer_id").val(option_data[0].Offers.OfferId);
  $("#Offer_name").val(option_data[0].Offers.OfferName);
  $("#displayOffer").val(option_data[0].Offers.IsAvailable);
  if(option_data[0].Offers.ImageUrl !== "" && option_data[0].Offers.ImageUrl !== null){
      $("#offerImage").attr("src",BackendURL+"/"+option_data[0].Offers.ImageUrl+"?"+Date());
  }
  else{
    $("#offerImage").attr("src","images/sabari.png");
  }

console.log("Response"+response);
 var parsedJSON = JSON.stringify(option_data);
 console.log("parsedJSON"+parsedJSON);
 var compiledTemplate = _.template(SpecialOfferEditTemplate,{option_item : option_data});
 $(".Offer-Product").html("");
$(".Offer-Product").append(compiledTemplate);
var total_price = 0;

  //$(this).parents(".price-div").find(".calc-price").html(qty * price);
  $.each($(".calc-price"),function(){
    total_price = parseInt($(this).html())+total_price;
    $(".total-price").html(total_price);

});
},

product_search : function(e){

  e.preventDefault();
    var unicode=e.keyCode? e.keyCode : e.charCode
      console.log(unicode)
     var searchBox = $(e.currentTarget);
     var searchValue = searchBox.val();
  
 switch(unicode)
{

  // On Enter Press
case 13:
  $(".searchResults").hide(); 
$(".loadingBlock").hide();
  this.getProductDetails();
  break;
//On Back Press
case 8:
   $(".searchResults").hide();
   searchBox.val(""); 
  break;

default:
if(searchValue.length > 2 && isNaN(searchValue) == true ){
   this.suggestProduct(searchValue);  
}
      
}
},

 getProductDetails: function(e){

if(!isNaN(parseInt($("#search-resulit").val()))){
$("#search-id").val($("#search-resulit").val());
}  
this.searchvalue = $("#search-id").val();
searchcollection =  new SearchCollection({searchTerm : this.searchvalue});
searchcollection.fetch({success: this.ProductDetailsUpdater, type: 'POST','Access-Control-Allow-Credentials' : 'true',
xhrFields: {
       withCredentials: true
    }
  })

 },



ProductDetailsUpdater : function(collections,response){
 var option_data = new Array();
 option_data[0] = response;
 var parsedJSON = JSON.stringify(option_data);
 //console.log("parsedJSON"+response.Products.length);
 if(response.Products.length > 0){
   var compiledTemplate = _.template(SpecialOfferPrductTemplate,{option_item : option_data});
   $(".Offer-Product").append(compiledTemplate);
 }
 else {
  ShowPopUp("This product is not available");
  $("#search-resulit").val("");
 }

},


updateOfferPrice : function(e){

var Product_Pricedetails = $(e.currentTarget).parents(".ProductDiv").find(".price-div");
var qty = Product_Pricedetails.find(".offer-price").val();
var price = Product_Pricedetails.find(".offer-qty").val();
var total_price = 0;
if(qty !== undefined  && price !== undefined){

  $(e.currentTarget).parents(".price-div").find(".calc-price").html(qty * price);
  $.each($(".calc-price"),function(actual_price){
    total_price = parseInt($(this).html())+total_price;
   // alert(total_price)
    $(".total-price").html(total_price);
});

}

},


remove_product : function(e){

  
$(e.currentTarget).parents(".ProductDiv").find(".calc-price").html("0");
console.log("remove product");
this.updateOfferPrice(e);
$(e.currentTarget).parents(".ProductDiv").remove();

},

 
submit_offer : function(e){
  var offer = {};
  var ProductListarray = {};
  var ProductList = {};
  var prod = [];
  var createOrUpdate = $(e.currentTarget).attr("id");

  var errorForm = false;  
  $(".errorMessage").remove();

that.resetOffer = function(){
$(".Offer-Product").html("");
$("#offerImage").attr("src","images/sabari.png");
$(".total-price").html("");
$("#Offer_name").val("");
$("#offer_id").val("");

}   
if($("#Offer_name").val() == ""){
$("<span class='errorMessage'>Offer Name Cant be empty</span>").insertAfter("#Offer_name");
errorForm = true;  
}
if($('#displayOffer').val() == 'null'){
  $("<span class='errorMessage'>Display Offer Cant be empty</span>").insertAfter("#displayOffer");
errorForm = true;  
}
// if($("#offer_id").val() == ''){
//   $("<span class='errorMessage'>offer id Cant be empty</span>").insertAfter("#offer_id");
// errorForm = true; 
// }


  offer ['OfferName']=$("#Offer_name").val();
  offer ['ToShow'] = $('#displayOffer').val(); 
  offer['OfferId'] = $("#offer_id").val();
$.each($(".ProductDiv"),function(index){
  var ProductList = {};
  if($(this).find(".calc-price").html() == 0 || $(this).find(".calc-price").html() == "NaN"){
$("<span class='errorMessage'>Actual Price Cant be empty enter amount in offer price</span>").insertAfter(this);
errorForm = true; 
}
  ProductList ["ProductId"] = $(this).find(".product-id span").html();
  ProductList["OfferPrice"] = $(this).find(".offer-price").val();
  ProductList ["Quantity"] = $(this).find(".offer-qty").val();
  prod.push(ProductList);
});
offer['ProductList'] = prod;
if(createOrUpdate == 'create-offer'){
  var specialOfferForm = new SpecialOfferForm({type:"create"});
}
else if(createOrUpdate == "edit-offer"){
  var specialOfferForm = new SpecialOfferForm({type:"edit"});
}

if(errorForm == false){

$(".loadingBlock").css("height",$(document).height())
console.log(offer)
specialOfferForm.fetch({error:this.onErrorHandler,
  success:this.specialOfferFormformSucess,contentType:'application/json',data:JSON.stringify(offer),
xhrFields: {
       withCredentials: true
    },
    'Access-Control-Allow-Credentials' : 'true',
  type:"POST"})

}

},

onErrorHandler : function(collection, response, options) {
      console.log('membersview fetch onerrorhandler');
      alert("ERROR Server");

      $(".loadingBlock").hide();
  },

specialOfferFormformSucess : function(colection,response){
if(response.Result == 1){
   sucessPopup(response.Message);
 }
onSucessofForm(response,that.resetOffer);



}



});

 return SpecialOfferView ;
});