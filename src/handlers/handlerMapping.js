//====================================================================================================================
//====================================================================================================================
// src/handler/handlerMapping.js
// 핸들러 매핑
//====================================================================================================================
//====================================================================================================================

import { moveStageHandler } from './stage.handler.js';
import { gameEnd, gameStart } from './game.handler.js';
import { itemGained } from './item.handler.js';
import { chatReceived } from './chat.handler.js';

const handlerMappings = {
    2: gameStart,
    3: gameEnd,
    4: itemGained,
    5: chatReceived,
    11: moveStageHandler,
};

export default handlerMappings;