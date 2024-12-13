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

// response 이벤트 수신 및 broadcast 여부 확인
socket.on('response', (data) => {
    if (data.broadcast) {
        // 브로드캐스트 시 채팅에 입력
        console.log("This response was broadcasted.");
        const item = document.createElement('div');
        item.textContent = data.message;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    } else {
        console.log("This response was not broadcasted.");
    }
});



// connection 이벤트 수신
socket.on('connection', (data) => {
    console.log('connection: ', data);
    userId = data.uuid;
});

// chatMessage 브로드캐스트 이벤트 발생 시 띄워주기
socket.on('chatMessage', (msg) => {
    console.log('chatMessage: ', msg);
    const item = document.createElement('div');
    item.textContent = msg;
    messages.appendChild(item);
    // 자동 스크롤
    messages.scrollTop = messages.scrollHeight;
});



// 이벤트 전송 함수
const sendEvent = (handlerId, payload) => {
    console.log("sendEvent called with:", handlerId, payload); // 로그 추가
    socket.emit('event', {
        userId,
        clientVersion: CLIENT_VERSION,
        handlerId,
        payload,
    });
};

export { sendEvent };




