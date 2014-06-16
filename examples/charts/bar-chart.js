var chart = new MeteorChart({
  container: 'container',
  width: 500,
  height: 290,

  theme: MeteorChart.Themes.CoteAzur,
  layout: MeteorChart.Layouts.L4,

  components: [
    {
      slot: 0,
      type: 'Axis',
      id: 'yAxis',
      data: function() {
        return [0, 20, 40, 60, 80, 100]
      }
    },
    {
      slot: 1,
      type: 'BarSeries',
      id: 'barSeries',
      viewport: {
        min: 0,
        max: 100
      },
      data: [
        {
          title: 'Califonia',
          bars: [
            {
              title: 'Republicans',
              value: 10
            }
          ]
        },
        {
          title: 'Califonia',
          bars: [
            {
              title: 'Republicans',
              value: 50
            }
          ]
        },
        {
          title: 'Florida',
          bars: [
            {
              title: 'Republicans',
              value: 60
            }
          ]
        },
        {
          title: 'New York',
          bars: [
            {
              title: 'Republicans',
              value: 10
            }
          ]
        },
        {
          title: 'Texas',
          bars: [
            {
              title: 'Republicans',
              value: 90
            }
          ]
        }
      ],
      style: function() {
        return {
          barWidth: (this.get('width') / 5) - 10
        };
      }
    },
    {
      slot: 2,
      type: 'Axis',
      id: 'xAxis',
      data: function() {
        return ['California', 'Colorado', 'Florida', 'New York', 'Texas']
      },
      style: function() {
        return {
          padding: this.chart.components.barSeries.get('style').barWidth / 2
        };
      }
    }
  ]
});