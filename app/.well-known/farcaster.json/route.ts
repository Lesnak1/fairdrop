import { NextResponse } from "next/server";

// Farcaster Hosted Manifest URL
const HOSTED_MANIFEST_URL = "https://api.farcaster.xyz/miniapps/hosted-manifest/019af7d1-a78a-8eaa-24c1-457120191bbb";

export async function GET() {
    // Fetch the hosted manifest from Farcaster
    const response = await fetch(HOSTED_MANIFEST_URL);
    const hostedManifest = await response.json();

    // Create manifest with IDENTICAL frame and miniapp keys
    const manifest = {
        // Keep original frame from Farcaster
        frame: hostedManifest.frame,
        // miniapp must be IDENTICAL to frame
        miniapp: hostedManifest.frame,
        // Keep accountAssociation from Farcaster
        accountAssociation: hostedManifest.accountAssociation,
        // Add baseBuilder for Base.dev
        baseBuilder: {
            ownerAddress: "0x5583101e8f0DcbAA99B58b0f141858166FE622ce"
        }
    };

    return NextResponse.json(manifest);
}
