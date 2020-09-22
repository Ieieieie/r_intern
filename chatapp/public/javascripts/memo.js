'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // メモの内容を表示

    if (!userName || !message || !message.match(/\S/g)) {
        console.log('空やスペース,改行のみのメモは作成できません')
        return;
    }
    $('#thread').prepend('<div class="message_box">'+'<div class="sent_message">' + userName + 'さんのメモ：'
        + '<p class="memo">' + message + '</p>' + '</div>' + '</div>');
    var str = $('#message').text().replace(message, '');
    $('#message').val(str);
}
