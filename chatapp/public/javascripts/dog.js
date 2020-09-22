'use strict';

function dog() {
    $.get("https://dog.ceo/api/breeds/image/random", function (data) {
        const userName = $('#userName').val();
        let str = '<img src=' + data.message + ' width ="300" height ="auto">'

        console.log(data.message);

        now = new Date();
        if (!prev) prev = now;

        if ((sec = now.getTime() - prev.getTime()) === 0) {
            socket.emit('sendMessageEvent', str, userName);

        } else if (sec >= 60000) {
            socket.emit('sendMessageEvent', str, userName);
            prev = now;

        } else {
            alert('あと' + (60 - Math.round(sec / 1000)) + '秒後まで投稿できません');
        }

        socket.emit('senduserNameEvent', userName);
    });

}
