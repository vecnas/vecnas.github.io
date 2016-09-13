jiant.module("docsMain", function($, app) {

  jiant.onUiBound(app, function($, app) {

    var topicCtls = {},
        currentTopic,
        currentSubtopic;

    function setup() {
      app.states[""].start(function(topic, subtopic, section) {
        if (! topic) {
          app.states[""].go("basics", "basics0", 0);
          return;
        }
        updateSelectedCtl(topic, subtopic, section);
      });
    }

    function updateSelectedCtl(topic, subtopic, section) {
      showTopic(topic, subtopic, section);
      currentTopic && topicCtls[currentTopic] && topicCtls[currentTopic].removeClass("selected");
      currentSubtopic && topicCtls[currentSubtopic] && topicCtls[currentSubtopic].removeClass("selected");
      currentTopic = topic;
      currentSubtopic = subtopic;
      topicCtls[currentTopic] && topicCtls[currentTopic].addClass("selected");
      currentSubtopic && topicCtls[subtopic] && topicCtls[subtopic].addClass("selected");
    }

    function showTopic(topic, subtopic, section) {
      jiant.loadModule(app, subtopic, function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
        updateSubnav(section);
      }, app.views.main.container, true);
    }

    function updateSubnav(section) {
      app.views.main.subnav.empty();
      addSubnavItem(app.logic.intl.onTop(), app.views.nav[0], 0);
      $.each(app.views.main.container.find("h4"), function(i, elem) {
        addSubnavItem($(elem).html(), elem, i);
        if (i === section) {
          elem.scrollIntoView({behavior: "smooth"});
        }
      });
    }

    function addSubnavItem(label, elem, idx) {
      var v = app.templates.subnav.parseTemplate({label: label});
      app.views.main.subnav.append(v);
      v.click(function() {
        app.states[""].go(undefined, undefined, idx, new Date().getTime());
      });
    }

    $.each(app.topics, function(topic, content) {
      var navItem = app.templates.nav.parseTemplate({label: topic});
      app.views.nav.append(navItem);
      navItem.ctl.click(function() {
        app.states[""].go(topic, topic + "0", 0);
      });
      topicCtls[topic] = navItem;
      $.each(content, function(sub, subcontent) {
        var subnav = app.templates.nav.parseTemplate({label: sub});
        navItem.container.append(subnav);
        subnav.ctl.click(function() {
          app.states[""].go(topic, sub, 0);
        });
        subnav.container.remove();
        topicCtls[sub] = subnav;
        jiant.module(sub, {html: "html/doc/" + sub + ".html"});
      })
    });

    setup();

  });

});