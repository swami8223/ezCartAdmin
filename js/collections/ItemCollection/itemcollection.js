define([
  'jquery',
  'underscore',
  'backbone',
  'models/itemModel/itemModel'
], function($, _, Backbone, ItemModel){
  var ItemCollection = Backbone.Collection.extend({
    model: ItemModel, 
    initialize: function(){


    }

  });
 
  return ItemCollection;
});
