(function() {
  MeteorChart.Component.define('Axis', {
    init: function() {
      this.orientation = this.options.orientation || 'horizontal';
    },
    build: function() {
      var that = this,
          chart = this.chart,
          data = this.data(),
          formatter = new MeteorChart.Formatters['Number'](data.min, data.max, 5),
          min = data.min,
          max = data.max,
          diff = max - min,
          orientation = this.orientation,
          scale = (orientation === 'horizontal' ? this.width() : this.height()) / diff,
          offset = 0,
          increment = formatter.increment;

      this.layer.enableHitGraph(false);

      formatter.each(function(n, val) {
        offset = n * increment * scale;
        that._addLabel(offset, val);
      });  
    },
    _addLabel: function(offset, val) {
      var mediumFont = this.chart.theme().background.fonts.medium,
          orientation = this.orientation;
          
      this.layer.add(new Kinetic.Text({
        x: orientation === 'horizontal' ? offset : 0,
        y: orientation === 'vertical' ? this.height() - offset : 0,
        text: val,
        fontFamily: mediumFont.fontFamily,
        fontSize: mediumFont.fontSize,
        fill: mediumFont.fill,
        stroke: mediumFont.stroke
      }));  
    },
    destroy: function() {

    }
  });
})();