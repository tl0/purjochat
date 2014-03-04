$(function() {  
  var socket = io.connect('http://localhost');
  
  socket.on('message', function (d) {
    $("body").append(d.msg.message);
    console.log(d)
  });
  
  $("#kallu").keyup(function(e) {
    if(e.keyCode == 13) {
        socket.emit('send', { message: $("#kallu").val() });
        console.log("Kalu :D");
    }
  });
});
