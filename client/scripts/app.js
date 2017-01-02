// YOUR CODE HERE:
// var message = {
//   username: 'brenner',
//   text: 'test 11:48am',
//   roomname: 'trial'
// };



var getNewMessages = function() {
  $.ajax('https://api.parse.com/1/classes/messages', {
    success: function (data) {
      
      console.log('this is the data: ' + data);
      $('#chats').text(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });



$(document).ready(function() {
  
  getNewMessages();

});