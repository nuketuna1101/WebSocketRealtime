//====================================================================================================================
//====================================================================================================================
// src/handler/chat.handler.js
// 아이템 핸들러
//====================================================================================================================
//====================================================================================================================

import { getGameAssets } from '../init/assets.js';

export const chatReceived = (userId, payload) => {
    console.log("Payload received in chatReceived:", payload);
    if (!payload || !payload.message) {
        console.error('Invalid payload received:', payload);
        return { status: 'fail', message: 'Invalid payload' };
    }
    const message = payload.message;
    // 채팅 메시지를 모든 클라이언트에게 브로드캐스트
    return { 
        status: 'success', 
        resType: 'chatReceived', 
        message: `${userId} : ${message}`, 
        broadcast: true 
    };
};
