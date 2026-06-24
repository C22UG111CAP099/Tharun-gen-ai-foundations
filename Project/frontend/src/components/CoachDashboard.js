import React, { useState, useEffect } from 'react';
import { getCoachTopics } from '../api';

function CoachDashboard({ topics }) {
    const [stats, setStats] = useState({
        sessions: 24,
        progress: 78,
        goals: 5,
        achievements: 12
    });

    const coachTips = {
        career: "🚀 Set clear career goals and create a timeline for each milestone.",
        fitness: "💪 Consistency is key. Start with 20 minutes daily.",
        learning: "📚 The 80/20 rule: Focus on the 20% that gives 80% results.",
        mental: "🧠 Practice mindfulness for 10 minutes daily.",
        finance: "💰 Build an emergency fund of 3-6 months of expenses.",
        relationships: "❤️ Active listening is the foundation of strong relationships."
    };

    const styles = {
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            padding: '10px'
        },
        card: {
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'transform 0.3s ease'
        },
        cardHover: {
            transform: 'translateY(-4px)'
        },
        statNumber: {
            fontSize: '36px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '8px 0'
        },
        statLabel: {
            color: '#888',
            fontSize: '14px'
        },
        tipSection: {
            marginTop: '30px',
            padding: '20px',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
        },
        tipTitle: {
            color: 'white',
            fontSize: '18px',
            marginBottom: '12px'
        },
        tipText: {
            color: '#ccc',
            lineHeight: '1.8'
        }
    };

    return (
        <div>
            <div style={styles.grid}>
                <div style={styles.card}>
                    <div style={styles.statLabel}>Total Sessions</div>
                    <div style={styles.statNumber}>{stats.sessions}</div>
                </div>
                <div style={styles.card}>
                    <div style={styles.statLabel}>Progress</div>
                    <div style={styles.statNumber}>{stats.progress}%</div>
                </div>
                <div style={styles.card}>
                    <div style={styles.statLabel}>Active Goals</div>
                    <div style={styles.statNumber}>{stats.goals}</div>
                </div>
                <div style={styles.card}>
                    <div style={styles.statLabel}>Achievements</div>
                    <div style={styles.statNumber}>{stats.achievements}</div>
                </div>
            </div>

            <div style={styles.tipSection}>
                <h3 style={styles.tipTitle}>💡 Coach's Tip of the Day</h3>
                <p style={styles.tipText}>
                    {topics.length > 0 ? coachTips[topics[0]] || "Stay focused on your goals!" : "Loading tips..."}
                </p>
                <p style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                    Select a topic to get personalized advice
                </p>
            </div>
        </div>
    );
}

export default CoachDashboard;