const socket = new WebSocket("ws://localhost:8080");

const submitButton = document.querySelector(".button-submit");
const msgInput = document.querySelector(".input-msg");
const content = document.querySelector('.content');

init();

// 給 websocket 發送訊息
function submit() {
  const message = msgInput.value;

  socket.send(message);
  resetMsgInput();
}


function init(){
  submitButton.addEventListener("click", submit);
  // 接收 websocket 的訊息
  socket.addEventListener('message', receiveMessage);
}

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


function resetMsgInput(){
  msgInput.value = '';
}