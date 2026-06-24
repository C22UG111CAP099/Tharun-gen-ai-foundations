import React, { useState, useEffect } from 'react';
import { getCoachTopics, getMultiCoachAdvice, healthCheck } from './api';
import CoachDashboard from './components/CoachDashboard';
import ChatInterface from './components/ChatInterface';
import ProgressTracker from './components/ProgressTracker';

function App() {
    const [activeTab, setActiveTab] = useState('chat');
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('career');
    const [health, setHealth] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTopics();
        checkHealth();
    }, []);

    const loadTopics = async () => {
        try {
            const data = await getCoachTopics();
            setTopics(data.topics);
        } catch (error) {
            console.error('Failed to load topics:', error);
        }
    };

    const checkHealth = async () => {
        try {
            const data = await healthCheck();
            setHealth(data);
        } catch (error) {
            console.error('Health check failed:', error);
        }
    };

    const styles = {
        app: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        container: {
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '20px'
        },
        header: {
            textAlign: 'center',
            padding: '30px 0',
            color: 'white'
        },
        title: {
            fontSize: '48px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
        },
        subtitle: {
            color: '#aaa',
            fontSize: '18px'
        },
        status: {
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            marginTop: '10px',
            background: health?.status === 'healthy' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
            color: health?.status === 'healthy' ? '#22c55e' : '#ef4444'
        },
        nav: {
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap'
        },
        navButton: {
            padding: '12px 24px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            color: '#aaa',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease'
        },
        navButtonActive: {
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none'
        },
        content: {
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '24px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            minHeight: '500px'
        }
    };

    return (
        <div style={styles.app}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>🎯 AI Coach</h1>
                    <p style={styles.subtitle}>Your Personal AI-Powered Coach for Life, Career & Growth</p>
                    {health && <div style={styles.status}>● {health.status}</div>}
                </div>

                <div style={styles.nav}>
                    {['chat', 'dashboard', 'progress'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                ...styles.navButton,
                                ...(activeTab === tab ? styles.navButtonActive : {})
                            }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div style={styles.content}>
                    {activeTab === 'chat' && (
                        <ChatInterface 
                            topics={topics}
                            selectedTopic={selectedTopic}
                            setSelectedTopic={setSelectedTopic}
                            onSendMessage={getMultiCoachAdvice}
                        />
                    )}
                    {activeTab === 'dashboard' && (
                        <CoachDashboard topics={topics} />
                    )}
                    {activeTab === 'progress' && (
                        <ProgressTracker />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;