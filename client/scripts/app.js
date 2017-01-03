// YOUR CODE HERE:


var app = {};

app.server = 'https://api.parse.com/1/classes/messages';

app.rooms = {};

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

app.fetch = function(roomname) {
  var params = {order: '-createdAt', limit: 200};

  if (roomname !== undefined && roomname !== 'b5D7e3') {
    params.where = {'roomname': `${roomname}`};
  }
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: params,
    success: function (data) {     
      app.renderAll(data.results);
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
  var $newContainter = $('<div class="message">');
  var $newRoom = $('<small class="room">');
  var $newUsername = $(`<a href="#" class="user ${message.username}">`);
  var $newText = $('<span class="text">');

  $newRoom.text("(" +message.roomname + ") ");
  $newUsername.text(message.username);
  $newText.text(': ' + message.text);


  $newContainter.append($newRoom).append($newUsername).append($newText);
  //$newContainter.text('(' + message.roomname + ')' + message.username + ': ' + message.text);
  $('#chats').append($newContainter);
  this.updateRoomList(message.roomname);
};

app.renderNewMessages = function() {

};

app.updateRoomList = function(nameOfRoom) {
  if (nameOfRoom === undefined) {
    nameOfRoom = 'undefined';
  }
  if (nameOfRoom === null) {
    nameOfRoom = 'null';
  }

  // var escapedName = nameOfRoom.replace(/"/g, '\\\"');

  if (this.rooms[nameOfRoom] === undefined) {
    this.rooms[nameOfRoom] = true;
    var $newRoom = $(`<option value="${nameOfRoom}">`);
    $newRoom.text(nameOfRoom);
    $('#room-selector').append($newRoom);
  }
};

app.renderRoom = function(room) {
  var $newRoom = $('<div class="room">');
  $newRoom.text(room);
  $('#roomSelect').append($newRoom);
};


//escaping
//friending - bold friend messages

$(document).ready(function() {
  app.init();
  var user = window.location.search.match(/username=(.*)/)[1];
  
  $('#submit').click(function(event) {
    var input = $('#send-message').val();
    var roomName = $('#room-selector').val();

    //if we're adding a new room, use that new name
    if (roomName === 'c7G7w4') {
      roomName = $('#new-room-creator').val();
    }
    //if we're in 'all messages, set the room name to the default (lobby)'
    else if (roomName === 'b5D7e3') {
      roomName = 'lobby';
    }

    $('#send-message').val('');
    var message = {
      username: user,
      text: input,
      roomname: roomName
    };
    app.send(message);
    app.clearMessages();
    app.fetch(roomName);
    app.updateRoomList(roomName);
    $('#room-selector').val(roomName);
    $('#new-room-creator').hide().val('');
  });


  $('select[id="room-selector"]').change(function() {
    if ($(this).val() === 'c7G7w4') {
      $('#new-room-creator').show();
    }
    else {
      $('#new-room-creator').hide(); 
    }
    app.clearMessages();
    app.fetch($(this).val());
  });


  $('h1').hover(function(event) {
    $(this).css('cursor', 'pointer');
  });
  $('h1').click(function(event) {
    app.clearMessages();
    app.fetch();
  });

  //add friend
  // $('#chats').click('.user', function(event) {
  //   var user = $(this).val();

  // });
});




