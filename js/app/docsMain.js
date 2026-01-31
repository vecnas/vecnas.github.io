jiant.module("docsMain", function({app, jiant}) {
  const dom = jiant.dom;

  jiant.onApp("jDocs", function(app) {

    const topicCtls = {};
    let intlReady = false;
    let pendingSection = null;

    jiant.onApp(app, ["intl"], function() {
      intlReady = true;
      if (pendingSection !== null) {
        const section = pendingSection;
        pendingSection = null;
        updateSubnav(section);
      }
    });
    const tr = function(key) {
      return app.logic && app.logic.intl && app.logic.intl.t ? app.logic.intl.t(key) : key;
    };

    let currentTopic,
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
      currentTopic && topicCtls[currentTopic] && dom.removeClass(topicCtls[currentTopic], "selected");
      currentSubtopic && topicCtls[currentSubtopic] && dom.removeClass(topicCtls[currentSubtopic], "selected");
      currentTopic = topic;
      currentSubtopic = subtopic;
      topicCtls[currentTopic] && dom.addClass(topicCtls[currentTopic], "selected");
      currentSubtopic && topicCtls[subtopic] && dom.addClass(topicCtls[subtopic], "selected");
    }

    function showTopic(topic, subtopic, section) {
      const injectTo = dom.first(app.views.main.container);
      jiant.loadModule(app, subtopic, function() {
        const containerEl = dom.first(app.views.main.container) || document;
        if (containerEl.querySelectorAll) {
          containerEl.querySelectorAll("pre code").forEach(function(block) {
            hljs.highlightBlock(block);
          });
        }
        updateSubnav(section);
      }, true, injectTo);
    }

    function updateSubnav(section) {
      dom.empty(app.views.main.subnav);
      const navRoot = dom.first(app.views.nav);
      if (intlReady) {
        addSubnavItem(app.logic.intl.onTop(), navRoot, 0);
      } else {
        pendingSection = section;
      }
      const containerEl = dom.first(app.views.main.container);
      if (!containerEl) {
        return;
      }
      if (containerEl.querySelectorAll) {
        Array.from(containerEl.querySelectorAll("h4")).forEach(function(elem, i) {
          addSubnavItem(elem.innerHTML, elem, i);
          if (i === section && typeof elem.scrollIntoView === "function") {
            elem.scrollIntoView({behavior: "smooth"});
          }
        });
      }
    }

    function addSubnavItem(label, elem, idx) {
      const v = app.templates.subnav.parseTemplate({label: label});
      dom.append(app.views.main.subnav, v);
      dom.on(v, "click", function() {
        app.states[""].go(undefined, undefined, idx, new Date().getTime());
      });
    }

    Object.entries(app.topics).forEach(function([topic, content]) {
      const navItem = app.templates.nav.parseTemplate({label: tr(topic)});
      dom.append(app.views.nav, navItem);
      dom.on(navItem.ctl, "click", function() {
        app.states[""].go(topic, topic + "0", 0);
      });
      topicCtls[topic] = navItem;
      Object.entries(content).forEach(function([sub, subcontent]) {
        const subnav = app.templates.nav.parseTemplate({label: tr(sub)});
        dom.append(navItem.container, subnav);
        dom.on(subnav.ctl, "click", function() {
          app.states[""].go(topic, sub, 0);
        });
        dom.remove(subnav.container);
        topicCtls[sub] = subnav;
        jiant.module(sub, {html: "html/doc/" + sub + ".html"});
      });
    });

    setup();

  });

});
