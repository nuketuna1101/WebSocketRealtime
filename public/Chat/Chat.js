// public/chat/chat.js

const socket = io();

const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// 
socket.on('chatMessage', (msg) => {
    const item = document.createElement('div');
    item.textContent = msg;
    messages.appendChild(item);
    // 자동 스크롤
    messages.scrollTop = messages.scrollHeight;
});

// 채팅 입력 후 누를 시에 전송
sendButton.addEventListener('click', () => {
    const msg = messageInput.value;
    if (msg) {
        socket.emit('chatMessage', msg);
        messageInput.value = '';
    }
});

// 엔터 입력으로도 호환
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
