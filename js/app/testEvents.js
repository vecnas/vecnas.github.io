jiant.module("testEvents", function($, app) {

  var e = app.events.test = {};

  jiant.onUiBound(app, function() {
    var h1 = e.on(function() {
      jiant.info(1);
    });
    var h2 = e.on(function() {
      jiant.info(2);
    });
    e.fire();
    e.off(undefined);
    e.fire();
  });

});