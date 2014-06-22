CHARTS.push({
  id: 'line-chart-with-top-legend',
  name: 'Line Chart with Top Legend',
  config: {
    layout: MeteorChart.Layouts.L4_B,
    components: [
      {
        slot: 0,
        type: 'Legend',
        id: 'legend',
        align: 'right',
        data: function() {
          return ['Series 1', 'Series 2'];
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
        type: 'LineSeries',
        id: 'lineSeries',
        viewport: {
          minX: -100,
          maxX: 300,
          minY: -100,
          maxY: 200,
        },
        data: DATA.LINE_SERIES
      },
      {
        slot: 3,
        type: 'Axis',
        id: 'xAxis',
        data: function() {
          return [-100, 0, 100, 200, 300];
        }
      }
    ]
  }
});
