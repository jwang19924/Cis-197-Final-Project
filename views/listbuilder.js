var setupLists = function(username) {
  $.ajax({
    type: 'POST',
    url: '/protected',
    data: { user: username },
    success: function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        $('.maps').append($('<a href="/protected/' + data[i] + 'index">Your Map!</a>'));
      }
    }
  });
}


$(document).ready(function () {
  var user = $("h1").text();
  var res = user.substring(9, user.length);
  setupLists(res);

  $('.save').mouseup(function () {
    document.getElementById("newmap").value = document.getElementById("newmap").value + '|' + res;
  });

});