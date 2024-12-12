//====================================================================================================================
//====================================================================================================================
// app.js
//====================================================================================================================
//====================================================================================================================

import express from 'express';
import { createServer } from 'http';
// inits
import initSocket from './init/socket.js';
import { loadGameAssets } from './init/assets.js';

const app = express();
const server = createServer(app);

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 정적 파일 서빙
app.use(express.static('public'));

// 소켓 시작
initSocket(server);

// 
server.listen(PORT, async () => {
    console.log(`:: Server is running on port ${PORT}`);

    try {
        // Asset loading
        const assets = await loadGameAssets();
        console.log(assets);
        console.log('Assets loaded successfully');
    } catch (error) {
        console.error('Failed to load game assets:', error);
    }
});
