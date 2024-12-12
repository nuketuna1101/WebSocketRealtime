//====================================================================================================================
//====================================================================================================================
// src/handler/register.handler.js
// 회원 등록 핸들러
//====================================================================================================================
//====================================================================================================================

import { v4 as uuidv4 } from 'uuid';
import { addUser } from '../models/user.model.js';
import { handleConnection, handleDisconnect } from './helper.js';

const registerHandler = (io) => {
    io.on('connection', (socket) => {
        // 최초 커넥션을 맺은 이후 발생하는 각종 이벤트를 처리하는 곳
        // UUID 생성
        const userUUID = uuidv4();
        // 사용자 추가
        addUser({ uuid: userUUID, socketId: socket.id });
        // 접속시 유저 정보 생성 이벤트 처리
        handleConnection(socket, userUUID);
        // 메세지를 data 란 이름으로 handlerEvent 함수로 전달합니다.
        socket.on('event', (data) => handleEvent(io, socket, data));
        // 접속 해제 시 이벤트 처리
        socket.on('disconnect', () => handleDisconnect(socket, userUUID));
    });
};

export default registerHandler;