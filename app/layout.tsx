import type { Metadata, Viewport } from 'next';
import './globals.css';
import Provider from '@/providers/Provider';

const APP_URL = "https://fairdrop-3qbysp90y-muratcans-projects-ce0b9ee3.vercel.app";

export const metadata: Metadata = {
    metadataBase: new URL(APP_URL),
    title: 'FAIRDROP - Farcaster Airdrop Estimator',
    description: 'Estimate your potential Farcaster airdrop tokens based on your real on-platform activity and engagement.',
    openGraph: {
        title: 'FAIRDROP - Farcaster Airdrop Estimator',
        description: 'Know your airdrop potential. Analyze your Farcaster activity and estimate token allocation.',
        images: [`${APP_URL}/hero.png`],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FAIRDROP - Farcaster Airdrop Estimator',
        description: 'Estimate your potential Farcaster airdrop tokens.',
        images: [`${APP_URL}/hero.png`],
    },
    icons: {
        icon: '/icon.png',
        apple: '/icon.png',
    },
    other: {
        'fc:miniapp': JSON.stringify({
            version: "1",
            imageUrl: `${APP_URL}/hero.png`,
            button: {
                title: "Check Airdrop",
                action: {
                    type: "launch_frame",
                    name: "FAIRDROP",
                    url: APP_URL,
                    splashImageUrl: `${APP_URL}/splash.png`,
                    splashBackgroundColor: "#0D0D12"
                }
            }
        }),
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#0D0D12',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
