import { NextResponse } from "next/server";

const ROOT_URL = "https://fairdrop-olive.vercel.app";

// Manifest with BOTH miniapp (for Base.dev) and frame (for Farcaster) keys
const manifest = {
    // For Base.dev - uses miniapp key
    "miniapp": {
        "version": "1",
        "name": "FAIRDROP",
        "subtitle": "Airdrop Estimator",
        "description": "Estimate your potential Farcaster airdrop tokens based on your real activity.",
        "screenshotUrls": [`${ROOT_URL}/screenshot.png`],
        "iconUrl": `${ROOT_URL}/icon.png`,
        "splashImageUrl": `${ROOT_URL}/splash.png`,
        "splashBackgroundColor": "#0D0D12",
        "homeUrl": ROOT_URL,
        "webhookUrl": `${ROOT_URL}/api/webhook`,
        "primaryCategory": "social",
        "tags": ["airdrop", "tokens", "farcaster", "estimator", "finance"],
        "heroImageUrl": `${ROOT_URL}/hero.png`,
        "tagline": "Know Your Airdrop Potential",
        "ogTitle": "FAIRDROP - Farcaster Airdrop Estimator",
        "ogDescription": "Estimate how many tokens you could receive in a Farcaster airdrop.",
        "ogImageUrl": `${ROOT_URL}/hero.png`
    },
    // For Farcaster - uses frame key
    "frame": {
        "name": "FAIRDROP",
        "version": "1",
        "iconUrl": `${ROOT_URL}/icon.png`,
        "homeUrl": ROOT_URL,
        "imageUrl": `${ROOT_URL}/hero.png`,
        "buttonTitle": "Check Airdrop",
        "splashImageUrl": `${ROOT_URL}/splash.png`,
        "splashBackgroundColor": "#0D0D12",
        "webhookUrl": `${ROOT_URL}/api/webhook`,
        "subtitle": "Airdrop Estimator",
        "description": "Estimate your potential Farcaster airdrop tokens based on your real activity.",
        "primaryCategory": "social",
        "screenshotUrls": [`${ROOT_URL}/screenshot.png`],
        "heroImageUrl": `${ROOT_URL}/hero.png`,
        "tags": ["airdrop", "tokens", "farcaster", "estimator", "finance"],
        "tagline": "Know Your Airdrop Potential",
        "ogTitle": "FAIRDROP - Farcaster Airdrop Estimator",
        "ogDescription": "Estimate how many tokens you could receive in a Farcaster airdrop.",
        "ogImageUrl": `${ROOT_URL}/hero.png`,
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
