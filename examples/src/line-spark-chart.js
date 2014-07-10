CHARTS.push({
  id: 'line-spark-chart',
  name: 'Line Spark Chart',
  config: {
    layout: 'L1_A',
    components: [
      {
        slot: 0,
        type: 'Line',
        id: 'lineSeries',
        viewport: {
          minX: 0,
          maxX: 10,
          minY: 0,
          maxY: 15,
        },
        data: @@LINE_SERIES_DATA
      }
    ]
  }
}); 