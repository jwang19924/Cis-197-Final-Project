var setupLists = function(username) {
  $.ajax({
    type: 'POST',
    url: '/protected',
    data: { user: username },
    success: function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        $('.maps').append($('<div> <a href="/protected/' + username + data[i] + '/index">' + data[i] + '</a></div>'));
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