import { NextResponse } from "next/server";

// Farcaster Hosted Manifest URL - redirect as instructed by Farcaster
const HOSTED_MANIFEST_URL = "https://api.farcaster.xyz/miniapps/hosted-manifest/019af7d1-a78a-8eaa-24c1-457120191bbb";

export async function GET() {
    // 307 Temporary Redirect to Farcaster Hosted Manifest
    return NextResponse.redirect(HOSTED_MANIFEST_URL, 307);
}
