'use strict';

//ダイレクトメッセージ
function dm(id){
  const userName = $('#userName').val();
  const message = $('#message').val();
  socket.emit('sendDMEvent', message, userName, id);
};


socket.on('receiveDMEvent', function (data1, data2, data3, data4) {

  //data1 = 本文, data2 = 送信者, data3 = 投稿日時, data4 = メッセージid<-日付.getTime()
  if(reverseFlag){
      
      //自分のメッセージの時の表示
      if ($('#userName').val() === data2) {

          $('#thread').prepend('<div class="message_box">'+'<div id= "' + data4 + '">' + '<div id="sent_message">' + data2 + 'さん：'
              + '</br>[投稿日時]' + data3 + '<p class="myUser">' + data1 + '</p>' + '</div>'
              + '<input type="button" value="削除" onclick="deletemsg(this.parentNode.id);">' + '</div>'+'</div>');
              
      }
      
      //他人のメッセージの時の表示
      else {
          $('#thread').prepend('<div class="message_box">'+'<div id = "' + data4 + '">' + '<div id="sent_message">'
              + '<p class="otherUser">' + data1 + '</p>' + data2 + 'さん：' + '</br>[投稿日時]' + data3 + '</div>' + '</div>');

      }
  }
  else{
      if ($('#userName').val() === data2) {

          $('#thread').append('<div class="message_box">'+'<div id= "' + data4 + '">' + '<div id="sent_message">' + data2 + 'さん：'
              + '</br>[投稿日時]' + data3 + '<p class="myUser">' + data1 + '</p>' + '</div>'
              + '<input type="button" value="削除" onclick="deletemsg(this.parentNode.id);">' + '</div>');

      }

      //他人のメッセージの時の表示
      else {
          $('#thread').append('<div class="message_box">'+'<div id = "' + data4 + '">' + '<div id="sent_message">'
              + '<p class="otherUser">' + data1 + '</p>' + data2 + 'さん：' + '</br>[投稿日時]' + data3 + '</div>' + '</div>');

      }
  }
  //Formを空にする
  var str = $('#message').text().replace(message, '');
  $('#message').val(str);
});