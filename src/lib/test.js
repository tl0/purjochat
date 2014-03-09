var socket = io.connect('http://' + window.location.hostname);
var me = -1;
$(function() {
  socket.on('meta', function(d) {
    me = d.yourID;
    $("#container").append("<p>You are " + me + ".</p>");
    $.each(d.others, function(k, v) {
      if(k != me)
      $("#main").find("ul").append("<li id='"+k+"' onclick=\"addWindow('"+k+"');\">"+v+"</li>").fadeOut(function() {$(this).fadeIn(); });
    });
  });
  
  socket.on('join', function(d) {
    console.log(d);
    $("#main").find("ul").append("<li id='"+d.user+"' onclick=\"addWindow('"+d.user+"');\">"+d.user+"</li>").fadeOut(function() {$(this).fadeIn(); });
  });
  
  socket.on('message', function (d) {
    console.log(d);
    if($(".chat-area").find("#chat-" + d.receiver).length < 1) {
      addWindow(d.receiver);
    }
    $("#chat-" + d.receiver).find("ul").append("<li><p class='speech "+ ((d.receiver == me) ? "own" : "other") +"'>" + d.message + "</p></li>");
  });
  
  $("#input*").keyup(function(e) {
    if(e.keyCode == 13) {
        socket.emit('send', { receiver: $(this).data('user'), user: me, message: $(this).val() });
        console.log("Kalu :D");
    }
  });
  
  socket.on('quit', function(d) {
    $("#main").find("#" + d.user).slideUp(function() {$(this).remove(); });
  });
  
  $(window).unload(function() {
    socket.emit('quit', { user: me });
  });
  
  
  
});

function addWindow(id) {
    $(".chat-area").append("<div id='chat-"+id+"' class='chat-box'><input type='checkbox'><label data-expanded='Close "+id+"' data-collapsed='Open "+id+"'></label><div class='chat-box-content'><p style='white-space:pre;'></p><ul></ul><p></p><input id='input' data-user='"+id+"'></div></div>");
    // hyi copypaste
    $("#chat-"+id+"").find("input").keyup(function(e) {
    if(e.keyCode == 13) {
        socket.emit('send', { receiver: me, user: $(this).data('user'), message: $(this).val() });
        console.log("Kalu :D");
    }
  });
}
