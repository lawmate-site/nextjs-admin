import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';
const API_URL = 'http://localhost:8000/admin/chat';

export const createChatRoom = async (sender: string, receiver: string) => {
    const response = await axios.get(`${API_URL}/create`, { params: { sender, receiver } });
    return response.data;
};

export const getChatHistory = async (roomId: string) => {
    const response = await fetch(`http://localhost:8000/admin/chat/history?roomId=${roomId}`, {
        method: 'GET',
        credentials: 'include',
    });
    return response.json();
};

export const sendMessage = async (chatMessage: any) => {
    await fetch('http://localhost:8000/admin/chat/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatMessage),
        credentials: 'include',
    });
};

export const getMessages = (roomId: string) => {
    return new EventSourcePolyfill(`http://localhost:8000/admin/chat/messages?roomId=${roomId}`, {
        withCredentials: true,
    });
};