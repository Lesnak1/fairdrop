import { NextRequest, NextResponse } from 'next/server';

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY || "NEYNAR_API_DOCS";
const NEYNAR_BASE_URL = "https://api.neynar.com/v2/farcaster";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');

    if (!fid) {
        return NextResponse.json({ error: 'FID required' }, { status: 400 });
    }

    console.log(`[FAIRDROP API] Fetching data for FID: ${fid}`);
    console.log(`[FAIRDROP API] Using API Key: ${NEYNAR_API_KEY.substring(0, 10)}...`);

    try {
        // Fetch user data from Neynar API
        const userResponse = await fetch(`${NEYNAR_BASE_URL}/user/bulk?fids=${fid}`, {
            headers: {
                'accept': 'application/json',
                'x-api-key': NEYNAR_API_KEY,  // Changed from 'api_key' to 'x-api-key'
            },
            cache: 'no-store',
        });

        console.log(`[FAIRDROP API] Neynar user response status: ${userResponse.status}`);

        if (!userResponse.ok) {
            const errorText = await userResponse.text();
            console.error(`[FAIRDROP API] Neynar user API error: ${userResponse.status}`, errorText);
            // Return mock data on API failure
            return NextResponse.json(getMockUserData(parseInt(fid)));
        }

        const userData = await userResponse.json();
        const user = userData.users?.[0];

        console.log(`[FAIRDROP API] Neynar user data received:`, {
            fid: user?.fid,
            username: user?.username,
            follower_count: user?.follower_count,
            following_count: user?.following_count
        });

        if (!user) {
            console.log(`[FAIRDROP API] No user found, using mock data`);
            return NextResponse.json(getMockUserData(parseInt(fid)));
        }

        // Fetch user casts
        let casts = [];
        try {
            const castsResponse = await fetch(`${NEYNAR_BASE_URL}/feed/user/${fid}/casts?limit=50`, {
                headers: {
                    'accept': 'application/json',
                    'x-api-key': NEYNAR_API_KEY,  // Changed from 'api_key' to 'x-api-key'
                },
                cache: 'no-store',
            });

            console.log(`[FAIRDROP API] Neynar casts response status: ${castsResponse.status}`);

            if (castsResponse.ok) {
                const castsData = await castsResponse.json();
                casts = castsData.casts || [];
                console.log(`[FAIRDROP API] Fetched ${casts.length} casts`);
            }
        } catch (e) {
            console.error('[FAIRDROP API] Failed to fetch casts:', e);
        }

        const responseData = {
            user: {
                fid: user.fid,
                username: user.username,
                displayName: user.display_name || user.username,
                pfpUrl: user.pfp_url || '/icon.png',
                followerCount: user.follower_count || 0,
                followingCount: user.following_count || 0,
                activeStatus: user.active_status || 'active',
                powerBadge: user.power_badge || false,
                profile: {
                    bio: {
                        text: user.profile?.bio?.text || '',
                    },
                },
                verifiedAddresses: user.verified_addresses || { eth_addresses: [] },
            },
            casts: casts.map((c: any) => ({
                hash: c.hash,
                text: c.text,
                timestamp: c.timestamp,
                reactions: {
                    likesCount: c.reactions?.likes_count || 0,
                    recastsCount: c.reactions?.recasts_count || 0,
                },
                replies: {
                    count: c.replies?.count || 0,
                },
            })),
        };

        console.log(`[FAIRDROP API] Returning real user data with follower count: ${responseData.user.followerCount}`);
        return NextResponse.json(responseData);
    } catch (error) {
        console.error('[FAIRDROP API] API error:', error);
        return NextResponse.json(getMockUserData(parseInt(fid)));
    }
}

// Generate mock data based on FID for consistent results (FALLBACK ONLY)
function getMockUserData(fid: number) {
    console.log(`[FAIRDROP API] WARNING: Using mock data for FID ${fid}`);
    const seed = fid % 1000;
    const followerCount = Math.floor(100 + (seed * 15));
    const followingCount = Math.floor(50 + (seed * 5));
    const castCount = Math.floor(10 + (seed * 2));

    const casts = Array.from({ length: castCount }, (_, i) => ({
        hash: `cast_${fid}_${i}`,
        text: `Sample cast ${i}`,
        timestamp: new Date().toISOString(),
        reactions: {
            likesCount: Math.floor(seed / 10) + i * 2,
            recastsCount: Math.floor(seed / 20) + i,
        },
        replies: {
            count: Math.floor(seed / 30) + i,
        },
    }));

    return {
        user: {
            fid,
            username: `user_${fid}`,
            displayName: `User ${fid}`,
            pfpUrl: '/icon.png',
            followerCount,
            followingCount,
            activeStatus: 'active',
            powerBadge: fid < 50000,
            profile: {
                bio: {
                    text: 'Farcaster user',
                },
            },
            verifiedAddresses: {
                eth_addresses: seed > 500 ? ['0x...'] : [],
            },
        },
        casts,
        isMockData: true, // Flag to indicate this is mock data
    };
}
