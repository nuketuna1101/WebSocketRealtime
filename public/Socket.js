//====================================================================================================================
//====================================================================================================================
// public/Socket.js
// 클라이언트 단: 소켓 통신 코드
// from S to C 이벤트 수신: socket.on(이벤트명)
// from C to S 이벤트 전송: sendEvent(핸들러id)
//====================================================================================================================
//====================================================================================================================
import { CLIENT_VERSION } from './Constants.js';

// 클라이언트 버전에 맞게 초기화
const socket = io('http://localhost:3000', {
    query: {
        clientVersion: CLIENT_VERSION,
    },
});

let userId = null;

// response 이벤트 수신
socket.on('response', (data) => {
    console.log(data);
});

// connection 이벤트 수신
socket.on('connection', (data) => {
    console.log('connection: ', data);
    userId = data.uuid;
});

// 이벤트 전송 함수
const sendEvent = (handlerId, payload) => {
    socket.emit('event', {
        userId,
        clientVersion: CLIENT_VERSION,
        handlerId,
        payload,
    });
};

export { sendEvent };
