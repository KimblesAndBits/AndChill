$(document).ready(function () {
    console.log("ready!");
    $.ajax({
    type: "GET",
    beforeSend: function (request) {
      request.setRequestHeader("user-key", '66fd25bed34c26e13258ce5da95001dc');
    },
    url: 'https://developers.zomato.com/api/v2.1/categories',
    success: function (msg) {
      console.log('mes', msg)
    }
  });
  });