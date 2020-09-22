'use strict';

let all_users = {};

module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する 
    
    socket.on('sendEnterEvent', function (data) {

        if(all_users[data]) data = data + '@' + randstr();

        //入室者のクライアントidを取得
        let id = socket.id;
        console.log('入室 : ' + data + ' : ' + id);
        //入室者のnameとクライアントidを格納
        all_users[String(data)] = id
        console.log(all_users);

        //接続中のクライアントをすべて取得
        let clients_IDs = Object.keys(io.engine.clients);
        console.log(clients_IDs);

        socket.emit('chengeNameEvent', data);
        socket.broadcast.emit('receiveEnterEvent', data);
        io.sockets.emit('enterIDEvent', all_users, clients_IDs)
    });
};

function randstr() { //return = 4文字のランダム文字列
    var l = 4;

    var c = "abcdefghijklmnopqrstuvwxyz0123456789";

    var cl = c.length;
    var r = "";

    for (var i = 0; i < l; i++) {
        r += c[Math.floor(Math.random() * cl)];
    }

    return r;
}
