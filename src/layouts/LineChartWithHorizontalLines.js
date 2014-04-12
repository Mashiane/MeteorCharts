(function() {
  MeteorChart.Layouts.LineChartWithHorizontalLines = {
    addOrder: ['horizontalGridLines', 'lineSeries', 'xAxis', 'yAxis'],
    components: [  
      {
        id: 'lineSeries',
        name: 'LineSeries',
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
        name: 'Axis',
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
          var data = this.chart.components.lineSeries.data(),
              viewport = MeteorChart.Util.getSeriesMinMax(data.series);

          return {
            min: viewport.minX,
            max: viewport.maxX
          }
        },
        options: {
          maxIncrements: 5
        }
      },
      {
        id: 'yAxis',
        name: 'Axis',
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
          var data = this.chart.components.lineSeries.data(),
              viewport = MeteorChart.Util.getSeriesMinMax(data.series);
          return {
            min: viewport.minY,
            max: viewport.maxY
          }
        },
        options: {
          orientation: 'vertical'
        }
      },
      {
        id: 'horizontalGridLines',
        name: 'GridLines',
        x: function() {
          return this.chart.components.lineSeries.x();
        },
        y: function() {
          return this.chart.components.lineSeries.y();
        },
        width: function() {
          return this.chart.components.lineSeries.width();
        },
        height: function() {
          return this.chart.components.lineSeries.height();
        },
        data: function() {
          return this.chart.components.yAxis.labelOffsets;
        },
        options: {
          orientation: 'horizontal',
          lineWidth: 2
        }
      }
    ]
  };
})();