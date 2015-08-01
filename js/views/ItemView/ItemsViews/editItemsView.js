define([
'jquery',
  'underscore',
  'backbone',
  'views/ItemView/itemDisplayView',
  'collections/ItemCollection/searchCollection',
  'collections/ItemCollection/editItemCollection/editItemCollection',
  'text!../../../../templates/item/ItemsTemplate/editItemsTemplate.html',
  'text!../../../../templates/item/ItemsTemplate/createItemsTemplate.html',
  'text!../../../../templates/item/ItemsTemplate/ItemImageUpload.html',
  
  
 ],function($,_,Backbone,ItemDisplayView,SearchCollection,EditItemCollection,EditItemsTemplate,CreateItemTeplate,ItemImageUpload){

//homeTemplate = _.template( $("#home-content").html());
var dispatcher = _.clone(Backbone.Events)
var EditItemsView = ItemDisplayView.extend({

  initialize : function(){

  //this.stopListening();
    
      //this.render();
     
      
  },
close : function(){
  console.log("View closed");
  dispatcher.off( 'CloseView', this.close, this );
},
  render : function(type){
 /*this.modal = new EditItemModel();
 this.collection = new EditItemCollection();
console.log("FROM MODAL"+this.modal.modal); */
//_.bindAll(this,'loadFormOnEdit');

this.type = type

    $(".active").removeClass("active");
$("#menu-10").addClass("active");
 dispatcher.on( 'CloseView', this.close, this );
var searchcollection = null;
         $("#ItemDisplay").remove();
         $("#itemDiv").append('<div id="ItemDisplay"></div>');
         //var compiledTemplate = _.template(ItemsTemplate);
        
         $("#ItemDisplay").append('<div id ="edititemsView" class="edititemsView"></div>');
         //$("#edititemsView").html(compiledTemplate);
         this.loadMenu(this.type);
},

loadFormOnEdit:function(){

},
loadMenu:function(type){
          searchcollection =  new SearchCollection({loadMenu : true });     
           $(".loadingBlock").show();
          searchcollection.fetch({ success : function(collection,response){
          var option_data = new Array();
          option_data[0] = response;
        if(type == 2){
             var compiledTemplate = _.template(EditItemsTemplate,{optionItem: option_data});
        }
       else if(type == 1){

var compiledTemplate = _.template(CreateItemTeplate,{optionItem: option_data});
       }

       else if(type == 3){
        var compiledTemplate = _.template(ItemImageUpload,{optionItem: option_data});
       }
          
         $("#edititemsView").html(compiledTemplate);
         $(".loadingBlock").hide();
          },type: 'POST'});





},

  events:{

    'click #edititemsView .dummy' : 'dummy2',
    'keyup #edititemsView .product-search'  : 'product_search',
    'click #edititemsView .searchCategory2 li a'  : "select_search",
    'click #edititemsView #create-item' : "create_item",
    'click #edititemsView #edit-item' : "edit_item",
  
  },


uploadImage: function(e){
  input = e
  console.log("dfd"+input.files)
if (input.files && input.files[0]) {
  console.log("inside fillinf");
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#uploadimg').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
console.log(""+$('#product-img').val());
$(".fileinput").css("background",'none');
$(".uploadimg").attr("src",$('#product-img').val());

},



create_item : function(e){
e.preventDefault();

var isvalidForm = $("#create-editForm").validateForm();
if (isvalidForm== true){
$(".loadingBlock").css("height",$(document).height())
$(".loadingBlock").show();
this.editItemCollection = new EditItemCollection({form_action:"create",form_data:$("#create-editForm").serialize()});
this.editItemCollection.fetch({ success : this.formSubmitSucess,type: 'POST',
'Access-Control-Allow-Credentials' : 'true'
,xhrFields: {
       withCredentials: true
    }
  ,data : $("#create-editForm").serialize()
  ,data_type:"application/json"});  


}
else{
  alert("not falid form")
}

},

edit_item:function(e){
e.preventDefault();
var isvalidForm = $("#create-editForm").validateForm();
if (isvalidForm== true){
$(".loadingBlock").css("height",$(document).height())
$(".loadingBlock").show();
$("#product_id").removeAttr("disabled");
this.editItemCollection = new EditItemCollection({form_action:"update",form_data:$("#create-editForm").serialize()});
$("#product_id").attr("disabled");
this.editItemCollection.fetch({ success : this.formSubmitSucess,
  type: 'POST',
  data : $("#create-editForm").serialize(),
  'Access-Control-Allow-Credentials' : 'true'
,xhrFields: {
       withCredentials: true
    }
  ,
  data_type:"application/json"});  
}
else{
   alert("not falid form")
}
},


formSubmitSucess : function(collection,response){
 // alert("from submited sucessfully");
 this.clearform = function(){
  $("#product_name").val("");
$("#product_name").val("");
$("#product_id").val("");
$("#price").val("");
$("#mrp").val("");
$("#tamilName").val("");
$("#BrandName").val("");
$("#Description").val("");
$("#itemImage").attr("src", "images/sabari.png");


 }
 if(response.Result == 1){
   sucessPopup(response.Message);
 }

onSucessofForm(response,this.clearform);

},


product_search : function(e){
    var unicode=e.keyCode? e.keyCode : e.charCode
     var searchBox = $(e.currentTarget);
     var searchValue = searchBox.val();
  console.log("UNICODE"+unicode)
 switch(unicode)
{

  // On Enter Press
case 13:
  $(".searchResults").hide(); 
  if(isNaN(searchValue) !=  true ){


searchcollection =  new SearchCollection({searchTerm :searchValue});
searchcollection.fetch({success: this.ProductDetailsUpdater, type: 'POST',
  'Access-Control-Allow-Credentials' : 'true',
xhrFields: {
       withCredentials: true
    }
  
})
}

else{
    this.getProductDetails();
}


  break;
//On Back Press
case 8:
   $(".searchResults").hide();
   searchBox.val(""); 
  break;

default:

 if(searchValue.length > 2 && isNaN(searchValue) ==  true ){
 // alert("IS NANA"+isNaN(searchValue))
  this.suggestProduct(searchValue); 
    }  



}

  


},


 getProductDetails: function(){
$("#create-editForm").clearform();
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

ProductDetailsUpdater :  function(collection,response){
  $(".loadingBlock").hide();
  var option_data = new Array();
 option_data[0] = response;
 var parsedJSON = JSON.stringify(option_data);
//console.log("MENU NAME"+option_data[0].Products[0].MenuName);
$("#search-resulit").val("");
//$("#create-editForm input").val("");
if(option_data[0].Products.length == 0){
  ShowPopUp("NO PRODUCT FOR THIS SEARCH");
  return;
}
if(option_data[0].Products[0].ImageUrl !== "" && option_data[0].Products[0].ImageUrl !== null){
  $("#itemImage").attr("src",Global.BackendURL+"/"+option_data[0].Products[0].ImageUrl+"?"+Date());
}
else{
  $("#itemImage").attr("src","images/sabari.png");
}
$("#product_name").val(option_data[0].Products[0].ProductName);
$("#product_id").val(option_data[0].Products[0].ProductId);
$("#selectmenu").val(option_data[0].Products[0].MenuName);
$("#BrandName").val(option_data[0].Products[0].BrandName);
$("#tamilName").val(option_data[0].Products[0].ProductTamilName);
$("#mrp").val(option_data[0].Products[0].Mrp);
$("#price").val(option_data[0].Products[0].Price);
$("#stockavailable").val(option_data[0].Products[0].IsStockAvailable);
$("#displayProduct").val(option_data[0].Products[0].ToShow);
$("#Description").val(option_data[0].Products[0].Description);
//$("#search-resulit").val("");
          //formModal.set(option_data[0]);
          //console.log(formModal.toJSON())
          //console.log(formModal.get("IsStockAvailabledsf"));
},
updateForm : function(){


},





});

 return EditItemsView;
});