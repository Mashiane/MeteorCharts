(function() {
  MeteorChart.Component.extend('Tooltip', {
    init: function() {
      this.tooltip = MeteorChart.Dom.createElement('div');
      this.tooltip.style.display = 'inline-block';
      this.tooltipTitle = MeteorChart.Dom.createElement('h2');
      this.tooltipContent = MeteorChart.Dom.createElement('p');

      this.tooltip.appendChild(this.tooltipTitle);
      this.tooltip.appendChild(this.tooltipContent);
      this.content.appendChild(this.tooltip);
    },
    render: function() {
      var data = this.data(),
          style = this.style(),
          theme = this.chart.theme;

      if (data) {
        // tooltip
        this.tooltip.style.fontFamily = style.fontFamily || theme.fontFamily;
        this.tooltip.style.color = style.fontColor || theme.primary;
        this.tooltip.style.padding = this.padding(-3);
        this.tooltip.style.border = '2px solid ' + (style.borderColor || theme.secondary);  

        // title
        this.tooltipTitle.style.fontSize = (style.fontSize || theme.fontSize) * MeteorChart.Constants.TYPOGRAPHIC_SCALE;
        this.tooltipTitle.innerHTML = data.title;

        // content
        this.tooltipContent.style.fontSize = style.fontSize || theme.fontSize;
        this.tooltipContent.style.marginTop = 5;
        this.tooltipContent.innerHTML = data.content;
      }
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Tooltip, 'width', function() {
    return 200;
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Tooltip, 'height', function() {
    return 50;
  });

})();