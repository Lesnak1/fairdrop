import { NextResponse } from "next/server";
import minikitConfig from "../../../minikit.config";

export async function GET() {
    const manifest: any = {
        miniapp: minikitConfig.miniapp,
        baseBuilder: {
            ownerAddress: "0x5583101e8f0DcbAA99B58b0f141858166FE622ce"
        }
    };

    // Only include accountAssociation if credentials are present
    if (minikitConfig.accountAssociation.header &&
        minikitConfig.accountAssociation.payload &&
        minikitConfig.accountAssociation.signature) {
        manifest.accountAssociation = minikitConfig.accountAssociation;
    }

    return NextResponse.json(manifest);
}
