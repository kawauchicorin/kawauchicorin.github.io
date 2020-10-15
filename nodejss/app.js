var PORT    = 10443;
var SSL_KEY = 'ca.key';
var SSL_CERT= 'ca.crt';

var fs = require('fs');
var io = require('socket.io').listen(PORT, {
	key  : fs.readFileSync(SSL_KEY).toString(),
	cert : fs.readFileSync(SSL_CERT).toString()
});

io.sockets.on('connection', function (socket) {
	//接続してきたらウェルカムメッセージを送信する
	setTimeout(function () {
		socket.emit('message', 'このメッセージが見えていればメッセージの受信に成功していまーす');
	}, 500);

	//誰かが接続してきたことをみんなに知らせる
	socket.broadcast.emit('message', 'だれかが来たようです');

	//誰かが切断したことをみんなに知らせる
	socket.on('disconnect', function () {
		socket.broadcast.emit('message', 'だれかが出て行きました');
	});
});
