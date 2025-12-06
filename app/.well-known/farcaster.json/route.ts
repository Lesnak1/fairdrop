import { NextResponse } from "next/server";

// Hosted Manifest - Exact same structure as working SOULPRINT + baseBuilder
const manifest = {
    "frame": {
        "name": "FAIRDROP",
        "version": "1",
        "iconUrl": "https://fairdrop-olive.vercel.app/icon.png",
        "homeUrl": "https://fairdrop-olive.vercel.app",
        "imageUrl": "https://fairdrop-olive.vercel.app/hero.png",
        "buttonTitle": "Check Airdrop",
        "splashImageUrl": "https://fairdrop-olive.vercel.app/splash.png",
        "splashBackgroundColor": "#0D0D12",
        "webhookUrl": "https://fairdrop-olive.vercel.app/api/webhook",
        "subtitle": "Airdrop Estimator",
        "description": "Estimate your potential Farcaster airdrop tokens based on your real activity.",
        "primaryCategory": "social",
        "screenshotUrls": [
            "https://fairdrop-olive.vercel.app/screenshot.png"
        ],
        "heroImageUrl": "https://fairdrop-olive.vercel.app/hero.png",
        "tags": ["airdrop", "tokens", "farcaster", "estimator", "finance"],
        "tagline": "Know Your Airdrop Potential",
        "ogTitle": "FAIRDROP - Farcaster Airdrop Estimator",
        "ogDescription": "Estimate how many tokens you could receive in a Farcaster airdrop based on your real activity.",
        "ogImageUrl": "https://fairdrop-olive.vercel.app/hero.png",
        "noindex": false
    },
    "accountAssociation": {
        "header": "",
        "payload": "",
        "signature": ""
    },
    "baseBuilder": {
        "ownerAddress": "0x5583101e8f0DcbAA99B58b0f141858166FE622ce"
    }
};

export async function GET() {
    return NextResponse.json(manifest);
}
