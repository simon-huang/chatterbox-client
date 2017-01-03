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


app.init();
// $(document).ready(function() {
  
//   getNewMessages();

// });