'use strict';

// 入力されたユーザ名を取得する
const userName = $('#userName').val();

// 入室メッセージイベントを送信する
socket.emit('sendEnterEvent', userName);

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterEvent', function (data) {
    $('#thread').prepend('<div class="message_box">' + '<p class="enter_message">' + data + 'さんが入室しました。' + '</p>' + '</div>');
});

//表示名変更
socket.on('chengeNameEvent', function(data) {
    $('#room-login-userName').empty();
    $('#room-login-userName').prepend('ログインユーザー：' + data + 'さん');
    $('#userName').val(data);
});


// サーバから受信したall_usersと接続中のクライアントのIDを比較
//どちらにもIDがある場合はログイン中のユーザーとする
socket.on('enterIDEvent', function (all_users, clients_IDs) {
    let active_user = {};
    for (let name in all_users){
        for (let i in clients_IDs){
            if (all_users[name] === clients_IDs[i]){
                active_user[name] = clients_IDs[i];
            }
        }
    }
    $('.activeusername').remove();
    for (let name in active_user) {
        $('#users_name').prepend('<p style="margin-bottom: 0rem;"><a class="activeusername" ' + 'id ="' + active_user[name] + '" onclick="dm(this.id);return false;">' + name + '</a></p>');
    }
});
