define([
'jquery',
  'underscore',
  'backbone',
  'views/ItemView/itemDisplayView',
   'collections/ItemCollection/searchCollection',
      'collections/ItemCollection/CategoryCollection/categoryCollection',
        'collections/ItemCollection/CategoryCollection/ParentIdCollection',
  'text!../../../../templates/item/CategoryTemplate/createcategoryTemplate.html',
   'text!../../../../templates/item/CategoryTemplate/editcategoryTemplate.html',
    'text!../../../../templates/item/CategoryTemplate/categoryimageUpload.html',
   'text!../../../../templates/item/CategoryTemplate/parentIdTemplate.html'
 ],function($,_,Backbone,ItemDisplay,SearchCollection,CategoryCollection,ParentIdCollection,createCategoryTemplate,editCategoryTemplate,imageUpload,parentIdTemplate){

//homeTemplate = _.template( $("#home-content").html());


var CategoryView = ItemDisplay.extend({


  initialize : function(){
   
        
      
  },

events : {

'change #CategoryView #selectmenu' : 'update_menu',
'click #CategoryView #create-menu' : 'send_menu',
'click #CategoryView #edit-menu' : 'send_menu'
},



update_menu : function(e){
 var menu_name = $(e.currentTarget).val().split("$")[0];
 var toDisplay = $(e.currentTarget).val().split("$")[1].trim();;
  var MenuId = $(e.currentTarget).val().split("$")[2];
var image = $(e.currentTarget).val().split("$")[3];
var parentID = $(e.currentTarget).val().split("$")[4];
var tabIndex = $(e.currentTarget).val().split("$")[5];
 //toDisplay = toDisplay == 'Y' ? 'Yes' : 'No';
 $("#Menu").val(menu_name);
 $("#displayProduct").val(toDisplay);
$("#MenuId").val(MenuId);
$("#selectParentMenu").val(parentID.trim());
$("#TabIndex").val(tabIndex);

if(image  !== "" && image  !== null){
  $("#categoryImage").attr("src",Global.BackendURL+"/"+image+"?"+Date());
}
else{
  $("#categoryImage").attr("src","images/sabari.png");
}




},

send_menu : function(e){


  var createOrUpdate = $(e.currentTarget).attr("id");
    var errorForm = false;  
var menuJson = []
var menuData = {};
menuData['MenuName'] = $("#Menu").val();
menuData['MenuId'] = $('#MenuId').val();
menuData['TabIndex'] = $('#TabIndex').val();
menuData['ActionUrl'] = null;
menuData['ParentId'] = $("#selectParentMenu").val();
menuData['ToShow'] = $("#displayProduct").val();
//menuJson.push(menuData)
$(".errorMessage").remove();


if(menuData['MenuName'].trim() == "" ){
  $("<span class='errorMessage'>Category Name Cant be empty</span>").insertAfter("#Menu");
errorForm = true; 
}

// if(menuData['MenuId'] == "" ){
//   $("<span class='errorMessage'>MenuID Cant be empty</span>").insertAfter("#MenuId");
// errorForm = true; 
// }
if(menuData['TabIndex'].trim() == ""  || isNaN((menuData['TabIndex'])) ){
  $("<span class='errorMessage'>TabIndex Is not Valid</span>").insertAfter("#TabIndex");
errorForm = true; 
}

// if(isNaN(menuData['MenuId']) != false){
// $("<span class='errorMessage'>MenuID Cant be TEXT</span>").insertAfter("#MenuId");
// errorForm = true; 
// }

if(menuData['ToShow'] == "null"){
  $("<span class='errorMessage'>Display Cant be empty</span>").insertAfter("#displayProduct");
errorForm = true; 
}
if(createOrUpdate == 'create-menu'){
  var categoryCollection = new CategoryCollection({type:"create"});
}
else if(createOrUpdate == "edit-menu"){
  var categoryCollection = new CategoryCollection({type:"edit"});
}

if(errorForm == false){
  $(".loadingBlock").css("height",$(document).height())
$(".loadingBlock").show();
console.log(this)
categoryCollection.fetch({error:this.categoryFormError,
  success:this.categoryFormSucess,
  contentType:'application/json',
  data:JSON.stringify(menuData),'Access-Control-Allow-Credentials' : 'true',xhrFields: {
       withCredentials: true
    },type:"POST"
})
 
}



},
categoryFormError:function(){
alert("error");
$(".loadingBlock").hide();
},
categoryFormSucess : function(collection,response,options){
this.clearform = function(){
  $("#Menu").val("");
  $("#MenuId").val("");
  $("#TabIndex").val("");
  $("#categoryImage").attr("src", "images/sabari.png");
}
if(response.Result == 1){
   sucessPopup(response.Message);
 }
onSucessofForm(response,this.clearform);

},

render : function(type){
      $(".active").removeClass("active");
$("#menu-12").addClass("active");
       $("#ItemDisplay").remove();
       $("#itemDiv").append('<div id="ItemDisplay"></div>');
        // var compiledTemplate = _.template(CategoryTemplate);
          $("#ItemDisplay").append('<div id ="CategoryView" class="itemsView"></div>');
       if(type == 1){
         this.createloadMenu( this.loadPrentMenu);
       }else if(type == 2){
        this.updateloadMenu( this.loadPrentMenu);
       }
       else if(type == 3){
        this.imageloadMenu( this.loadPrentMenu);
       }
      


},

createloadMenu:function(callback){
   $(".loadingBlock").show();
          searchcollection =  new SearchCollection({loadMenu : true });     
          
          searchcollection.fetch({ success : function(collection,response){
          var option_data = new Array();
          option_data[0] = response;



         var compiledTemplate = _.template(createCategoryTemplate,{optionItem: option_data});
            $("#CategoryView").html(compiledTemplate);
           callback()
          },type: 'POST'});

},
updateloadMenu:function(callback){
   $(".loadingBlock").show();
          searchcollection =  new SearchCollection({loadMenu : true });     
          
          searchcollection.fetch({ success : function(collection,response){
          var option_data = new Array();
          option_data[0] = response;



         var compiledTemplate = _.template(editCategoryTemplate,{optionItem: option_data});
            $("#CategoryView").html(compiledTemplate);
           callback()
          },type: 'POST'});

},
imageloadMenu:function(callback){
   $(".loadingBlock").show();
          searchcollection =  new SearchCollection({loadMenu : true });     
          
          searchcollection.fetch({ success : function(collection,response){
          var option_data = new Array();
          option_data[0] = response;



         var compiledTemplate = _.template(imageUpload,{optionItem: option_data});
            $("#CategoryView").html(compiledTemplate);
           callback()
          },type: 'POST'});

},
loadPrentMenu:function(){
parentcollection =  new ParentIdCollection();   
parentcollection.fetch({ success : function(collection,response){
var option_data = new Array();
option_data[0] = response;
var compiledTemplate = _.template(parentIdTemplate,{optionItem: option_data});
$(".ParentDiv").html(compiledTemplate);
 $(".loadingBlock").hide();
  },type: 'POST'});
},


});

 return CategoryView;
});