$(document).ready(function () {
  var user = $("h1").text();
  var res = '+' + user.substring(9, user.length) + '+';
  console.log(res);
});