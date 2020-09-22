'use strict';
module.exports = function (socket, io) {
  socket.on('sendDMEvent', function (message, userName, id) {
    if (!message || !userName || !message.match(/\S/g)) {
        console.log('空のでの投稿やスペース,改行のみの投稿はできません')
        return;
    }
    console.log(userName + 'さんからのDM：' + message);

    let now = (new Date()).toLocaleString("ja"); 
    let time_id = (new Date()).getTime();
    console.log(now);

    io.to(id).emit('receiveDMEvent', message, userName,now,time_id);
    socket.emit('receiveDMEvent', message, userName,now,time_id);
  });
};