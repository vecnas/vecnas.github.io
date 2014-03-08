var vs = vs || {};
vs.jiantdocs = (function($, undefined) {

  var container = jiant.container,
      label = jiant.label,
      ctl = jiant.ctl,
      input = jiant.input,
      inputInt = jiant.inputInt;

  return {
    id: "vs.jiantdocs",
    appPrefix: "_",

    logic: {},

    ajax: {},

    events: {},

    states: {

      "": {},

      doc: {
        url: "doc/doc.html"
      },

      main: {
        url: "main/main.html"
      },

      basics: {
        url: "doc/basics.html"
      },

      states: {
        url: "doc/states.html"
      },

      models: {
        url: "doc/models.html"
      },

      logic: {
        url: "doc/logic.html"
      },

      templates: {
        url: "doc/templates.html"
      },

      views: {
        url: "doc/views.html"
      },

      events: {
        url: "doc/events.html"
      },

      ajax: {
        url: "doc/ajax.html"
      },

      details: {
        url: "doc/details.html"
      },

      project: {
        url: "receipts/project.html"
      },

      xl: {
        url: "xl/xl.html"
      }

    },

    views: {

      container: {},

      nav: {
        docCtl: jiant.ctl,
        basicsCtl: jiant.ctl,
        statesCtl: jiant.ctl,
        modelsCtl: jiant.ctl,
        logicCtl: jiant.ctl,
        templatesCtl: jiant.ctl,
        viewsCtl: jiant.ctl,
        eventsCtl: jiant.ctl,
        ajaxCtl: jiant.ctl,
        detailsCtl: jiant.ctl,
        mainCtl: jiant.ctl,
        projectCtl: jiant.ctl,
        xlCtl: jiant.ctl
      },

      subnav: {}

    },

    templates: {},

    models: {}

  };

})(jQuery, undefined);