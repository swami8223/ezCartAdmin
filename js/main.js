require.config({

paths: {

jquery : "libs/jquery/jquery-min",
underscore : "libs/underscore/underscore-min",
backbone : "libs/backbone/backbone-min",
template : "../templates",

}
});
require([
'app', 'backbone'
],function (App,Backbone) {

	// body...

App.initialize();

 Backbone.View.prototype.close = function() {
 	//alert("close")
    if (this.onClose) {
      this.onClose();
    }
    this.remove();
  };

});