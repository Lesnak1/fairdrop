import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { event } = body;

        console.log('Webhook event received:', event);

        // Handle different Farcaster webhook events
        switch (event?.type) {
            case 'miniapp_added':
                console.log('User added FAIRDROP:', event.user?.fid);
                break;
            case 'miniapp_removed':
                console.log('User removed FAIRDROP:', event.user?.fid);
                break;
            case 'notifications_enabled':
                console.log('Notifications enabled:', event.user?.fid);
                break;
            case 'notifications_disabled':
                console.log('Notifications disabled:', event.user?.fid);
                break;
            default:
                console.log('Unknown event type:', event?.type);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: 'Webhook endpoint active' });
}
