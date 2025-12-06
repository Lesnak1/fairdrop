// Airdrop Score Calculator
import type { FarcasterUser, UserCasts } from './neynar';

export interface AirdropCategory {
    name: string;
    icon: string;
    score: number;
    maxScore: number;
    description: string;
    color: string;
}

export interface AirdropScore {
    totalScore: number;
    maxScore: number;
    percentile: number;
    categories: AirdropCategory[];
    tokenEstimate: {
        min: number;
        max: number;
        expected: number;
    };
    tier: {
        name: string;
        emoji: string;
        color: string;
    };
}

// Calculate engagement score based on cast activity
function calculateEngagementScore(casts: UserCasts | null): number {
    if (!casts || !casts.casts.length) return 10; // Minimum score

    const totalCasts = casts.casts.length;
    const totalLikes = casts.casts.reduce((sum, c) => sum + c.reactions.likesCount, 0);
    const totalRecasts = casts.casts.reduce((sum, c) => sum + c.reactions.recastsCount, 0);
    const totalReplies = casts.casts.reduce((sum, c) => sum + c.replies.count, 0);

    // Scoring algorithm
    let score = 0;
    score += Math.min(totalCasts * 2, 60); // Up to 60 points for cast volume
    score += Math.min(totalLikes * 0.5, 50); // Up to 50 points for likes received
    score += Math.min(totalRecasts * 1, 40); // Up to 40 points for recasts
    score += Math.min(totalReplies * 0.3, 30); // Up to 30 points for replies
    score += totalCasts > 20 ? 20 : 0; // Bonus for consistent posting

    return Math.min(Math.round(score), 200);
}

// Calculate social proof score
function calculateSocialScore(user: FarcasterUser): number {
    let score = 0;

    // Follower count scoring (logarithmic)
    const followers = user.followerCount;
    if (followers >= 10000) score += 80;
    else if (followers >= 5000) score += 70;
    else if (followers >= 1000) score += 55;
    else if (followers >= 500) score += 40;
    else if (followers >= 100) score += 25;
    else score += Math.min(followers / 4, 15);

    // Follower/Following ratio
    const ratio = user.followingCount > 0 ? user.followerCount / user.followingCount : 0;
    if (ratio >= 2) score += 40;
    else if (ratio >= 1) score += 30;
    else if (ratio >= 0.5) score += 20;
    else score += 10;

    // Power Badge bonus
    if (user.powerBadge) score += 80;

    return Math.min(Math.round(score), 200);
}

// Calculate community impact score
function calculateCommunityScore(user: FarcasterUser, casts: UserCasts | null): number {
    let score = 30; // Base score

    // Active status bonus
    if (user.activeStatus === 'active') score += 40;

    // Bio completeness
    if (user.profile?.bio?.text && user.profile.bio.text.length > 20) score += 20;

    // Engagement quality from casts
    if (casts && casts.casts.length > 0) {
        const avgLikes = casts.casts.reduce((sum, c) => sum + c.reactions.likesCount, 0) / casts.casts.length;
        if (avgLikes >= 10) score += 40;
        else if (avgLikes >= 5) score += 25;
        else if (avgLikes >= 2) score += 15;
    }

    return Math.min(Math.round(score), 150);
}

// Calculate longevity score (approximated)
function calculateLongevityScore(user: FarcasterUser): number {
    let score = 20; // Base score

    // FID-based estimation (lower FID = earlier user)
    const fid = user.fid;
    if (fid <= 10000) score += 100; // OG user
    else if (fid <= 50000) score += 70;
    else if (fid <= 100000) score += 50;
    else if (fid <= 200000) score += 35;
    else if (fid <= 500000) score += 20;
    else score += 10;

    // Consistent activity bonus
    if (user.activeStatus === 'active') score += 30;

    return Math.min(Math.round(score), 150);
}

// Calculate on-chain activity score
function calculateOnChainScore(user: FarcasterUser): number {
    let score = 20; // Base score

    // Verified wallet addresses
    const addresses = user.verifiedAddresses?.ethAddresses || [];
    if (addresses.length > 0) score += 50;
    if (addresses.length > 1) score += 30;

    // Additional bonus for having verified identity
    score += 30;

    return Math.min(Math.round(score), 150);
}

// Calculate network value score
function calculateNetworkScore(user: FarcasterUser): number {
    let score = 30; // Base score

    // High follower count indicates network value
    if (user.followerCount >= 1000) score += 50;
    else if (user.followerCount >= 500) score += 35;
    else if (user.followerCount >= 100) score += 20;

    // Power Badge = high quality connections
    if (user.powerBadge) score += 50;

    // Active status
    if (user.activeStatus === 'active') score += 20;

    return Math.min(Math.round(score), 150);
}

// Get tier based on total score
function getTier(score: number): { name: string; emoji: string; color: string } {
    if (score >= 850) return { name: 'Diamond', emoji: '💎', color: '#00BFFF' };
    if (score >= 700) return { name: 'Platinum', emoji: '⚪', color: '#E5E4E2' };
    if (score >= 550) return { name: 'Gold', emoji: '🥇', color: '#FFD700' };
    if (score >= 400) return { name: 'Silver', emoji: '🥈', color: '#C0C0C0' };
    if (score >= 250) return { name: 'Bronze', emoji: '🥉', color: '#CD7F32' };
    return { name: 'Starter', emoji: '🌱', color: '#4ADE80' };
}

// Estimate token amount based on score
function estimateTokens(score: number): { min: number; max: number; expected: number } {
    // Hypothetical token distribution: 1 billion total, top users get more
    const baseTokens = 100;
    const multiplier = Math.pow(score / 100, 1.5);

    const expected = Math.round(baseTokens * multiplier * 100);
    const min = Math.round(expected * 0.7);
    const max = Math.round(expected * 1.4);

    return { min, max, expected };
}

// Calculate percentile (approximated)
function calculatePercentile(score: number): number {
    // Approximate percentile based on score distribution
    if (score >= 900) return 99;
    if (score >= 800) return 97;
    if (score >= 700) return 93;
    if (score >= 600) return 85;
    if (score >= 500) return 75;
    if (score >= 400) return 60;
    if (score >= 300) return 45;
    if (score >= 200) return 30;
    if (score >= 100) return 15;
    return 5;
}

// Main calculation function
export async function calculateAirdropScore(
    user: FarcasterUser,
    casts: UserCasts | null
): Promise<AirdropScore> {
    const engagementScore = calculateEngagementScore(casts);
    const socialScore = calculateSocialScore(user);
    const communityScore = calculateCommunityScore(user, casts);
    const longevityScore = calculateLongevityScore(user);
    const onChainScore = calculateOnChainScore(user);
    const networkScore = calculateNetworkScore(user);

    const totalScore = engagementScore + socialScore + communityScore + longevityScore + onChainScore + networkScore;
    const maxScore = 1000;

    const categories: AirdropCategory[] = [
        {
            name: 'Engagement',
            icon: '📊',
            score: engagementScore,
            maxScore: 200,
            description: 'Cast activity & interactions',
            color: '#3B82F6'
        },
        {
            name: 'Social Proof',
            icon: '👥',
            score: socialScore,
            maxScore: 200,
            description: 'Followers & influence',
            color: '#8B5CF6'
        },
        {
            name: 'Community',
            icon: '🏠',
            score: communityScore,
            maxScore: 150,
            description: 'Channel & community impact',
            color: '#EC4899'
        },
        {
            name: 'Longevity',
            icon: '⏳',
            score: longevityScore,
            maxScore: 150,
            description: 'Account age & consistency',
            color: '#F59E0B'
        },
        {
            name: 'On-Chain',
            icon: '⛓️',
            score: onChainScore,
            maxScore: 150,
            description: 'Wallet & transactions',
            color: '#10B981'
        },
        {
            name: 'Network',
            icon: '🌐',
            score: networkScore,
            maxScore: 150,
            description: 'Connection quality',
            color: '#06B6D4'
        }
    ];

    return {
        totalScore,
        maxScore,
        percentile: calculatePercentile(totalScore),
        categories,
        tokenEstimate: estimateTokens(totalScore),
        tier: getTier(totalScore)
    };
}
