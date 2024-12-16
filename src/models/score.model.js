//====================================================================================================================
//====================================================================================================================
// src/models/score.model.js
//====================================================================================================================
//====================================================================================================================

// 유저 점수 배열
const userScore = {};
// 어뷰징 방지용 아이템 획득 기록
const itemHistory = {};

// getter
export const getUserScore = (userId) => {
    return userScore[userId] || 0;
};

// update
export const updateUserScore = (userId, newScore) => {
    userScore[userId] = newScore;
};

// 아이템 획득 기록 함수
export const recordItemHistory = (userId, itemId, timestamp) => {
    if (!itemHistory[userId]) {
        itemHistory[userId] = [];
    }
    itemHistory[userId].push({ itemId, timestamp });
};
