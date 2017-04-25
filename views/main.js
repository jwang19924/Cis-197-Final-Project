/*eslint no-unused-vars: 0 */
/*eslint-env browser */
/*globals $, MapBuilder, Player */

$(document).ready(function () {
  var $mapElement = $('#map-builder');
  var builder = new MapBuilder($mapElement);
  builder.setupPalette();
  builder.setupMapCanvas();
  drawMapAjax();
  var pikachu = new Player(0, 0, builder);
});

var drawMapAjax = function () {
  $.ajax({
    type: 'POST',
    url: '/getmapdata',
    data: { mapstring : null },
    success: function(data) {
      $('.map').empty();
      console.log(data);
      if (data) {
        var x = 0;
        for (var i = 0; i < 15; i++) {
          $('.map').append($('<div class = "row"> </div>'));
        }
        var rowlist = document.getElementsByClassName("row");
        for (var i = 0; i < rowlist.length; i++) {
          for (var j = 0; j < 30; j++) {
            $(rowlist[i]).append($('<div class = "tile swatch ' + data[x] + '"> </div>'));
            x = x + 1;
          }
        }
        console.log('map from database');
      } else {
        for (var i = 0; i < 15; i++) {
          $('.map').append($('<div class = "row"> </div>'));
        }
        var rowlist = document.getElementsByClassName("row");
        for (var i = 0; i < rowlist.length; i++) {
          for (var j = 0; j < 30; j++) {
            $(rowlist[i]).append($('<div class = "tile swatch grass"> </div>'));
          }
        }
        console.log('base map');
      }    
    }
  });
}