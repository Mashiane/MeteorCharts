var MeteorChart;
(function() {
  MeteorChart = function(config) { 
    var that = this,
        container = config.container,
        layoutComponents, components, component, len, n, componentId, conf, componentData;

    this.attrs= {};
    this.deps = {};
    this.container = MeteorChart.Util._isString(container) ? document.getElementById(container) : container;

    this.set('width', config.width);
    this.set('height', config.height);
    this.set('style', config.style);

    this.id = config.id;
    this.layout = config.layout(this);
    this.theme = config.theme;
    this._components = config.components || {};
    this.components = [];

    // build content container
    this.content = document.createElement('div');
    this.content.className = 'meteorchart-content';
    this.content.style.width = this.get('width', this);
    this.content.style.height = this.get('height', this);
    this.content.style.display = 'inline-block';
    this.content.style.backgroundColor = this.theme.background;
    this.content.style.position = 'relative';
    this.content.style.overflow = 'hidden';
    this.container.appendChild(this.content);

    // initialize renderer dummies
    MeteorChart.Dom.dummy = MeteorChart.Dom.createElement('div');
    MeteorChart.Dom.dummy.style.display = 'inline-block';
    MeteorChart.Dom.dummy.className = 'dom-dummy';
    this.content.appendChild(MeteorChart.Dom.dummy);

    layoutComponents = this.layout.components;
    len = layoutComponents.length;
 
    // init components
    for (n=0; n<len; n++) {
      that._initComponent(layoutComponents[n]);
    }

    // add components to chart content
    for (n=0, len=that.components.length; n<len; n++) {
      that._addComponent(n);
    }

    // bind events
    this._bind();

    // store reference to this chart
    MeteorChart.charts.push(this);
  };

  MeteorChart.prototype = {
    defaults: {
      style: function() {
        return {};
      }
    },
    _initComponent: function(conf) {
      var component;

      MeteorChart.log('init ' + conf.id);

      this._decorateConf(conf);
      component = new MeteorChart.Components[conf.type](conf);

      this.components[component.id] = component;
      this.components.push(component);      
    },
    _addComponent: function(n) {
      var component = this.components[n];

      if (component.init) {
        component.init();
      }

      component.render();

      MeteorChart.log('add ' + component.id);
      this.content.appendChild(component.content); 
    },
    _bind: function() {
      var that = this,
          content = this.content,
          contentPos;

      content.addEventListener('mousemove', MeteorChart.Util._throttle(function(evt) {
        contentPos = MeteorChart.Dom.getElementPosition(content);

        that.fire('mousemove', {
          x: evt.clientX - contentPos.x,
          y: evt.clientY - contentPos.y
        });
      }, 17));

      content.addEventListener('mouseout', function(evt) {
        that.fire('mouseout');
      });
    },
    _decorateConf: function(conf) {
      var id = conf.id,
          component = this._components[id],
          key;

      if (component) {
        for (key in component) {
          conf[key] = component[key];
        }
      }

      conf.chart = this;
    },
    // TODO: this is copied and pasted from the component class.  Need to 
    // extend some other higher level class
    fire: function(event, obj) {
      var that = this;
      MeteorChart.Event.fire.call(this, MeteorChart.Util.merge({
          event: event,
          type: this.type,
          id: this.id
        }, 
        obj)
      );
    },
    add: function(conf) {
      this._initComponent(conf); 
      this._addComponent(this.components.length-1);
    },
    destroy: function() {
      var components = this.components,
          len = components.length,
          n;

      // destroy components
      for (n=0; n<len; n++) {
        components[n].destroy();
      }

      // clear any leftover DOM
      this.container.innerHTML = '';
    },
    render: function() { 
      var components = this.components,
          len = components.length,
          n, component
        
      for (n=0; n<len; n++) {
        components[n].render();
      }
    },
    // TODO: this is copied and pasted from the component class.  Need to 
    // extend some other higher level class
    set: function(attr, val) {
      if (val !== undefined) {
        this.attrs[attr] = val;
      }
    },
    // TODO: this is copied and pasted from the component class.  Need to 
    // extend some other higher level class
    get: function(attr, context) {
      var chart = this.chart,
          val = this.attrs[attr];

      // default
      if ((val === undefined || val === null) && this.defaults[attr] !== undefined) {
        val = this.defaults[attr];
      }

      if (MeteorChart.Util._isFunction(val)) {
        return val.call(this);
      }
      else {
        return val;
      }  
    },
    // render helpers
    padding: function(scaleFactor) {
      var scale = scale = MeteorChart.Util._getScale(MeteorChart.Constants.PADDING_SCALE, scaleFactor),
          chartPadding = this.get('style', this).padding;

      if (chartPadding !== undefined) {
        return chartPadding * scale;
      }
      else {
        return this.theme.padding * scale;
      }
    }
  };

  MeteorChart.version = '@@version';
  MeteorChart.Components = {};
  MeteorChart.Formatters = {};
  MeteorChart.Layouts = {};
  MeteorChart.Themes = {};

  MeteorChart.Constants = {
    TYPOGRAPHIC_SCALE: 1.2,
    PADDING_SCALE: 1.2
  };

  // global properties
  MeteorChart.charts = [];
  MeteorChart.debug = false;

  // UA
  MeteorChart.UA = (function(root) {
    var userAgent = (root.navigator && root.navigator.userAgent) || '';
    var ua = userAgent.toLowerCase(),
        // jQuery UA regex
        match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [],

        // adding mobile flag as well
        mobile = !!(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i));

    return {
        browser: match[ 1 ] || '',
        version: match[ 2 ] || '0',

        // adding mobile flab
        mobile: mobile
    };
  })(this);

  MeteorChart.log = function(str) {
    if (this.debug) {
      console.log('-- ' + str);
    }
  };

  MeteorChart.render = function() {
    var charts = this.charts,
        len = charts.length,
        n;

    for (n=0; n<len; n++) {
      charts[n].render();
    }
  }


})();

// Uses Node, AMD or browser globals to create a module.

// If you want something that will work in other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrict.js

// Defines a module "returnExports" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

// if the module has no dependencies, the above pattern can be simplified to
( function(root, factory) {
    if( typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    }
    else if( typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    }
    else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function() {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return MeteorChart;
}));
