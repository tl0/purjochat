$(function() {  
  var socket = io.connect('http://' + window.location.hostname);
  
  socket.on('message', function (d) {
    console.log(d)
    $("#chat-" + d.msg.user).find("ul").append("<li><p class='speech'>" + d.msg.message + "</p></li>");
    $("#chat-" + d.msg.user + " > chat-box-content").scrollTop($("#chat-" + d.msg.user + " > chat-box-content")[0].scrollHeight);
  });
  
  $("#input-kallu").keyup(function(e) {
    if(e.keyCode == 13) {
        socket.emit('send', { user: "kallu", message: $("#input-kallu").val() });
        console.log("Kalu :D");
    }
  });
});
