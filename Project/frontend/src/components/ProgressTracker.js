import React, { useState, useEffect } from 'react';
import { getProgressHistory, trackProgress } from '../api';

function ProgressTracker() {
    const [progress, setProgress] = useState({
        career: 65,
        fitness: 80,
        learning: 45,
        mental: 70,
        finance: 50,
        relationships: 85
    });

    const topics = Object.keys(progress);

    const styles = {
        container: {
            padding: '10px'
        },
        item: {
            marginBottom: '24px'
        },
        label: {
            display: 'flex',
            justifyContent: 'space-between',
            color: '#ddd',
            marginBottom: '8px'
        },
        bar: {
            width: '100%',
            height: '10px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '5px',
            overflow: 'hidden'
        },
        fill: {
            height: '100%',
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            borderRadius: '5px',
            transition: 'width 0.5s ease'
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '30px'
        },
        statCard: {
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
        },
        statValue: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#667eea'
        },
        statLabel: {
            color: '#888',
            fontSize: '14px',
            marginTop: '4px'
        }
    };

    const averageProgress = Object.values(progress).reduce((a, b) => a + b, 0) / Object.values(progress).length;

    return (
        <div style={styles.container}>
            <h2 style={{ color: 'white', marginBottom: '24px' }}>📈 Your Progress</h2>

            {topics.map(topic => (
                <div key={topic} style={styles.item}>
                    <div style={styles.label}>
                        <span>{topic.charAt(0).toUpperCase() + topic.slice(1)}</span>
                        <span>{progress[topic]}%</span>
                    </div>
                    <div style={styles.bar}>
                        <div style={{ ...styles.fill, width: `${progress[topic]}%` }} />
                    </div>
                </div>
            ))}

            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={styles.statValue}>{Math.round(averageProgress)}%</div>
                    <div style={styles.statLabel}>Overall Progress</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statValue}>
                        {Object.values(progress).filter(v => v >= 80).length}
                    </div>
                    <div style={styles.statLabel}>Areas of Excellence</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statValue}>
                        {Object.values(progress).filter(v => v < 50).length}
                    </div>
                    <div style={styles.statLabel}>Areas to Improve</div>
                </div>
            </div>
        </div>
    );
}

export default ProgressTracker;