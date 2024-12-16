//====================================================================================================================
//====================================================================================================================
// public/Socket.js
// 클라이언트 단: 소켓 통신 코드
// from S to C 이벤트 수신: socket.on(이벤트명)
// from C to S 이벤트 전송: sendEvent(핸들러id)
//====================================================================================================================
//====================================================================================================================
import { CLIENT_VERSION } from './Constants.js';
import Score from './Score.js';

// 클라이언트 버전에 맞게 초기화
const socket = io('http://localhost:3000', {
    query: {
        clientVersion: CLIENT_VERSION,
    },
});

let userId = null;

// response 이벤트 수신 및 broadcast 여부 확인
socket.on('response', (data) => {
    // resType에 따라
    if (data.status !== 'success')
        console.log("[Error] failed to get response" + resType);

    const resType = data.resType;
    switch (resType) {
        case 'chatReceived':
            handleResChatReceived(data);
            break;
        case 'itemGained':
            handleResItemGained(data);
            break;
        default:
            console.log("[Unknown] Unknown Response Success " + resType);
            break;
    }
});

// connection 이벤트 수신
socket.on('connection', (data) => {
    console.log('connection: ', data);
    userId = data.uuid;
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

//====================================================================================================================
//====================================================================================================================
// handle response 로직들

const handleResChatReceived = (data) => {
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
};


const handleResItemGained = (data) => {
    if (data.status === 'success')
        scoreInstance.addScore(data.itemScore); // Score 인스턴스에 점수 추가
    else
        console.log("Failed to gain item: " + data.message);
};


//====================================================================================================================
// Score 클래스의 인스턴스를 저장할 변수 선언
let scoreInstance = null; 
// Score 인스턴스를 설정하는 함수
const setScoreInstance = (score) => {
    scoreInstance = score;
};

export { sendEvent, setScoreInstance };
