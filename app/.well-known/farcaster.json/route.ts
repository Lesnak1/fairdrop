import { NextResponse } from "next/server";

// Redirect to Farcaster Hosted Manifest
const HOSTED_MANIFEST_URL = "https://api.farcaster.xyz/miniapps/hosted-manifest/019af7d1-a78a-8eaa-24c1-457120191bbb";

export async function GET() {
    return NextResponse.redirect(HOSTED_MANIFEST_URL, 307);
}
