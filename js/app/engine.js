jiant.onUiBound("vs.jiantdocs", [], function($, app) {

  var subnav = app.views.subnav,
    container = app.views.container;

  jiant.xl.nav(app, app.views.nav, "Ctl", "active")();

  function updateSubnav() {
    subnav.empty();
    leftNav("h3");
  }

  function leftNav(heading) {
    if (heading == "h3" && container.find(heading).length == 0) {
      leftNav("h4");
    }
    $.each(container.find(heading), function(idx, elem) {
      var navElem = $("<li>" + $(elem).text() + "</li>");
      subnav.append(navElem);
      navElem.click(function() {
        var offset = $(elem).offset();
        offset.left -= 20;
        offset.top -= 90;
        $('html, body').animate({
          scrollTop: offset.top,
          scrollLeft: offset.left
        });
      });
    });
  }

  function load(container, url) {
    container.load(url, function() {
      updateSubnav();
      container.find('pre code').each(function(i, e) {hljs.highlightBlock(e)});
      container.find("._visualizeCtl").click(function() {
        jiant.visualize()
      });
      $.each(container.find("._loadable"), function(idx, elem) {
        elem = $(elem);
        var url = elem.data("url");
        load(elem, url);
      })
    });
  }

  $.each(app.states, function(stateId, stateSpec) {
    stateSpec.start(function() {
      app.views.container.empty();
      load(app.views.container, stateSpec.url);
    });
  });

  app.states[""].start(function() {
    app.states.main.go();
  });

});