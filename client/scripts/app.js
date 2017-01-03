// YOUR CODE HERE:


var app = {};

app.server = 'https://api.parse.com/1/classes/messages';

app.init = function() {
  this.fetch();
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: {order: '-createdAt'},
    success: function (data) {
      
      app.renderAll(data.results);
      // console.log('this is the data: ' + data);
      // $('#chats').text(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderAll = function(messageArray) {
  for (var m of messageArray) {
    this.renderMessage(m);
  }
};

app.renderMessage = function(message) {
  var $newMessage = $('<div class="message">');
  $newMessage.text(message.username + ': ' + message.text);
  $('#chats').append($newMessage);
};

app.renderRoom = function(room) {
  var $newRoom = $('<div class="room">');
  $newRoom.text(room);
  $('#roomSelect').append($newRoom);
};



$(document).ready(function() {
  app.init();
  var user = window.location.search.match(/username=(.*)/)[1];
  var room = 'lobby';
  
  $('#submit').click(function(event) {
    var input = $('#send-message').val();
    $('#send-message').val('');
    var message = {
      username: user,
      text: input,
      roomname: 'lobby'
    };
    app.send(message);
  });

  $('h1').hover(function(event) {
    $(this).css('cursor', 'pointer');
  });
  $('h1').click(function(event) {
    app.clearMessages();
    app.fetch();
  });

});




