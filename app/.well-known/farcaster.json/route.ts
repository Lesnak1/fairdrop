import { NextResponse } from "next/server";
import minikitConfig from "@/minikit.config";

export async function GET() {
    return NextResponse.json({
        frame: minikitConfig.frame,
        accountAssociation: minikitConfig.accountAssociation,
        baseBuilder: {
            ownerAddress: "0x5583101e8f0DcbAA99B58b0f141858166FE622ce"
        }
    });
}
