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

var setupFriendsList = function(username) {
  $.ajax({
    type: 'POST',
    url: '/protected',
    data: { friendlist: username },
    success: function(data) {
      console.log(data);
      if (data) {
        for (var i = 0; i < data.length; i++) {
          $('.friendmaps').empty();
          $('.friendmaps').append($('<div> <a href="/protected/' + username + data[i] + '/index">' + data[i] + '</a></div>'));
        }
      } else {
        $('.friendmaps').empty();
        $('.friendmaps').append($('<h3>No map user with user name: ' + username + ' has been found</h3>'));
      }
    }
  });
}


$(document).ready(function () {
  var user = $("h1").text();
  var res = user.substring(9, user.length);
  setupLists(res);
  console.log(res);

  $('.save').mouseup(function (event) {
    event.preventDefault();
    document.getElementById("newmap").value = document.getElementById("newmap").value + '|' + res;
    setupLists(res);
  });

  $('.findfriendbutton').mouseup(function (event) {
    event.preventDefault();
    setupFriendsList(document.getElementById("findfriend").value);
  });
});