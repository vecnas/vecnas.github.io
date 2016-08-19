jiant.module("docsMain", function($, app) {

  jiant.onUiBound(app, function($, app) {

    var topicCtls = {},
        currentTopic,
        currentSubtopic;

    function setup() {
      app.states[""].start(function(topic, subtopic) {
        jiant.logInfo("showing topic " + topic);
        if (! topic) {
          app.states[""].go("basics", "basics0");
          return;
        }
        updateSelectedCtl(topic, subtopic);
      });
    }

    function updateSelectedCtl(topic, subtopic) {
      showTopic(topic, subtopic);
      currentTopic && topicCtls[currentTopic].removeClass("selected");
      currentSubtopic && topicCtls[currentSubtopic].removeClass("selected");
      currentTopic = topic;
      currentSubtopic = subtopic;
      topicCtls[currentTopic].addClass("selected");
      currentSubtopic && topicCtls[subtopic].addClass("selected");
    }

    function showTopic(topic, subtopic) {
      app.views.main.container.load("doc/" + (subtopic ? subtopic : topic) + ".html", function( response, status, xhr ) {
        if ( status == "error" ) {
          app.views.main.container.html(app.logic.intl.loadError());
        } else {
          SyntaxHighlighter.highlight();
          updateSubnav();
        }
      });
    }

    function updateSubnav() {
      app.views.main.subnav.empty();
      addSubnavItem(app.logic.intl.onTop(), app.views.nav[0]);
      $.each(app.views.main.container.find("h4"), function(i, elem) {
        addSubnavItem($(elem).html(), elem);
      });
    }

    function addSubnavItem(label, elem) {
      var v = app.templates.subnav.parseTemplate({label: label});
      app.views.main.subnav.append(v);
      v.click(function() {
        elem.scrollIntoView({behavior: "smooth"});
      });
    }

    $.each(app.topics, function(topic, content) {
      var navItem = app.templates.nav.parseTemplate({label: topic});
      app.views.nav.append(navItem);
      navItem.ctl.click(function() {
        app.states[""].go(topic, topic + "0");
      });
      topicCtls[topic] = navItem;
      $.each(content, function(sub, subcontent) {
        var subnav = app.templates.nav.parseTemplate({label: sub});
        navItem.container.append(subnav);
        subnav.ctl.click(function() {
          app.states[""].go(topic, sub);
        });
        subnav.container.remove();
        topicCtls[sub] = subnav;
      })
    });

    setup();

  });

});