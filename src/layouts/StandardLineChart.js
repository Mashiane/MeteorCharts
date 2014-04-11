(function() {
  MeteorChart.Layouts.StandardLineChart = {
    addOrder: ['lineSeries', 'xAxis', 'yAxis'],
    components: [  
      {
        id: 'lineSeries',
        type: 'LineSeries',
        x: function() {
          var chart = this.chart;
          return chart.components.yAxis.width() + (chart.padding() * 2);
        },
        y: function() {
          return this.chart.padding();
        },
        width: function() {
          var chart = this.chart;
          return chart.width() - chart.components.yAxis.width() - (chart.padding() * 3);
        },
        height: function() {
          var chart = this.chart,
              components = chart.components;

          return chart.height() - (chart.padding() * 3) - components.xAxis.height();
        }
      },
      {
        id: 'xAxis',
        type: 'Axis',
        x: function() {
          // bind axis x position to line x position
          return this.chart.components.lineSeries.x();
        },
        y: function() {
          var line = this.chart.components.lineSeries;

          return line.y() + line.height() +   this.chart.padding();
        },
        width: function() {
          // bind axis width to line width
          return this.chart.components.lineSeries.width();
        },
        data: function() {
          // bind axis data to line min and max values
          var lineSeries = this.chart.components.lineSeries,
              data = lineSeries.data(),
              viewport = MeteorChart.Util.getSeriesMinMax(data);
        
          return {
            min: viewport.minX,
            max: viewport.maxX
          };
        },
        options: {
          maxIncrements: 5
        }
      },
      {
        id: 'yAxis',
        type: 'Axis',
        x: function() {
          return this.chart.padding();
        },
        y: function() {
          return this.chart.padding();
        },
        height: function() {
          // bind axis height to line height
          return this.chart.components.lineSeries.height();
        },
        data: function() {
          // bind axis data to line min and max values
          var lineSeries = this.chart.components.lineSeries,
              data = lineSeries.data(),
              viewport = MeteorChart.Util.getSeriesMinMax(data);

          return {
            min: viewport.minY,
            max: viewport.maxY
          };
        },
        options: {
          orientation: 'vertical',
          maxIncrements: 5
        }
      }
    ]
  };
})();