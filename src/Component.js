(function() {
  MeteorChart.Component = function(config) {
    this.attrs = {}; // x, y, width, and height
    this.props = {};
    this.chart = config.chart;
    this.className = config.type;
    this.id = config.id;
    this.type = config.type;
    this.dependencies = config.dependencies || {};

    // layout bindings
    this.x(config.x);
    this.y(config.y);
    this.width(config.width);
    this.height(config.height);
    this.orientation(config.orientation);

    // app bindings
    this.data(config.data);
    this.style(config.style);

    // build content container
    this.content = document.createElement('div');
    this.content.className = 'component-content';
    this.content.setAttribute('data-component-type', this.type);
    this.content.setAttribute('data-component-id', this.id);
    this.content.style.display = 'inline-block';
    this.content.style.position = 'absolute';
  };

  MeteorChart.Component.prototype = {
    render: function() {
      var that = this;
      MeteorChart.Animation.queue(this.id, function() {
        //MeteorChart.log(this.id + ' render');

        // reset width and height so that they do not affect component
        // width and height methods
        that.content.style.width = 'auto';
        that.content.style.height = 'auto';

        // render concrete component first because the component width and height
        // may depend on it
        if (that._render) {
          that._render();
        }

        that.content.style.left = that.x();
        that.content.style.top = that.y();
        that.content.style.width = that.width();
        that.content.style.height = that.height();
      });
    },
    // _render: function() {
    //   var state = {
    //     x: this.x(),
    //     y: this.y(),
    //     width: this.width(),
    //     height: this.height(),
    //     data: this.data(),
    //     style: this.style()
    //   };

    //   if (!MeteorChart.Util.isEqual(this.cache, state)) {
    //     //MeteorChart.log(this.id + ' render');

    //     // reset width and height so that they do not affect component
    //     // width and height methods
    //     this.content.style.width = 'auto';
    //     this.content.style.height = 'auto';

    //     // render concrete component first because the component width and height
    //     // may depend on it
    //     if (this.render) {
    //       this.render();
    //     }

    //     this.content.style.left = this.x();
    //     this.content.style.top = this.y();
    //     this.content.style.width = this.width();
    //     this.content.style.height = this.height();

    //     // set cache to current state
    //     this.cache = state;
    //   }
    //   else {
    //     //MeteorChart.log(this.id + ' state is the same');

    //     // used cache
    //     return true;
    //   }


    // },
    destroy: function() {

    },
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
    set: function(prop, val) {
      var chart = this.chart, 
          deps = chart.deps,
          componentIds, key;

      this.props[prop] = val;

      if (deps[this.id] && deps[this.id][prop]) {
        componentIds = deps[this.id][prop];
        for (key in componentIds) {
          chart.components[key].render();
        }
      }
    },
    get: function(prop, context) {
      var chart = this.chart;

      if (!chart.deps[this.id]) {
        chart.deps[this.id] = {};
      }

      if (!chart.deps[this.id][prop]) {
        chart.deps[this.id][prop] = {};
      }
      
      chart.deps[this.id][prop][context.id] = 1;

      return this.props[prop];
    },

    // render helpers
    /**
     * @param {Integer} [scaleFactor] can be -3, -2, -1, 0, 1, 2, etc.  -1, 0, and -1 and
     *   1 have the same result, and 0 defaults to 1.  If you want to double the padding
     *   scale, use 2.  If you want to triple it, use 3.  If you want to halve it, use -2
     */
    padding: function(scaleFactor) {
      var chart = this.chart,
          scale = MeteorChart.Util._getScale(MeteorChart.Constants.PADDING_SCALE, scaleFactor);

      return (this.style.padding || chart.style.padding || chart.theme.padding) * scale;
    }
  };

  MeteorChart.Component.extend = function(type, methods) {
    MeteorChart.Components[type] = function(config) {
      MeteorChart.Component.call(this, config);
    };

    MeteorChart.Components[type].prototype = methods;
    MeteorChart.Util.extend(MeteorChart.Components[type].prototype, MeteorChart.Component.prototype);
  };

  // getters setters
  MeteorChart.Util.addMethod(MeteorChart.Component, 'x', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'y', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'width', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'height', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'orientation', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'data');
  MeteorChart.Util.addMethod(MeteorChart.Component, 'style', function(){return {}});
})();