//====================================================================================================================
//====================================================================================================================
// src/handler/handlerMapping.js
// 핸들러 매핑
//====================================================================================================================
//====================================================================================================================

import { moveStageHandler } from './stage.handler.js';

const handlerMappings = {
    11: moveStageHandler,
};

export default handlerMappings;