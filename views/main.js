/*eslint no-unused-vars: 0 */
/*eslint-env browser */
/*globals $, MapBuilder, Player */
function drawMapAjax() {
  $.ajax({
    type: 'POST',
    url: '/protected/:className/index',
    data: { },
    success: function(data) {
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
      }
      console.log("made map from database if it exsits");     
    }
  });
}

$(document).ready(function () {
  var $mapElement = $('#map-builder');
  var builder = new MapBuilder($mapElement);
  drawMapAjax();
  builder.setupPalette();
  builder.setupMapCanvas();
  var pikachu = new Player(0, 0, builder);

});
