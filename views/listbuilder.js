var setupLists = function(username) {
  $.ajax({
    type: 'POST',
    url: '/protected/:className/index',
    data: { user: username },
    success: function(data) {
      console.log(data);

    }
  });
}


$(document).ready(function () {
  var user = $("h1").text();
  var res = user.substring(9, user.length);
  setupLists(user);

  $('.save').mouseup(function () {
    document.getElementById("newmap").value = document.getElementById("newmap").value + '|' + user;
  });

});