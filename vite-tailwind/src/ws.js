import { notify } from './util/htmlNotify'

var ws = new WebSocket("ws://127.0.0.1:9000/ws/user1");
ws.onmessage = function (event) {
  console.log(event.data);
  notify('oa通知', event.data)
};
// setInterval(() => {
//   ws.send('hello websocket')
// }, 2000);
