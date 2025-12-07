import { NextResponse } from "next/server";

// Farcaster Hosted Manifest URL
const HOSTED_MANIFEST_URL = "https://api.farcaster.xyz/miniapps/hosted-manifest/019af7d1-a78a-8eaa-24c1-457120191bbb";

export async function GET() {
    // Fetch the hosted manifest from Farcaster
    const response = await fetch(HOSTED_MANIFEST_URL);
    const hostedManifest = await response.json();

    // Create manifest with BOTH frame (for Farcaster) AND miniapp (for Base.dev)
    const manifest = {
        // Keep original frame from Farcaster
        frame: hostedManifest.frame,
        // Add miniapp key for Base.dev (copy from frame)
        miniapp: {
            version: hostedManifest.frame.version,
            name: hostedManifest.frame.name,
            subtitle: hostedManifest.frame.subtitle,
            description: hostedManifest.frame.description,
            iconUrl: hostedManifest.frame.iconUrl,
            splashImageUrl: hostedManifest.frame.splashImageUrl,
            splashBackgroundColor: hostedManifest.frame.splashBackgroundColor,
            homeUrl: hostedManifest.frame.homeUrl,
            webhookUrl: hostedManifest.frame.webhookUrl,
            primaryCategory: hostedManifest.frame.primaryCategory,
            screenshotUrls: hostedManifest.frame.screenshotUrls,
            heroImageUrl: hostedManifest.frame.heroImageUrl,
            tags: hostedManifest.frame.tags,
            tagline: hostedManifest.frame.tagline,
            ogTitle: hostedManifest.frame.ogTitle,
            ogDescription: hostedManifest.frame.ogDescription,
            ogImageUrl: hostedManifest.frame.ogImageUrl,
        },
        // Keep accountAssociation from Farcaster
        accountAssociation: hostedManifest.accountAssociation,
        // Add baseBuilder for Base.dev
        baseBuilder: {
            ownerAddress: "0x5583101e8f0DcbAA99B58b0f141858166FE622ce"
        }
    };

    return NextResponse.json(manifest);
}
