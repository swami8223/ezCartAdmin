define([
  'jquery',
  'underscore',
  'backbone'
], function($,_,Backbone) {
  
  var AuthenticatingModel = Backbone.Model.extend({

   islogedin: true,

   isLogin:function(){
   //alert(Global.getCookie('ASP.NET_SessionId'));
   var auth =  sessionStorage.auth;
   return auth;
   }

  });

  return AuthenticatingModel;

});
