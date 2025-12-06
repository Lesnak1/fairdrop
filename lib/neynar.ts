// Neynar API Client for Farcaster data

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY || "NEYNAR_API_DOCS"; // Demo key for testing
const NEYNAR_BASE_URL = "https://api.neynar.com/v2/farcaster";

export interface FarcasterUser {
    fid: number;
    username: string;
    displayName: string;
    pfpUrl: string;
    followerCount: number;
    followingCount: number;
    activeStatus: string;
    powerBadge: boolean;
    profile: {
        bio: {
            text: string;
        };
    };
    verifiedAddresses?: {
        ethAddresses: string[];
    };
}

export interface UserCasts {
    casts: Array<{
        hash: string;
        text: string;
        timestamp: string;
        reactions: {
            likesCount: number;
            recastsCount: number;
        };
        replies: {
            count: number;
        };
    }>;
}

export async function getUserByFid(fid: number): Promise<FarcasterUser | null> {
    try {
        const response = await fetch(`${NEYNAR_BASE_URL}/user/bulk?fids=${fid}`, {
            headers: {
                'accept': 'application/json',
                'api_key': NEYNAR_API_KEY,
            },
        });

        if (!response.ok) {
            console.error('Neynar API error:', response.status);
            return null;
        }

        const data = await response.json();
        return data.users?.[0] || null;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}

export async function getUserByUsername(username: string): Promise<FarcasterUser | null> {
    try {
        const response = await fetch(`${NEYNAR_BASE_URL}/user/by_username?username=${username}`, {
            headers: {
                'accept': 'application/json',
                'api_key': NEYNAR_API_KEY,
            },
        });

        if (!response.ok) {
            console.error('Neynar API error:', response.status);
            return null;
        }

        const data = await response.json();
        return data.user || null;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}

export async function getUserCasts(fid: number, limit: number = 50): Promise<UserCasts | null> {
    try {
        const response = await fetch(`${NEYNAR_BASE_URL}/feed/user/${fid}/casts?limit=${limit}`, {
            headers: {
                'accept': 'application/json',
                'api_key': NEYNAR_API_KEY,
            },
        });

        if (!response.ok) {
            console.error('Neynar API error:', response.status);
            return null;
        }

        const data = await response.json();
        return { casts: data.casts || [] };
    } catch (error) {
        console.error('Failed to fetch casts:', error);
        return null;
    }
}
