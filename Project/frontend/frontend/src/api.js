import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 60000,
    headers: { 'Content-Type': 'application/json' },
});

// Coach API calls
export const getCoachAdvice = async (topic, question, provider = 'openai') => {
    const response = await api.post('/coach/advice', {
        topic,
        question,
        provider
    });
    return response.data;
};

export const getMultiCoachAdvice = async (topic, question) => {
    const response = await api.post('/coach/multi-advice', {
        topic,
        question
    });
    return response.data;
};

export const getCoachTopics = async () => {
    const response = await api.get('/coach/topics');
    return response.data;
};

export const trackProgress = async (userId, topic, data) => {
    const response = await api.post('/coach/progress', {
        userId,
        topic,
        data
    });
    return response.data;
};

export const getProgressHistory = async (userId, topic) => {
    const response = await api.get(`/coach/progress/${userId}/${topic}`);
    return response.data;
};

export const healthCheck = async () => {
    const response = await api.get('/');
    return response.data;
};