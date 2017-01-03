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

app.fetch = function(roomname = 'All messages') {
  var params = {order: '-createdAt'};

  if (roomname !== 'All messages') {
    params.where = {'roomname': roomname};
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
  var $newMessage = $(`<div class="message ${message.roomname}">`);
  $newMessage.text('(' + message.roomname + ')' + message.username + ': ' + message.text);
  $('#chats').append($newMessage);
  this.updateRoomList(message.roomname);
};

app.renderNewMessages = function() {

};

app.updateRoomList = function(nameOfRoom) {
  
  if (this.rooms[nameOfRoom] === undefined) {
    this.rooms[nameOfRoom] = true;
    var $newRoom = $(`<option value=${nameOfRoom}>`);
    if (nameOfRoom === undefined) {
      nameOfRoom = 'undefined';
    }
    if (nameOfRoom === null) {
      nameOfRoom = 'null';
    }
    $newRoom.text(nameOfRoom);
    $('#room-selector').append($newRoom);
  }
};

app.renderRoom = function(room) {
  var $newRoom = $('<div class="room">');
  $newRoom.text(room);
  $('#roomSelect').append($newRoom);
};


//add 'new room' option that creates new input field
  //adds room to list when message is submitted
//filters messages by room when room is selected


$(document).ready(function() {
  app.init();
  var user = window.location.search.match(/username=(.*)/)[1];
  
  $('#submit').click(function(event) {
    var input = $('#send-message').val();
    var roomName = $('#room-selector').val();
    $('#send-message').val('');
    var message = {
      username: user,
      text: input,
      roomname: roomName
    };
    app.send(message);
  });
  // $('select[id="room-selector"]').change(function() {
  //   if ($(this).val() === 'c7G7w4') {
  //     //show input field
  //   }
  // });

  // $('select[id="room-selector"]').change(function() {
  //   if ($(this).val() !== 'c7G7w4') {
  //     //if All message add all
  //     else {
  //       $('.message').not()
  //     }
  //     //else fetch all, loop through, if room = this.val then apprenderRoom 
  //   }
  // });    

  $('h1').hover(function(event) {
    $(this).css('cursor', 'pointer');
  });
  $('h1').click(function(event) {
    app.clearMessages();
    app.fetch();
  });
});




