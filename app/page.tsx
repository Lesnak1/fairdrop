'use client';

import { useEffect, useState, useCallback } from 'react';
import sdk from '@farcaster/miniapp-sdk';
import WelcomeScreen from '@/components/WelcomeScreen';
import LoadingAnimation from '@/components/LoadingAnimation';
import ResultsCard from '@/components/ResultsCard';
import { type FarcasterUser } from '@/lib/neynar';
import { calculateAirdropScore, type AirdropScore } from '@/lib/airdropCalculator';

type AppState = 'welcome' | 'loading' | 'result';

export default function Home() {
    const [appState, setAppState] = useState<AppState>('welcome');
    const [isSDKLoaded, setIsSDKLoaded] = useState(false);
    const [context, setContext] = useState<any>(null);
    const [user, setUser] = useState<FarcasterUser | null>(null);
    const [airdropScore, setAirdropScore] = useState<AirdropScore | null>(null);

    // Initialize Farcaster SDK
    useEffect(() => {
        const initSDK = async () => {
            setIsSDKLoaded(true); // Set immediately so UI renders
            try {
                const ctx = await sdk.context;
                setContext(ctx);
                await sdk.actions.ready();
            } catch (error) {
                console.log('SDK init (expected outside Farcaster):', error);
            }
        };

        initSDK();
    }, []);

    // Analyze user's airdrop score
    const handleAnalyze = useCallback(async () => {
        setAppState('loading');

        try {
            // Get FID from context or use a test FID
            const fid = context?.user?.fid || 305369; // Default to user's FID for testing

            // Fetch data from our server-side API route
            const response = await fetch(`/api/analyze?fid=${fid}`);
            if (!response.ok) {
                console.error('API error:', response.status);
                setAppState('welcome');
                return;
            }

            const data = await response.json();

            if (!data.user) {
                console.error('No user data returned');
                setAppState('welcome');
                return;
            }

            // Calculate airdrop score
            const score = await calculateAirdropScore(data.user, { casts: data.casts || [] });

            setUser(data.user);
            setAirdropScore(score);
            setAppState('result');
        } catch (error) {
            console.error('Analysis failed:', error);
            setAppState('welcome');
        }
    }, [context?.user?.fid]);

    // Share results
    const handleShare = useCallback(async () => {
        if (!airdropScore || !user) return;

        const shareText = `🪂 My FAIRDROP Score: ${airdropScore.totalScore}/1000 (${airdropScore.tier.emoji} ${airdropScore.tier.name})\n\n💰 Estimated: ${airdropScore.tokenEstimate.expected.toLocaleString()} $FCAST\n\nCheck yours 👇`;

        try {
            await sdk.actions.composeCast({
                text: shareText,
                embeds: [window.location.href],
            });
        } catch (error) {
            // Fallback for non-Farcaster environment
            if (navigator.share) {
                navigator.share({
                    title: 'My FAIRDROP Score',
                    text: shareText,
                    url: window.location.href,
                });
            }
        }
    }, [airdropScore, user]);

    // Reset to welcome screen
    const handleReset = useCallback(() => {
        setAppState('welcome');
        setUser(null);
        setAirdropScore(null);
    }, []);

    if (!isSDKLoaded) {
        return (
            <div className="app-container">
                <div className="main-content">
                    <LoadingAnimation />
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <div className="main-content">
                {/* Header */}
                <header className="header">
                    <div className="logo-container">
                        <span className="logo-icon">🪂</span>
                        <h1 className="app-title">FAIRDROP</h1>
                    </div>
                    <p className="app-subtitle">Airdrop Estimator</p>
                </header>

                {/* Main Content */}
                {appState === 'welcome' && (
                    <WelcomeScreen
                        onAnalyze={handleAnalyze}
                        isConnected={!!context?.user}
                    />
                )}

                {appState === 'loading' && <LoadingAnimation />}

                {appState === 'result' && user && airdropScore && (
                    <ResultsCard
                        score={airdropScore}
                        user={user}
                        onShare={handleShare}
                        onReset={handleReset}
                    />
                )}

                {/* Follow Builder Section */}
                <div className="builder-section">
                    <div className="builder-card">
                        <span className="builder-label">Built by</span>
                        <span className="builder-name">@heleknax</span>
                        <a
                            href="https://warpcast.com/heleknax"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-follow"
                        >
                            <span>👤</span> Follow Builder
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <footer className="footer">
                    <p className="footer-text">
                        Built on{" "}
                        <a
                            href="https://base.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            Base
                        </a>{" "}
                        ⚡{" "}
                        <a
                            href="https://farcaster.xyz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            Farcaster
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
}
