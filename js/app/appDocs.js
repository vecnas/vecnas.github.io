$(function() {
  jiant.DEV_MODE = true;
  var app = {

    id: "jDocs",

    appPrefix: "_",

    modulesPrefix: "js/app/",

    modules: ["docsMain"],

    logic: {
      intl: {
        i18n: 1,
        url: "html/ru.json",
        t: function(val) {},
        onTop: function(val) {},
        loadError: function() {}
      }
    },

    states: {
      "": {
        jDefaults: {
          topic: "basics"
        },
        go: function(topic, subtopic, section) {},
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
        basics_concepts: {},
        basics_binding: {},
        basics_lifecycle: {},
        basics_private: {},
        basics_app_params: {},
        basic_recipes: {}
      },

      advanced: {
        advanced0: {},
        advanced_modules: {},
        advanced_comp: {},
        advanced_refactoring: {},
        advanced_crossdomain: {},
        advanced_devmode: {},
        advanced_faststart: {},
        advanced_project: {}
      },

      views: {
        views0: {},
        templates: {},
        viewsElems: {},
        comp0: {}
      },

      models: {
        models0: {}
      },

      modules: {
        modules0: {},
        modules_libs: {}
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
      misc: {
        misc0: {},
        misc_fields: {}
      },
      xl: {
        xl0: {}
      }
    }

  };
  jiant.bindUi(app);
});