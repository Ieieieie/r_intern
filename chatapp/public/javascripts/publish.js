'use strict';

let prev, now, sec;
//新しい順と古い順をフラグ
let reverseFlag = true;
//最後に投稿したユーザー名
let lastUser;

function publish() {

    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();

    // もし60秒経過していれば投稿内容を送信
    //now = 投稿ボタンを押した時の現在時刻
    //最後に投稿したユーザーと同じか判定
    if(lastUser !== userName){
        now = new Date();
        if (!prev) prev = now;

        if ((sec = now.getTime() - prev.getTime()) === 0) {
            socket.emit('sendMessageEvent', message, userName);

        } else if (sec >= 60000) {
            socket.emit('sendMessageEvent', message, userName);
            prev = now;

        } else {
            alert('あと' + (60 - Math.round(sec / 1000)) + '秒後まで投稿できません');
            
        }
        socket.emit('senduserNameEvent', userName);
      
    }else{
        alert('同じユーザーは連続して投稿できません');
    }
}

function deletemsg(id) {

    //メッセージ削除イベント
    socket.emit('sendDeleteEvent', id);
}

function keyevent() {

    //キー操作あれこれ Enterで送信、Shift＋Enterで改行
    if (window.event.keyCode === 13 && window.event.shiftKey === false) {
        publish();
    }
}

//古い順にするメソッド
function reverseOrder(){
    
    let messageArray = new Array();

    for(let i = 0; i<$('#thread > div').length; i++){
        messageArray.push($('.message_box:eq('+i+')').html());
    }
    $('#thread').empty();
    for(let i = messageArray.length -1; 0<=i; i--){
        $('#thread').append('<div class="message_box">'+messageArray[i]+'</div>');
    }
    reverseFlag = !reverseFlag;
    if(reverseFlag == false){
        $('.room-reverse_order_button').val('新しい順');
    }else{
        $('.room-reverse_order_button').val('古い順');
    }
}

//新しい順に戻すメソッド
function inOrder(){
    let messageArray = new Array();
    for(let i = 0; i<$('#thread > div').length; i++){
        messageArray.push($('.message_box:eq('+i+')').html());
    }
    $('#thread').empty();
    
    for(let i = 0; i<messageArray.length; i++){
        $('#thread').append('<div class="message_box">'+messageArray[i]+'</div>');
    }
    
    reverseFlag = true;
}

socket.on('receiveMessageEvent', function (data1, data2, data3, data4) {

    //data1 = 本文, data2 = 送信者, data3 = 投稿日時, data4 = メッセージid<-日付.getTime()
    if(reverseFlag){
        
        //自分のメッセージの時の表示
        if ($('#userName').val() === data2) {

            $('#thread').prepend('<div class="message_box">'+'<div id= "' + data4 + '">' + '<div id="sent_message">' + data2 + 'さん：'
                + '</br>' + data3 + '<p class="myUser">' + data1 + '</p>' + '</div>'
                + '<input type="button" value="削除" onclick="deletemsg(this.parentNode.id);">' + '</div>'+'</div>');
            
                lastUser = data2;
        }
        
        //他人のメッセージの時の表示
        else {
            $('#thread').prepend('<div class="message_box">'+'<div id = "' + data4 + '">' + '<div id="sent_message">'
                + '<p class="otherUser">' + data1 + '</p>' + data2 + 'さん：' + '</br>' + data3 + '</div>' + '</div>');
            
                lastUser = data2;
        }
    }
    else{
        if ($('#userName').val() === data2) {

            $('#thread').append('<div class="message_box">'+'<div id= "' + data4 + '">' + '<div id="sent_message">' + data2 + 'さん：'
                + '</br>' + data3 + '<p class="myUser">' + data1 + '</p>' + '</div>'
                + '<input type="button" value="削除" onclick="deletemsg(this.parentNode.id);">' + '</div>');
                lastUser = data2;
        }

        //他人のメッセージの時の表示
        else {
            $('#thread').append('<div class="message_box">'+'<div id = "' + data4 + '">' + '<div id="sent_message">'
                + '<p class="otherUser">' + data1 + '</p>' + data2 + 'さん：' + '</br>' + data3 + '</div>' + '</div>');
                lastUser = data2;
        }
    }
    //Formを空にする
    var str = $('#message').text().replace(message, '');
    $('#message').val(str);
});

socket.on('receiveDeleteEvent', function (id) {

    //指定idのメッセージを削除
    $('#' + id).parent().remove();
});
