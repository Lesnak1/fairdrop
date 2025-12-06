'use client';

import { motion } from 'framer-motion';

interface WelcomeScreenProps {
    onAnalyze: () => void;
    isConnected: boolean;
}

export default function WelcomeScreen({ onAnalyze, isConnected }: WelcomeScreenProps) {
    const features = [
        { icon: '📊', text: 'Analyze your real Farcaster activity' },
        { icon: '🎯', text: 'Get your airdrop eligibility score' },
        { icon: '💰', text: 'Estimate potential token allocation' },
        { icon: '🏆', text: 'See your tier ranking' },
    ];

    return (
        <div className="welcome-screen">
            <motion.div
                className="welcome-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
            >
                🪂
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="welcome-title">FAIRDROP</h1>
                <p className="app-subtitle">Airdrop Estimator</p>
            </motion.div>

            <motion.p
                className="welcome-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Discover your potential airdrop allocation based on your real Farcaster activity and engagement.
            </motion.p>

            <motion.div
                className="features-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="feature-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                    >
                        <span className="feature-icon">{feature.icon}</span>
                        <span className="feature-text">{feature.text}</span>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                className="analyze-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
            >
                <button className="btn-analyze" onClick={onAnalyze}>
                    {isConnected ? 'CHECK MY AIRDROP' : 'CONNECT & ANALYZE'}
                </button>
            </motion.div>
        </div>
    );
}
