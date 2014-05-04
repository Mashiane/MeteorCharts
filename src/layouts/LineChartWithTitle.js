(function() {
  MeteorChart.Layouts.LineChartWithTitle = function(chart) {
    return {
      components: [  
        {
          id: 'lineSeries',
          type: 'LineSeries',
          x: function() {
            var chart = this.chart;
            return chart.components.yAxis.get('width', this) + (chart.padding() * 2);
          },
          y: function() {
            var chart = this.chart;
            return chart.components.title.get('height', this) + (chart.padding() * 2);
          },
          width: function() {
            var chart = this.chart;
            return chart.get('width', this) - chart.components.yAxis.get('width', this) - (chart.padding() * 3);
          },
          height: function() {
            var chart = this.chart,
                components = chart.components;

            return chart.get('height', this) - (chart.padding() * 4) - components.xAxis.get('height', this) - components.title.get('height', this);
          }
        },
        {
          id: 'yAxis',
          type: 'Axis',
          x: function() {
            return this.chart.padding();
          },
          y: function() {
            var chart = this.chart;
            return chart.components.title.get('height', this) + (chart.padding() * 2);
          },
          height: function() {
            // bind axis height to line height
            return this.chart.components.lineSeries.get('height', this);
          },
          orientation: function() {
            return 'vertical';
          }
        },
        {
          id: 'xAxis',
          type: 'Axis',
          x: function() {
            // bind axis x position to line x position
            return this.chart.components.lineSeries.get('x', this);
          },
          y: function() {
            var line = this.chart.components.lineSeries;

            return line.get('y', this) + line.get('height', this) +   this.chart.padding();
          },
          width: function() {
            // bind axis width to line width
            return this.chart.components.lineSeries.get('width', this);
          }
        },
        {
          id: 'title',
          type: 'Title',
          x: function() {
            return this.chart.padding();
          },
          y: function() {
            return this.chart.padding();
          },
          width: function() {
            return this.chart.get('width', this) - (this.chart.padding() * 2);
          }
        }
      ]
    };
  };
})();