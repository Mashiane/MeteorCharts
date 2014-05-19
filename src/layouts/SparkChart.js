(function() {
  MeteorChart.Layouts.SparkChart = [
    {
      id: 'lineSeries',
      type: 'LineSeries',
      x: function () {
        return this.chart.padding();
      },
      y: function() {
        return this.chart.padding();
      },
      width: function() {
        return this.chart.get('width') - (this.chart.padding() * 2);
      },
      height: function() {
        return this.chart.get('height') - (this.chart.padding() * 2);
      }
    }
  ];
})();