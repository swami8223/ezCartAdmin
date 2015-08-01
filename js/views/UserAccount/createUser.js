define([
'jquery',
  'underscore',
  'backbone',
  'views/UserAccount/userAccountView',
    'collections/SignUpCollection/signupCollection',
  'text!../../../templates/account/createaccount.html',
 ],function($,_,Backbone,AccountView,SignUpCollection,Createaccount){

//homeTemplate = _.template( $("#home-content").html());

var CreateUSer = AccountView.extend({


events:{
  "click .signUpbtn" : "signUp",

 },

  initialize : function(){
$(".active").removeClass("active");
$("#menu-15").addClass("active");
var compiledTemplate = _.template(Createaccount);
$("#UserAccount").html(compiledTemplate);
 $(".loadingBlock").hide();
 this.signUpCollection = new SignUpCollection();
},

signUp : function(){



  //alert("SIGNUP");

if($("#signupform").validateForm() ==  true){
   $(".loadingBlock").show();
    var signUpdetails = $("#signupform").serialize();
  console.log(signUpdetails);
this.signUpCollection.fetch({success :this.signUpSucess,type:'POST',data:signUpdetails,'Access-Control-Allow-Credentials' : 'true',xhrFields: {
       withCredentials: true
    },data_type:"application/json"});
}

},

signUpSucess: function(collections,response){
//console.log(response);
 $(".error").html("");
//$(".signupBLock").hide();
 $(".loadingBlock").hide();
 //console.log(response.Result)
 if(response.Result !=1){
    $(".error").show();
  $(".error").html(response.Message)
 }
 if(response.Result ==1){
  alert("Register succesfull");
  $("#signupform").clearform();
  $(".signupBLock").hide();
   // $(".error").html("");


  //$(".error").html(response.Message)
 }


},











});

//


 return CreateUSer;
});