(function() {
  /**
   * L4 LAYOUT
   * +---+---+
   * | 0 | 1 |
   * +---+---+
   * | X | 2 |
   * +---+---+
   */
  MeteorChart.Layouts.L4 = [  
    // slot 0
    {
      orientation: 'vertical',
      x: function() {
        return this.chart.padding();
      },
      y: function() {
        return this.chart.padding();
      },
      height: function() {
        return this.chart.slots[1].get('height');
      }
    },
    // slot 1
    {
      x: function() {
        return this.chart.slots[0].get('width') + (this.chart.padding() * 2);
      },
      y: function() {
        return this.chart.padding();
      },
      width: function() {
        return this.chart.get('width') - this.chart.slots[0].get('width') - (this.chart.padding() * 3);
      },
      height: function() {
        var slots = this.chart.slots;
        return this.chart.get('height') - (this.chart.padding() * 3) - slots[2].get('height');
      }
    },
    // slot 2
    {
      orienation: 'horizontal',
      x: function() {
        return this.chart.slots[1].get('x');
      },
      y: function() {
        var slots = this.chart.slots;
        return slots[1].get('y') + slots[1].get('height') + this.chart.padding();
      },
      width: function() {
        return this.chart.slots[1].get('width');
      }
    } 
  ];
})();