define([
  'jquery',
  'underscore',
  'backbone'
], function($,_,Backbone) {
App.Model.authentication= Backbone.Model.extend({
    defaults: {
        Username: "",
        Password: "",
        RememberMe: false,
        LoginFailed: false,
        LoginAccepted: false
    },
    url:"api/authentication"
});

return ProjectModel;

});
