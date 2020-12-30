const socket = new WebSocket("ws://localhost:8080");

const btn = document.querySelector("button");
const messageInput = document.querySelector("input");
const content = document.querySelector('p');

// 與 websocket 服務器連結時觸發
socket.addEventListener("open", socketOpenHandler);

btn.addEventListener("click", submit);

function socketOpenHandler(){
  // content.innerHTML = '連接成功';
}

// 給 websocket 發送訊息
function submit() {
  const message = messageInput.value;
  socket.send(message);

  messageInput.value = '';
}

// 接收 websocket 的訊息
socket.addEventListener('message', receiveMessage);

function receiveMessage(e){
  const objData = JSON.parse(e.data)
  const div = document.createElement('div');
  div.innerText = `${objData.message}----${objData.time}`

  switch (objData.type) {
    case 'ENTER':
      div.classList.add('font-enter');
      break;
      
    case "MESSAGE":
      div.classList.add('font-message');
      break;

    case "LEAVE":
      div.classList.add('font-leave'); 
  }
    content.appendChild(div);
}