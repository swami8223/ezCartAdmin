define([
'jquery',
  'underscore',
  'backbone',
  'models/homeModel/homeModel',
  'collections/homeCollection/homeCollection',
  'collections/SignUpCollection/signupCollection',
  'text!../../../templates/home/homeTemplate.html'
 ],function($,_,Backbone,MenuModel,MenuCollection,SignUpCollection,HomeTemplate){


var HomeView = Backbone.View.extend({
el: "#container",
initialize: function(options){
 _.bindAll(this, 'render', 'signup_process');
 //PdpView.el = '<div class="homePage"></div>';
 //alert(this.el)
      
       // this.signup_process();
        // dispatcher.on( 'CloseView', this.close, this );
        this.menuCollection = new MenuCollection();
        this.signUpCollection = new SignUpCollection();
         //this.render();

 $("#admin-name").html(Global.getCookie("username"));
 $("#signout").html("signout");
 $("#header-contact").show();
  },

  events :{

  "click .userBLockshow li" : 'signup_process',
  "click .close" : "closePopup",
  "mouseenter #user" : 'toggleUser',
  "click .signUpbtn" : "signUp",
  'mouseleave #user' : "toggleUser"
},

render : function(){
//this.homediv = $(this.el).html(); 
//alert("home view render")
if(true){
  $(".loadingBlock").show();
 that = this;

this.listenTo(this.menuCollection, 'add', this.onDataHandler); 
this.menuCollection.fetch({type: 'POST','Access-Control-Allow-Credentials' : 'true',xhrFields: {
       withCredentials: true
    },data_type:"application/json"});  
}

else{
  that = this
  this.onDataHandler();
}
//alert("inside render")
 //$(".loadingBlock").hide();


//   if(typeof(Storage)!=="undefined" && sessionStorage.user != undefined)
//   {

//  console.log("USER ID FROM SESSION"+ sessionStorage.user );


//  $("#admin-name").html(sessionStorage.user);


//  $("#signout").html("signout");
//  $("#header-contact").show();
// }

// else{
//   Global.signout();
// }
 
},

toggleUser : function(){

$(".userBlock").toggle();
},

signup_process : function(e){
var toshowClass= $(e.currentTarget).attr("id");
$("."+toshowClass).show();
},


closePopup : function(){
  $(".signupBLock").hide();
    $(".error").html("");
   // $(".loadingBlock").hide()
   $(".errorMessage").remove();
$("#signupform").clearform();
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

onDataHandler :function() {


      var option_data= this.menuCollection.toJSON();;
     console.log(JSON.stringify(option_data));

    if(option_data[0].Result == 2){
      Global.signout();
    }

      var compiledTemplate = _.template(HomeTemplate,{optionItem: option_data});
     // $(".homePage").append(compiledTemplate);

     console.log($(this.el))
      $(that.el).html('<div id="homePage" class="homePage"></div>');
     //alert(that.el);
      $(".homePage").append(compiledTemplate);
     // $(".homePage").append(compiledTemplate);
   $(".loadingBlock").hide();
      },


onClose : function(){
 
      // this.childViews.forEach(function (view){
      //     view.close();
      // });
}

});

 


 return HomeView;
});