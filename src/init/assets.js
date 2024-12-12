//====================================================================================================================
//====================================================================================================================
// src/init/assets.js
// 전역 에셋 파일 읽기 위해 fs 모듈 이용한 파일 리딩
//====================================================================================================================
//====================================================================================================================
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


// 현재 파일의 절대 경로. 이 경로는 파일의 이름을 포함한 전체 경로
const __filename = fileURLToPath(import.meta.url);
// path.dirname() 함수는 파일 경로에서 디렉토리 경로만 추출 (파일 이름을 제외한 디렉토리의 전체 경로)
const __dirname = path.dirname(__filename);
// 최상위 경로 + 에셋 폴더
const basePath = path.join(__dirname, '../../assets');
// 전역 에셋
let gameAssets = {};

// 파일 읽어오기 (async parallel processing: Promise)
const readFileAsync = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
};

// 읽은 데이터 테이블에 대한 서버 메모리 load (async parallel processing: Promise)
export const loadGameAssets = async () => {
    try {
        const [stages, items, itemUnlocks] = await Promise.all([
            readFileAsync('stage.json'),
            readFileAsync('item.json'),
            readFileAsync('item_unlock.json'),
        ]);
        gameAssets = { stages, items, itemUnlocks };
        return gameAssets;
    } catch (error) {
        throw new Error('Failed to load game assets: ' + error.message);
    }
};

export const getGameAssets = () => {
    return gameAssets;
};
