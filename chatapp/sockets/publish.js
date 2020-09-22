'use strict';

module.exports = function (socket, io) {

    // 投稿メッセージを送信する

    socket.on('sendMessageEvent', function (data1, data2) {
        if (!data1 || !data2 || !data1.match(/\S/g)) {
            console.log('空のでの投稿やスペース,改行のみの投稿はできません')
            return;
        }
        console.log(data2 + 'さん：' + data1);

        //全クライアントが受信するメッセージ表示イベント（receiveMessageEvent）を送信する
        let now = (new Date()).toLocaleString("ja"); 
        let array = now.split(',');
        let date = array[0]+'</br>'+ array[1].replace(' ','');
        let id = (new Date()).getTime();

        io.sockets.emit('receiveMessageEvent', data1, data2, date, id);
    });

    socket.on('sendDeleteEvent', function(data1) {
        io.sockets.emit('receiveDeleteEvent', data1);
    });

};
