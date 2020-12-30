/* 在 node.js 使用 ws 套件 */
const WebSocket = require('ws');
const port = 8080;

const server = new WebSocket.Server({ port});
const TYPE_ENTER = 'ENTER';
const TYPE_LEAVE = 'LEAVE';
const TYPE_MESSAGE = 'MESSAGE';


server.on('open', function open() {
  console.log('connected');
});

// 只要有 client 連接上，就會觸發，並給當前的 client 創建一個 Websocket(ws) 物件
server.on('connection', function connection(ws, request) {
  const port = request.connection.remotePort;
  const clientName = `使用者 ${port}`;

  console.log('%s is connected', clientName)

  broadcast({
    type: TYPE_ENTER,
    message: `${clientName} 進入了聊天室`,
    time: new Date().toLocaleTimeString()
  });

  // 每當接收到 client 端的數據，就會觸發
  ws.on('message', function incoming(message) {
    console.log('接收到了用戶數據', message)

    // 傳送訊息給該所有使用者
    broadcast({
      type: TYPE_MESSAGE,
      message: message,
      time: new Date().toLocaleTimeString()
    });
  });

  // client 端離線觸發
  ws.on('close', function close() {
    console.log(`${clientName} 離線了`);
    // 告訴所有 clients 有人離開了
    broadcast({
      type: TYPE_LEAVE,
      message: `${clientName} 已經離開聊天室`,
      time: new Date().toLocaleTimeString()
    });
  });

});

// 廣播消息给所有客户端
function broadcast(objMessage){
  server.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      // send() 僅接收字串，須轉換
      client.send( JSON.stringify(objMessage));
    }
  });
}

