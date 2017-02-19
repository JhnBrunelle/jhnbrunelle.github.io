"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('personalsite/app', ['exports', 'ember', 'personalsite/resolver', 'ember-load-initializers', 'personalsite/config/environment'], function (exports, _ember, _personalsiteResolver, _emberLoadInitializers, _personalsiteConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _personalsiteConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _personalsiteConfigEnvironment['default'].podModulePrefix,
    Resolver: _personalsiteResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _personalsiteConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('personalsite/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'personalsite/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _personalsiteConfigEnvironment) {

  var name = _personalsiteConfigEnvironment['default'].APP.name;
  var version = _personalsiteConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('personalsite/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define("personalsite/controllers/index", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({

    numberOfLines: 4, // The amount of lines currently displayed on screen
    textRows: 18, // Number of Rows the Terminal Window can hold
    commandHistory: [{ message: "Hello, My name is Johnathan Brunelle." }, { message: "I am an Electrical Engineering + CS Student in my second" }, { message: "year at the University of Western Ontario." }, { message: "Enter 'help' to view the commands." }],

    init: function init() {

      this.set('textBuffer', '');
    },

    /**
     * Ensures that text does not run off the terminal window
     * @param historyList current text displayed
     */
    checkLines: function checkLines(historyList) {

      if (this.get('numberOfLines') > this.get('textRows')) {

        // Shift the queue a certain amount
        var difference = this.get('numberOfLines') - this.get('textRows');

        for (var i = 0; i < difference; i++) {
          this.get('commandHistory').set('commandHistory', historyList.shift());
        }

        this.set('numberOfLines', this.get('textRows'));
      }
    },

    openExternalPage: function openExternalPage(page) {
      var pages = {
        github: 'https://github.com/JhnBrunelle',
        linkedin: 'https://www.linkedin.com/in/johnbrunelleece'
      };
      window.open(pages[page]);
    },
    /**
     * Process the user input, pointing it to correct function
     * and providing a response
     * @param cmnd user command
     */
    registerCommand: function registerCommand(cmnd) {
      var historyList = this.get("commandHistory");

      // Used for debugging
      switch (cmnd) {
        case "help":
        case "ls":
          this.set("numberOfLines", this.get("numberOfLines") + 8);
          this.checkLines(historyList);
          historyList.pushObject({ message: cmnd });
          historyList.pushObject({ message: "Help Menu" });
          historyList.pushObject({ message: "  clear - Clear terminal window" });
          historyList.pushObject({ message: "  about - Info about me" });
          historyList.pushObject({ message: "  degree - Display Degree Info" });
          historyList.pushObject({ message: "  github - Open Github Page" });
          historyList.pushObject({ message: "  linkedin - Open Linkedin Page" });
          historyList.pushObject({ message: "  contact - Display Contact Info" });
          break;

        case "clear":
          this.set('commandHistory', []);
          this.set('numberOfLines', 0);
          break;

        case "stabilitycheck":
          // Used for Debugging
          console.log("commandHistory: " + this.get('commandHistory').length);
          console.log("numberOfLines:  " + this.get('numberOfLines'));

          this.set("numberOfLines", this.get("numberOfLines") + 2);
          this.checkLines(historyList);
          historyList.pushObject({ message: cmnd });
          historyList.pushObject({ message: "Stability Checked! View Console!" });
          break;

        case "contact":
          // Used for Debugging
          console.log("commandHistory: " + this.get('commandHistory').length);
          console.log("numberOfLines:  " + this.get('numberOfLines'));

          this.set("numberOfLines", this.get("numberOfLines") + 2);
          this.checkLines(historyList);
          historyList.pushObject({ message: cmnd });
          historyList.pushObject({ message: "Email - jhnbrunelle@gmail.com" });
          break;

        case "github":
          this.set("numberOfLines", this.get("numberOfLines") + 2);
          this.checkLines(historyList);
          historyList.pushObject({ message: cmnd });
          this.openExternalPage("github");
          historyList.pushObject({ message: "Github opened!" });
          break;

        case "linkedin":
          this.set("numberOfLines", this.get("numberOfLines") + 2);
          this.checkLines(historyList);
          historyList.pushObject({ message: cmnd });
          this.openExternalPage("linkedin");
          historyList.pushObject({ message: "Linkedin opened!" });
          break;

        case "degree":
          // States my Degree
          this.set("numberOfLines", this.get("numberOfLines") + 4);
          this.checkLines(historyList);
          historyList.pushObject({ message: cmnd });
          historyList.pushObject({ message: "University Of Western Ontario" });
          historyList.pushObject({ message: "Bachelor of Engineering Science (BESc) in Electrical Engineering" });
          historyList.pushObject({ message: "GPA: 3.7, Class of 2019" });
          break;

        case "about":
          this.set("numberOfLines", this.get("numberOfLines") + 6);
          this.checkLines(historyList);
          historyList.pushObject({ message: cmnd });
          historyList.pushObject({ message: "  I'm an Electrical Computer Engineering student from" });
          historyList.pushObject({ message: "  California. I enjoy coding in Javascript, Python, Java  " });
          historyList.pushObject({ message: "  and C++." });
          historyList.pushObject({ message: "  After University, I hope to either go into FPGA, embedded or" });
          historyList.pushObject({ message: "  Software development. " });
          break;

        default:
          this.set("numberOfLines", this.get("numberOfLines") + 2);
          this.checkLines(historyList);
          if (cmnd === '') {
            historyList.pushObject({ message: " " });
          } else {
            historyList.pushObject({ message: cmnd });
          }
          historyList.pushObject({ message: "jsh: " + cmnd + ": command not found" });
          break;
      }
    },

    // Used to validate correct console input
    // Returns true if valid, or false if invalid
    // Invalid - Nothing but spaces ie. Null input
    validateInput: function validateInput(input) {
      var parsedInput = input.replace(/\s+/, "");
      return parsedInput !== "";
    },

    actions: {

      /**
       * Handlees input from console command line
       * @param text User Input
       */
      inputLineHandler: function inputLineHandler(text) {
        if (this.validateInput(text)) {
          this.registerCommand(text);
          this.set('textBuffer', '');
        }
      }
    }
  });
});
define('personalsite/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('personalsite/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('personalsite/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'personalsite/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _personalsiteConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_personalsiteConfigEnvironment['default'].APP.name, _personalsiteConfigEnvironment['default'].APP.version)
  };
});
define('personalsite/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('personalsite/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('personalsite/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('personalsite/initializers/export-application-global', ['exports', 'ember', 'personalsite/config/environment'], function (exports, _ember, _personalsiteConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_personalsiteConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _personalsiteConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_personalsiteConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('personalsite/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('personalsite/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('personalsite/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("personalsite/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('personalsite/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('personalsite/router', ['exports', 'ember', 'personalsite/config/environment'], function (exports, _ember, _personalsiteConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _personalsiteConfigEnvironment['default'].locationType,
    rootURL: _personalsiteConfigEnvironment['default'].rootURL
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('personalsite/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("personalsite/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.7.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 27,
            "column": 6
          }
        },
        "moduleName": "personalsite/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "banner");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "src", "assets/selfimgmorty.png");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        Johnathan Brunelle");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "style", "padding-top:5px;font-size:10px;");
        var el4 = dom.createTextNode("(this is my site)");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "style", "margin-top:3px;height:10px; text-align: left;");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "https://github.com/JhnBrunelle/TerminalSite");
        dom.setAttribute(el4, "target", "_blank");
        var el5 = dom.createTextNode(" > view source ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "https://github.com/JhnBrunelle/");
        dom.setAttribute(el4, "target", "_blank");
        var el5 = dom.createTextNode(" > view other projects ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "https://www.linkedin.com/in/johnbrunelleece");
        dom.setAttribute(el4, "target", "_blank");
        var el5 = dom.createTextNode(" > view linkedin ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "mailto:jhnbrunelle@gmail.com");
        dom.setAttribute(el4, "target", "_blank");
        var el5 = dom.createTextNode(" > contact ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "wrapperTW");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "versionNumber");
        var el3 = dom.createTextNode("\n        jsh v0.08 - Made with Ember.js\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [22, 6], [22, 16]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("personalsite/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.7.3",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 4
            },
            "end": {
              "line": 11,
              "column": 4
            }
          },
          "moduleName": "personalsite/templates/index.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "history.message", ["loc", [null, [10, 12], [10, 31]]], 0, 0, 0, 0]],
        locals: ["history"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.7.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "personalsite/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "topBar");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "circle");
        dom.setAttribute(el2, "style", "background-color: #E74C3C");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "circle");
        dom.setAttribute(el2, "style", "background-color: #F1C40F");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "circle");
        dom.setAttribute(el2, "style", "background-color: #2ECC71");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "terminalWindow");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "input");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "for", "line");
        dom.setAttribute(el3, "style", "color:#008DD4;");
        var el4 = dom.createTextNode("user@jsh: ~$");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [3]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 3, 3);
        return morphs;
      },
      statements: [["block", "each", [["get", "commandHistory", ["loc", [null, [9, 12], [9, 26]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [9, 4], [11, 13]]]], ["inline", "input", [], ["type", "text", "id", "line", "value", ["subexpr", "@mut", [["get", "textBuffer", ["loc", [null, [14, 41], [14, 51]]], 0, 0, 0, 0]], [], [], 0, 0], "insert-newline", "inputLineHandler", "maxlength", "40", "spellcheck", "false", "autofocus", "autofocus"], ["loc", [null, [14, 6], [14, 143]]], 0, 0]],
      locals: [],
      templates: [child0]
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('personalsite/config/environment', ['ember'], function(Ember) {
  var prefix = 'personalsite';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("personalsite/app")["default"].create({"name":"personalsite","version":"0.0.0+5293d5d1"});
}

/* jshint ignore:end */
//# sourceMappingURL=personalsite.map
