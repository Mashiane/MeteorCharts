(function() {
  MeteorChart.Util = {
    addMethod: function(constructor, attr, def) {
      constructor.prototype[attr] = function() {
        var val;

        // setter
        if (arguments.length) {
          this.attrs[attr] = arguments[0];

          // chainable
          return this;
        }
        // getter
        else {
          val = this.attrs[attr];

          if (val === undefined) {
            if (MeteorChart.Util._isFunction(def)) {
              return def.call(this);
            }
            else {
              return def;
            }
          }
          else if (MeteorChart.Util._isFunction(val)) {
            return val.call(this);
          }
          else {
            return val;
          }   
        }
      };
    },
    getPointsMinMax: function(points) {
      var minX = Infinity,
          minY = Infinity,
          maxX = Infinity * -1,
          maxY = Infinity * -1,
          len = points.length,
          n, x, y;

      for (n=0; n<len; n+=2) {
        point = points[n];
        x = points[n];
        y = points[n+1];
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      } 

      return {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      };
    },
    getSeriesMinMax: function(series) {
      var minX = Infinity,
          minY = Infinity,
          maxX = Infinity * -1,
          maxY = Infinity * -1,
          len = series.length,
          n, viewport;

      for (n=0; n<len; n++) {
        viewport = this.getPointsMinMax(series[n].points);
        minX = Math.min(minX, viewport.minX);
        minY = Math.min(minY, viewport.minY);
        maxX = Math.max(maxX, viewport.maxX);
        maxY = Math.max(maxY, viewport.maxY);
      } 

      return {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      };
    },
    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time. Normally, the throttled function will run
    // as much as it can, without ever going more than once per `wait` duration;
    // but if you'd like to disable the execution on the leading edge, pass
    // `{leading: false}`. To disable execution on the trailing edge, ditto.
    _throttle: function(func, wait, options) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      options || (options = {});
      var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
      };
      return function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    },
    // add obj2 keys to obj1
    merge: function(obj1, obj2) {
      var obj = {},
          key;

      for (key in obj1) {
        obj[key] = obj1[key];
      }

      for (key in obj2) {
        obj[key] = obj2[key];
      }

      return obj;
    },
    extend: function(c1, c2) {
      for(var key in c2.prototype) {
        if(!( key in c1.prototype)) {
          c1.prototype[key] = c2.prototype[key];
        }
      }
    },
    _getScale: function(val, scaleFactor) {
      if (!scaleFactor) {
        scaleFactor = 1;
      }

      // more than 0
      if (scaleFactor > 0) {
        return val * scaleFactor;
      }
      // less than 0
      else {
        return val / (-1 * scaleFactor);
      }
    },
    /*
     * cherry-picked utilities from underscore.js
     */
    _isElement: function(obj) {
      return !!(obj && obj.nodeType == 1);
    },
    _isFunction: function(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    _isObject: function(obj) {
      return (!!obj && obj.constructor == Object);
    },
    _isArray: function(obj) {
      return Object.prototype.toString.call(obj) == '[object Array]';
    },
    _isNumber: function(obj) {
      return Object.prototype.toString.call(obj) == '[object Number]';
    },
    _isString: function(obj) {
      return Object.prototype.toString.call(obj) == '[object String]';
    }
  };

  // TODO: add methods to MeteorChart class. 
  MeteorChart.Util.addMethod(MeteorChart, 'width', 0);
  MeteorChart.Util.addMethod(MeteorChart, 'height', 0);
  MeteorChart.Util.addMethod(MeteorChart, 'data');
  MeteorChart.Util.addMethod(MeteorChart, 'style', function() {return {};});
})();