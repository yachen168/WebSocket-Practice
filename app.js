const socket = new WebSocket("ws://localhost:8080");

init();

function submit() {
  const msgInput = document.querySelector(".input-msg");
  const message = msgInput.value;
  // 給 websocket 發送訊息
  socket.send(message);
  resetMsgInput();
}


function init(){
  const submitButton = document.querySelector(".button-submit");
  submitButton.addEventListener("click", submit);
  socket.addEventListener('message', receiveMessage);
}

function receiveMessage(e){
  const objData = JSON.parse(e.data);
  const content = document.querySelector('.content');
  const div = document.createElement('div');
  div.innerText = `${objData.message}----${objData.time}`

  switch (objData.type) {
    case 'ENTER':
      addClass(div, 'font-enter');
      break;
      
    case "MESSAGE":
      addClass(div, 'font-message');
      break;

    case "LEAVE":
      addClass(div, 'font-leave'); 
  }

    content.appendChild(div);
}

function resetMsgInput(){
  msgInput.value = '';
}

function addClass(element, className){
  element.classList.add(className);
}