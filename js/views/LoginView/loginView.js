  define([
'jquery',
  'underscore',
  'backbone',
  'views/homeView/homeView',
  'text!../../../templates/login/login.html',
  'collections/loginCollection/loginCollection'
 ],function($,_,Backbone,HomeView,LoginTemplate,LoginCollection){

//homeTemplate = _.template( $("#home-content").html());

var LoginView = Backbone.View.extend({

loginObject : new Object(),

el : $("#container"),
  initialize : function(){
    

},
events :{

	"click #login-btn" : 'login_process'
},

login_process : function(e){
//e.preventdefault();

if($("#username").val() !=="" && $("#password").val() !== ""){
  loadShow()
  this.loginObject.User_Id = $("#username").val();
this.loginObject.Password = $("#password").val();
this.loginObject.Role = 'admin';
this.loginObject.RememberMe = 'true';
console.log("LOFGIn"+$("#login_form").serialize());
this.loginCollection.fetch({type: 'POST',xhrFields: {
       withCredentials: true
    },data : this.loginObject,data_type:"application/json"});
}

else{

  alert("INVALID USERNAME/PASSWORD")
}

},



checkLoginResult : function(){
 //this.router = new ApplicationRouter();
//this.router.navigate("home", true);
$(".loadingBlock").hide();
var JsonData = this.loginCollection.toJSON();
if(JSON.stringify(JsonData[0].Result) == 0){

     alert("INVALID USERNAME/PASSWORD");
     return;
 
}
else if(JSON.stringify(JsonData[0].Result) == 1){
   //window.location.href = '#/home'
  //alert("Session"+sessionStorage.auth)




Global.setCookie("username",this.loginObject.User_Id,1)

 console.log("USER ID FROM SESSION"+this.loginObject.User_Id);



    //console.log("USER ID FROM SERVER"+this.loginObject.Information[0].UserInfo.Userid);
    window.location.href = '#/home'



}
//
},

allowLogin : function(){
 // alert("fs");
  //this.document.pages.at(2).open();
  
},
render : function(){
//var JsonData = this.orderCollection.toJSON();
var compiledTemplate = _.template(LoginTemplate);

//$("#container").append('<section id="login"></section>')
this.loginCollection = new LoginCollection();
this.$el.html(compiledTemplate);
this.listenTo(this.loginCollection, 'add', this.checkLoginResult);
},



initialize  : function(){
$("#header-contact").hide();
}



});

//


 return LoginView;
});