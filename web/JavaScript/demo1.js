// 创建WebSocket连接
const socket = new WebSocket('ws://localhost:8080/Blog/mywebsocket');

// 监听连接打开事件
socket.onopen = function() {
  console.log('WebSocket连接已打开');


  // 发送消息给服务器

};

// 监听接收到消息事件
socket.onmessage = function(event) {
  const message = event.data;
  console.log('接收到服务器的消息: ' + message);

  // 在此处处理从服务器接收到的消息
};

document.querySelector("input").addEventListener('keyup',e=>{
  if(e.keyCode===13)
  {
    console.log(document.querySelector("input").value)

    socket.send(document.querySelector("input").value)
  }
})

// 监听连接关闭事件
socket.onclose = function(event) {
  console.log('WebSocket连接已关闭');

  // 在此处进行处理连接关闭事件的逻辑
};

// 监听连接错误事件
socket.onerror = function(error) {
  console.error('WebSocket连接出现错误:', error);

  // 在此处进行处理连接错误事件的逻辑
};

// 当不再需要连接时，关闭WebSocket连接
function closeWebSocket() {
  socket.close();
}