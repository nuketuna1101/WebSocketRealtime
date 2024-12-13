//====================================================================================================================
//====================================================================================================================
// src/handlers/helper.js
// 컨텐츠 외 이벤트 핸들러
//====================================================================================================================
//====================================================================================================================
import { createStage } from '../models/stage.model.js';
import { getUsers, removeUser } from '../models/user.model.js';
import { CLIENT_VERSION } from '../constants.js';
import handlerMappings from './handlerMapping.js';


// 연결 해제 핸들링
export const handleDisconnect = (socket, uuid) => {
    // 사용자 삭제
    removeUser(socket.id);
    console.log(`User disconnected: ${socket.id}`);
    console.log('Current users:', getUsers());
};

// 연결 핸들링
export const handleConnection = (socket, userUUID) => {
    console.log(`New user connected: ${userUUID} with socket ID ${socket.id}`);
    console.log('Current users:', getUsers());


    // 스테이지 빈 배열 생성
    createStage(userUUID);

    // emit 메서드로 해당 유저에게 메시지를 전달할 수 있다.
    // 현재의 경우 접속하고 나서 생성된 uuid를 바로 전달해주고 있다.
    socket.emit('connection', { uuid: userUUID });
};

// 3가지 기능: 클라이언트 버전 체크, 핸들러 매핑, 유저에게 메시지 전송
export const handleEvent = (io, socket, data) => {

    // 서버에 저장된 클라이언트 배열에서 메세지로 받은 clientVersion을 확인합니다.
    if (!CLIENT_VERSION.includes(data.clientVersion)) {
        // 만약 일치하는 버전이 없다면 response 이벤트로 fail 결과를 전송합니다.
        socket.emit('response', { status: 'fail', message: 'Client version mismatch' });
        return;
    }

    // 핸들러id에 따라 핸들러 매핑 과정
    const handler = handlerMappings[data.handlerId];
    if (!handler) {
        socket.emit('response', { status: 'fail', message: 'Handler not found' });
        return;
    }

    console.log("Handler ID:", data.handlerId);
    console.log("Payload:", data.payload);


    // 적절한 핸들러에 userID 와 payload를 전달하고 결과를 받습니다.
    const response = handler(data.userId, data.payload);
    // 만약 결과에 broadcast (모든 유저에게 전달)이 있다면 broadcast 합니다.
    if (response.broadcast) {
        io.emit('response', response);
        return;
    }
    // 해당 유저에게 적절한 response를 전달합니다.
    socket.emit('response', response);
};