(function() {
  var DOM = MeteorChart.DOM,
      PX = 'px';

  MeteorChart.Component.extend('Slider', {
    defaults: {
      offset: 0,
      value: 0,
      width: function() {
        return this.get('style').handleWidth;
      },
      height: function() {
        return this.get('style').handleHeight;
      }
    },
    init: function() {
      var showTrack = this.get('style').showTrack;

      // default
      if (showTrack === undefined) {
        showTrack = true;
      }

      if (showTrack) {
        this.track = MeteorChart.DOM.createElement('div');
        this.track.style.position = 'absolute';
        this.content.appendChild(this.track);
      }
      
      this.handle = MeteorChart.DOM.createElement('span');
      this.handle.style.display = 'inline-block';
      this.handle.style.position = 'absolute';
      this.content.appendChild(this.handle);

      this._bind();
    },
    _render: function() {
      var handle = this.handle,
          track = this.track,
          style = this.get('style'),
          theme = this.chart.theme,
          handleWidth = style.handleWidth,
          handleHeight = style.handleHeight,
          trackSize = 2,
          showTrack = style.showTrack;

      // default
      if (showTrack === undefined) {
        showTrack = true;
      }

      // handle
      handle.style.width = handleWidth + PX;
      handle.style.height = handleHeight + PX;
      handle.style.backgroundColor = style.handleFill || theme.primary;
      MeteorChart.DOM.addVendorStyle(handle, 'borderRadius', (Math.min(handleWidth, handleHeight) / 2) + 'px');

      // track
      if (showTrack) {
        track.style.backgroundColor = theme.secondary, 0.1;
      }

      if (this.get('orientation') === 'vertical') {
        handle.style.top = this.get('height') - handleHeight + PX;
        handle.style.left = 0 + PX;

        if (showTrack) {
          this.track.style.width = trackSize + PX;
          this.track.style.height = this.get('height') + PX;
          this.track.style.left = ((this.get('width') - trackSize) / 2) + PX;
        }
      }
      else {
        handle.style.top = 0 + PX;
        handle.style.left = 0 + PX;

        if (showTrack) {
          this.track.style.width = this.get('width') + PX;
          this.track.style.height = trackSize + PX;
          this.track.style.top = ((this.get('height') - trackSize) / 2) + PX;
        }
      }

      
      
      
    },
    getValue: function() {
      return this.value;
    },
    getOffset: function() {
      return this.offset;
    },
    _bind: function() {
      var that = this,
          handle = this.handle,
          chartContent = this.chart.content,
          orientation = this.get('orientation') || 'horizontal',
          style = this.get('style'),
          handleWidth = style.handleWidth,
          handleHeight = style.handleHeight,
          startOffsetPos = null,
          startPointerPos = null;

      // start drag & drop
      handle.addEventListener('mousedown', function(evt) {
        // prevent browser from trying to select stuff when dragging
        evt.preventDefault();

        if (orientation === 'horizontal') {
          startOffsetPos = DOM.pxToNum(handle.style.left);
          startPointerPos = evt.clientX;
        }
        else {
          startOffsetPos = DOM.pxToNum(handle.style.top);
          startPointerPos = evt.clientY;
        }

        that.fire('dragstart');
      }); 

      // drag
      document.body.addEventListener('mousemove', MeteorChart.Util._throttle(function(evt) {
        var diff, newOffset, value;

        if (startOffsetPos !== null) {

          if (orientation === 'horizontal') {
            diff = that.get('width') - that.get('style').handleWidth;
            pointerPos = evt.clientX;
            newOffset = pointerPos - startPointerPos + startOffsetPos;
            if (newOffset < 0) {
              newOffset = 0;
            }
            else if (newOffset > diff) {
              newOffset = diff;
            }
            handle.style.left = newOffset + PX;
          }
          else {
            diff = that.get('height') - that.get('style').handleHeight;
            pointerPos = evt.clientY;
            newOffset = pointerPos - startPointerPos + startOffsetPos;
            if (newOffset < 0) {
              newOffset = 0;
            }
            else if (newOffset > diff) {
              newOffset = diff;
            }
            handle.style.top = newOffset + PX;    
          }

          value = newOffset / (orientation === 'horizontal' ? (that.get('width') - handleWidth) : (that.get('height') - handleHeight));

          that.set('offset', newOffset);
          that.set('value', value);

          that.fire('dragmove', {
            offset: newOffset,
            value: value
          });
        }
      }, 17));
 
      // end drag & drop
      document.body.addEventListener('mouseup', function(evt) {
        if (startOffsetPos !== null) {
          startOffsetPos = null;
          startPointerPos = null;

          that.fire('dragend', {
            offset: that.get('offset'),
            value: that.get('value')
          });
        }
      }); 

      // cursors
      handle.addEventListener('mouseover', function(evt) {
        handle.style.cursor = 'pointer';
      }); 
      handle.addEventListener('mouseout', function(evt) {
        handle.style.cursor = 'default';
      });

    }
  });
})();