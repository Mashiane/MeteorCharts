(function() {
  MeteorChart.Component = function(config) {
    this.attrs = {};
    this.chart = config.chart;
    this.className = config.name;
    this.id = config.id;
    this.name = config.name;
    this.options = config.options || {};
    this.dependencies = config.dependencies || {};

    // binding functions
    this.x(config.x);
    this.y(config.y);
    this.width(config.width);
    this.height(config.height);
    this.data(config.data);
    this.style(config.style);

    // build content container
    this.content = document.createElement('div');
    this.content.className = 'component-content';
    this.content.setAttribute('data-component-name', this.name);
    this.content.setAttribute('data-component-id', this.id);
    this.content.style.display = 'inline-block';
    this.content.style.position = 'absolute';
  };

  MeteorChart.Component.prototype = {
    _render: function() {
      this.content.style.left = this.x();
      this.content.style.top = this.y();
      this.content.style.width = this.width();
      this.content.style.height = this.height();

      // concrete component render
      if (this.render) {
        this.render();
      }
    },
    destroy: function() {

    },
    fire: function(type, obj) {
      var that = this;
      MeteorChart.Event.fire(MeteorChart.Util.merge({
        type: type,
        name: this.name,
        id: this.id
      }, obj));
    }
  };

  MeteorChart.Component.extend = function(name, methods) {
    MeteorChart.Components[name] = function(config) {
      MeteorChart.Component.call(this, config);
    };

    MeteorChart.Components[name].prototype = methods;
    MeteorChart.Util.extend(MeteorChart.Components[name], MeteorChart.Component);
  };

  // getters setters
  MeteorChart.Util.addMethod(MeteorChart.Component, 'x', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'y', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'width', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'height', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'data');
  MeteorChart.Util.addMethod(MeteorChart.Component, 'style', function() {return {};});
})();