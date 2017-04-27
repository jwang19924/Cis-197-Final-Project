$(document).ready(function () {
  var user = $("h1").text();
  var res = '+' + user.substring(8, user.length) + '+';
  console.log(res);
});