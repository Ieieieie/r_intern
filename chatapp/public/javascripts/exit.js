'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = $('#userName').val();
    // 退室メッセージイベントを送信する
    socket.emit('sendExitEvent', userName);

    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveExitEvent', function (data, id) {
    $('#thread').prepend('<div class="message_box">' + '<p class="exit_message">' + data + 'さんが退室しました。' + '</p>' + '</div>');
    // 退出者の名前を一覧から消す
    $('#' + id).remove();
});