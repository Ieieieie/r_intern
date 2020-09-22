'use strict';

module.exports = function (socket, io) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendExitEvent', function (data) {

        //退室者のクライアントidを取得
        let id = socket.id;
        console.log('退室 : ' + data + ' : ' + id);

        socket.broadcast.emit('receiveExitEvent', data, id);
    });
};