/*eslint-env browser */
/*globals $ */

// Default size of map (in tiles)
var DEFAULT_WIDTH = 30;
var DEFAULT_HEIGHT = 15;
var current = 'grass';
var tile = '';
var repaint = false;
var mousedown = false;

var MapBuilder = function ($container, params) {
  // TODO: Initialize MapBuilder parameters
  this.$elem = $container;
  if (params) {
    this.width = params.width;
    this.height = params.height;
  } else {
    this.width = DEFAULT_WIDTH;
    this.height = DEFAULT_HEIGHT;
  }

  // initalizes current swatch
  this.currentSwatch = $('.grass');

};

// TODO: Implement MapBuilder.setupPalette()
MapBuilder.prototype.setupPalette = function () {
  $('.swatch').click(function () {
    var $toremove = $('#map-builder').find('.selected');
    $toremove.removeClass('selected');
    $(this).addClass('selected');
    current = this.classList[1]
    console.log(current);
  });
};

// TODO: Implement MapBuilder.setupMapCanvas
MapBuilder.prototype.setupMapCanvas = function () {
  // draws a 15x30 map of grass onto the canvas
  for (var i = 0; i < this.height; i++) {
    $('.map').append($('<div class = "row"> </div>'));
  }
  for (var j = 0; j < this.width; j++) {
    $('.row').append($('<div class = "tile swatch grass"> </div>'));
  }

  $('.tile').mouseenter(function () {
    var list = (this).classList;
    tile = list[2];
    $(this).removeClass(list[2]);
    $(this).addClass('tile ' + current);
    repaint = true;
    if (mousedown) {
      repaint = false;
    }
  });

  $('.tile').mouseout(function () {
    if (repaint) {
      var list = (this).classList;
      $(this).removeClass(list[2]);
      $(this).addClass('tile ' + tile);
    }
  });

  $('.tile').mousedown(function () {
    var list = (this).classList;
    $(this).removeClass(list[2]);
    $(this).addClass('tile ' + current);
    repaint = false;
    mousedown = true;
  });

  $('.tile').mouseup(function () {
    mousedown = false;
  });

}
//