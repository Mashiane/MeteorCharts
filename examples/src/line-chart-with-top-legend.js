CHARTS.push({
  id: 'line-chart-with-top-legend',
  name: 'Line Chart with Top Legend',
  config: {
    layout: 'L4_A',
    components: [
      {
        slot: 0,
        type: 'Legend',
        id: 'legend',
        align: 'right',
        data: function() {
          return this.chart.components.lineSeries.getTitles();
        }
      },
      {
        slot: 1,
        type: 'Axis',
        id: 'yAxis',
        data: function() {
          return [-100, 0, 100, 200];
        }
      },
      {
        slot: 2,
        type: 'Lines',
        id: 'lineSeries',
        viewport: {
          minX: -100,
          maxX: 300,
          minY: -100,
          maxY: 200,
        },
        data: @@LINE_DUAL_SERIES_DATA
      },
      {
        slot: 2,
        type: 'Scatter',
        id: 'scatter',
        viewport: function() {
          return this.chart.components.lineSeries.get('viewport');
        },
        data: function() {
          return this.chart.components.lineSeries.get('data');
        },
        style: {
          filled: false
        },
        on: {
          inspectPoint: function(evt) {
            var tooltip = this.chart.components.tooltip;

            tooltip.x(100);
            tooltip.y(100);
            tooltip.data({
              title: 'Title',
              content: 'content'
            });
            tooltip.render();
          }
        }
      },
      {
        slot: 3,
        type: 'Axis',
        id: 'xAxis',
        data: function() {
          return [-100, 0, 100, 200, 300];
        }
      },
      {
        type: 'Tooltip',
        id: 'tooltip'
      }
    ]
  }
});