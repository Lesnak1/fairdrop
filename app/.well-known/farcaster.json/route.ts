import { NextResponse } from "next/server";
import { minikitConfig } from "../../../minikit.config";

// Manual implementation similar to withValidManifest
function formatManifest(config: typeof minikitConfig) {
    const manifest: Record<string, any> = {
        miniapp: config.miniapp,
    };

    // Only include accountAssociation if all fields are present
    if (config.accountAssociation?.header &&
        config.accountAssociation?.payload &&
        config.accountAssociation?.signature) {
        manifest.accountAssociation = config.accountAssociation;
    }

    return manifest;
}

export async function GET() {
    const manifest = formatManifest(minikitConfig);

    // Add baseBuilder
    manifest.baseBuilder = {
        ownerAddress: "0x5583101e8f0DcbAA99B58b0f141858166FE622ce"
    };

    return NextResponse.json(manifest);
}
