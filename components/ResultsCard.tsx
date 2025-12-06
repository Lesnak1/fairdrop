'use client';

import { motion } from 'framer-motion';
import type { AirdropScore } from '@/lib/airdropCalculator';
import type { FarcasterUser } from '@/lib/neynar';
import { formatTokens, formatNumber } from '@/lib/utils';

interface ResultsCardProps {
    score: AirdropScore;
    user: FarcasterUser;
    onShare: () => void;
    onReset: () => void;
}

export default function ResultsCard({ score, user, onShare, onReset }: ResultsCardProps) {
    return (
        <motion.div
            className="results-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.3 }}
        >
            <div className="results-card-inner">
                {/* User Info */}
                <div className="user-info">
                    <img
                        src={user.pfpUrl || '/icon.png'}
                        alt={user.displayName}
                        className="user-avatar"
                    />
                    <div className="user-details">
                        <p className="user-name">{user.displayName}</p>
                        <p className="user-handle">@{user.username}</p>
                    </div>
                    <div className="user-stats">
                        <div className="user-stat">
                            <p className="user-stat-value">{formatNumber(user.followerCount)}</p>
                            <p className="user-stat-label">Followers</p>
                        </div>
                    </div>
                </div>

                {/* Token Estimate */}
                <div className="token-section">
                    <p className="token-label">Estimated Airdrop</p>
                    <motion.p
                        className="token-amount"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {formatTokens(score.tokenEstimate.expected)}
                    </motion.p>
                    <p className="token-range">
                        Range: {formatTokens(score.tokenEstimate.min)} - {formatTokens(score.tokenEstimate.max)}
                    </p>
                    <span className="token-ticker">$FCAST</span>
                </div>

                {/* Tier Badge */}
                <div className="tier-section">
                    <div className="tier-badge" style={{ borderColor: score.tier.color }}>
                        <span className="tier-emoji">{score.tier.emoji}</span>
                        <span style={{ color: score.tier.color }}>{score.tier.name} Tier</span>
                    </div>
                    <p className="percentile-badge">
                        Top <span className="percentile-value">{100 - score.percentile}%</span>
                    </p>
                </div>

                {/* Score Breakdown */}
                <div className="score-header">
                    <p className="score-title">Airdrop Score</p>
                    <p className="total-score">
                        {score.totalScore}
                        <span className="total-score-max">/{score.maxScore}</span>
                    </p>
                </div>

                <div className="categories-grid">
                    {score.categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            className="category-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                        >
                            <div className="category-header">
                                <div className="category-info">
                                    <span className="category-icon">{category.icon}</span>
                                    <span className="category-name">{category.name}</span>
                                </div>
                                <span className="category-score">
                                    {category.score}/{category.maxScore}
                                </span>
                            </div>
                            <div className="category-bar-container">
                                <motion.div
                                    className="category-bar"
                                    style={{ backgroundColor: category.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(category.score / category.maxScore) * 100}%` }}
                                    transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="button-container">
                    <button className="btn btn-primary" onClick={onShare}>
                        <span>📤</span> Share
                    </button>
                    <button className="btn btn-secondary" onClick={onReset}>
                        <span>🔄</span> Reset
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
