define([
  'underscore',
  'backbone',
], function(_, Backbone) {
  
  var EditItemModel = Backbone.Model.extend({
 //this.render();
 defaults : {
      medalHex : '#A67D3D',
      picWidth : '100px',
      githubPath : 'concat github and login'
    }

 });

  return EditItemModel;

});
