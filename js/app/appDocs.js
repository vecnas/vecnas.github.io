$(function() {
  jiant.DEV_MODE = true;
  var app = {

    id: "jDocs",

    appPrefix: "_",

    modulesPrefix: "../js/app/",

    modules: ["docsMain"],

    intl: {
      i18n: 1,
      url: "ru.json",
      t: function(val) {},
      onTop: function(val) {},
      loadError: function() {}
    },

    states: {
      "": {
        jDefaults: {
          topic: "basics"
        },
        go: function(topic, subtopic) {},
        start: function(cb) {},
        end: function(cb) {}
      }
    },

    views: {
      nav: {},
      main: {
        container: jiant.container,
        subnav: jiant.container
      }
    },

    templates: {
      nav: {
        impl: "<b><li><a class='_label _ctl'></a><ul class='_container nav navbar-nav'></ul></li></b>",
        label: jiant.nlabel,
        ctl: jiant.ctl,
        container: jiant.container
      },
      subnav: {
        impl: "<b><div class='_label'></div></b>",
        label: jiant.label
      }
    },

    topics: {

      basics: {
        basics0: {},
        basics_concepts: {}
      },

      views: {
        views0: {},
        templates: {},
        viewsElems: {}
      },

      models: {
        models0: {}
      },

      modules: {
        modules0: {}
      },

      ajax: {
        ajax0: {}
      },

      events: {
        events0: {}
      },

      semaphores: {
        semaphores0: {}
      },

      states: {
        states0: {}
      },

      logics: {
        logics0: {}
      },
      i18n: {
        i18n0: {}
      },
      xl: {
        xl0: {}
      },
/*
      misc: {
        misc0: {}
      }
*/
    }

  };
  jiant.bindUi(app);
});