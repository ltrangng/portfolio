;(function($) {
  'use strict';

  var pluginName = 'canvasHover',
    config = {
      pointLifetime: 1000
    };

  function CanvasHover(element, options) {
    this.elem = element;
    this.options = $.extend({}, config, options);
    this.init();

    return this;
  }

  CanvasHover.prototype = {

    init: function () {
      var self = this;

      this.image = this.elem.querySelector('img');
      this.imageCanvas = document.createElement('canvas');
      this.imageCanvasContext = this.imageCanvas.getContext('2d');
      this.lineCanvas = document.createElement('canvas');
      this.lineCanvasContext = this.lineCanvas.getContext('2d');
      this.points = [];

      if (this.image.complete) {
        this.start();
      } else {
        this.image.onload = function() {
          self.start();
        };
      }
    },

    start: function () {
      var self = this;

      this.elem.addEventListener('mousemove', function(e) {
        self.onMouseMove(e);
      });
      window.addEventListener('resize', function() {
        self.resizeCanvases();
      });
      this.elem.appendChild(this.imageCanvas);
      this.resizeCanvases();
      this.tick();
    },

    onMouseMove: function (event) {
      var box = this.elem.getBoundingClientRect();

      this.points.push({
        time: Date.now(),
        x: event.pageX - box.left - window.pageXOffset,
        y: event.pageY - box.top - window.pageYOffset
      });
    },

    resizeCanvases: function () {
      this.imageCanvas.width = this.lineCanvas.width = this.image.width;
      this.imageCanvas.height = this.lineCanvas.height = this.image.height;
    },

    tick: function () {
      var self = this;
      // Remove old points
      this.points = this.points.filter(function(point) {
        var age = Date.now() - point.time;
        return age < config.pointLifetime;
      });

      this.drawLineCanvas();
      this.drawImageCanvas();
      requestAnimationFrame(function() {
        self.tick();
      });
    },

    drawLineCanvas: function () {
      var minimumLineWidth = 25;
      var maximumLineWidth = 100;
      var lineWidthRange = maximumLineWidth - minimumLineWidth;
      var maximumSpeed = 50;

      this.lineCanvasContext.clearRect(0, 0, this.lineCanvas.width, this.lineCanvas.height);
      this.lineCanvasContext.lineCap = 'round';
      this.lineCanvasContext.shadowBlur = 30;
      this.lineCanvasContext.shadowColor = '#000';

      for (var i = 1; i < this.points.length; i++) {
        var point = this.points[i];
        var previousPoint = this.points[i - 1];

        // Change line width based on speed
        var distance = this.getDistanceBetween(point, previousPoint);
        var speed = Math.max(0, Math.min(maximumSpeed, distance));
        var percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
        this.lineCanvasContext.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;

        // Fade points as they age
        var age = Date.now() - point.time;
        var opacity = (config.pointLifetime - age) / config.pointLifetime;
        this.lineCanvasContext.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';

        this.lineCanvasContext.beginPath();
        this.lineCanvasContext.moveTo(previousPoint.x, previousPoint.y);
        this.lineCanvasContext.lineTo(point.x, point.y);
        this.lineCanvasContext.stroke();
      }
    },

    getDistanceBetween: function (a, b) {
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    },

    drawImageCanvas: function () {
      // Emulate background-size: cover
      var width = this.imageCanvas.width;
      var height = this.imageCanvas.width / this.image.naturalWidth * this.image.naturalHeight;

      if (height < this.imageCanvas.height) {
        width = this.imageCanvas.height / this.image.naturalHeight * this.image.naturalWidth;
        height = this.imageCanvas.height;
      }

      this.imageCanvasContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
      this.imageCanvasContext.globalCompositeOperation = 'source-over';
      this.imageCanvasContext.drawImage(this.image, 0, 0, width, height);
      this.imageCanvasContext.globalCompositeOperation = 'destination-in';
      this.imageCanvasContext.drawImage(this.lineCanvas, 0, 0);
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if(!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
          new CanvasHover(this, options));
      }
    });
  }

})(jQuery);