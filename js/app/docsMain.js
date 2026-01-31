jiant.module("docsMain", function({app, jiant}) {
  function unwrapView(view) {
    if (!view) {
      return null;
    }
    return view._el || view.el || view;
  }

  function firstViewElem(view) {
    const el = unwrapView(view);
    if (!el) {
      return null;
    }
    if (el.nodeType) {
      return el;
    }
    if (Array.isArray(el)) {
      return unwrapView(el[0]) || null;
    }
    if (typeof el.length === "number" && (typeof el.item === "function" || el[0])) {
      return unwrapView(el[0]) || null;
    }
    return el;
  }

  function clearElem(view) {
    const el = firstViewElem(view);
    if (!el) {
      return;
    }
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function addClass(view, cls) {
    const el = firstViewElem(view);
    if (el && el.classList) {
      el.classList.add(cls);
    }
  }

  function removeClass(view, cls) {
    const el = firstViewElem(view);
    if (el && el.classList) {
      el.classList.remove(cls);
    }
  }

  function appendTo(target, node) {
    const targetEl = firstViewElem(target);
    const nodeEl = unwrapView(node);
    if (targetEl && nodeEl) {
      targetEl.appendChild(nodeEl);
    }
  }

  function onClick(view, handler) {
    const el = firstViewElem(view);
    if (el) {
      el.addEventListener("click", handler);
    }
  }

  jiant.onApp("jDocs", function(app) {

    const topicCtls = {};

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
      currentTopic && topicCtls[currentTopic] && removeClass(topicCtls[currentTopic], "selected");
      currentSubtopic && topicCtls[currentSubtopic] && removeClass(topicCtls[currentSubtopic], "selected");
      currentTopic = topic;
      currentSubtopic = subtopic;
      topicCtls[currentTopic] && addClass(topicCtls[currentTopic], "selected");
      currentSubtopic && topicCtls[subtopic] && addClass(topicCtls[subtopic], "selected");
    }

    function showTopic(topic, subtopic, section) {
      jiant.loadModule(app, subtopic, function() {
        const containerEl = firstViewElem(app.views.main.container) || document;
        containerEl.querySelectorAll("pre code").forEach(function(block) {
          hljs.highlightBlock(block);
        });
        updateSubnav(section);
      }, true, app.views.main.container);
    }

    function updateSubnav(section) {
      clearElem(app.views.main.subnav);
      const navRoot = firstViewElem(app.views.nav);
      addSubnavItem(app.intl.onTop(), navRoot, 0);
      const containerEl = firstViewElem(app.views.main.container);
      if (!containerEl) {
        return;
      }
      Array.from(containerEl.querySelectorAll("h4")).forEach(function(elem, i) {
        addSubnavItem(elem.innerHTML, elem, i);
        if (i === section) {
          if (typeof elem.scrollIntoView === "function") {
            elem.scrollIntoView({behavior: "smooth"});
          }
        }
      });
    }

    function addSubnavItem(label, elem, idx) {
      const v = app.templates.subnav.parseTemplate({label: label});
      appendTo(app.views.main.subnav, v);
      onClick(v, function() {
        app.states[""].go(undefined, undefined, idx, new Date().getTime());
      });
    }

    Object.entries(app.topics).forEach(function([topic, content]) {
      const navItem = app.templates.nav.parseTemplate({label: topic});
      appendTo(app.views.nav, navItem);
      onClick(navItem.ctl, function() {
        app.states[""].go(topic, topic + "0", 0);
      });
      topicCtls[topic] = navItem;
      Object.entries(content).forEach(function([sub, subcontent]) {
        const subnav = app.templates.nav.parseTemplate({label: sub});
        appendTo(navItem.container, subnav);
        onClick(subnav.ctl, function() {
          app.states[""].go(topic, sub, 0);
        });
        const subnavContainerEl = firstViewElem(subnav.container);
        if (subnavContainerEl) {
          subnavContainerEl.remove();
        }
        topicCtls[sub] = subnav;
        jiant.module(sub, {html: "html/doc/" + sub + ".html"});
      });
    });

    setup();

  });

});
