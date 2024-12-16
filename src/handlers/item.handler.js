//====================================================================================================================
//====================================================================================================================
// src/handler/item.handler.js
// 아이템 핸들러
//====================================================================================================================
//====================================================================================================================

import { getGameAssets } from '../init/assets.js';
import { recordItemHistory } from '../models/score.model.js';

export const itemGained = (userId, payload) => {
    const { itemId } = payload;
    // 서버 시간 타임스탬프
    const timestamp = Date.now();
    console.log(">> itemId : " + itemId);
    console.log(">> timestamp : " + timestamp);
    
    // 아이템 에셋 가져오기
    const { items } = getGameAssets();
    if (!items.data || !Array.isArray(items.data)) {
        console.error('[Error] Items Invalid');
        return { status: 'fail', message: '[Error] Items Invalid' };
    }
    // 아이템 에셋에서 해당 id로 조회
    const item = items.data.find(item => item.id === itemId);
    if (!item) 
        return { status: 'fail', message: '[Not Found] cannot find item' };
    
    const itemScore = item.score;
    // 어뷰징 방지용 히스토리 기록
    recordItemHistory(userId, itemId, timestamp);

    return { 
        status: 'success', 
        resType: 'itemGained',
        itemScore 
    };
};