'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const loadingSteps = [
    'Connecting to Farcaster...',
    'Fetching your profile...',
    'Analyzing engagement...',
    'Calculating social score...',
    'Checking on-chain activity...',
    'Estimating tokens...',
];

const tokenEmojis = ['💰', '🪙', '💎', '🎁', '✨', '🔥'];

export default function LoadingAnimation() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-container">
            {/* Token rain effect */}
            <div className="loading-tokens">
                {Array.from({ length: 12 }).map((_, i) => (
                    <span
                        key={i}
                        className="loading-token"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    >
                        {tokenEmojis[i % tokenEmojis.length]}
                    </span>
                ))}
            </div>

            <motion.div
                className="loading-spinner"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
            >
                <div className="loading-ring" />
                <div className="loading-ring" />
                <div className="loading-ring" />
            </motion.div>

            <motion.p
                className="loading-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                ANALYZING YOUR PROFILE
            </motion.p>

            <motion.p
                key={currentStep}
                className="loading-step"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
            >
                {loadingSteps[currentStep]}
            </motion.p>
        </div>
    );
}
