
var socket = io();

socket.on('userLeft', () => {
	$('#chat_messages').append($('<li>').text('A user left.'));
});

socket.on('userJoined', () => {
	$('#chat_messages').append($('<li>').text('A user joined.'));
});

socket.on('sendMessage', (message) => {
	$('#chat_messages').append($('<li>').text(message.name + ': ' + message.text));
});

socket.on('userTyping', (users) => {
	$('#isTyping').text(users.filter(user => user.id !== socket.id)
		.map(user => user.name + ' is typing...')
		.join(' '));
});

$(function () {
	$('form').submit(function() {
		socket.emit('sendMessage', { name: $('#name').val(), text: $('#message').val() });
		$('#chat_messages').append($('<li>').text('You: ' + $('#message').val()));		
		$('#message').val('');
		return false;
	});

	$('#message').on('input', () => {
		socket.emit('userTyping', { name: $('#name').val(), text: $('#message').val() });
	});

	$('#name').on('input', () => {
		socket.emit('changingName', $('#name').val());
	});
});