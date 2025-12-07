// FAIRDROP Manifest Configuration
const ROOT_URL = "https://fairdrop-olive.vercel.app";

export const minikitConfig = {
    accountAssociation: {
        "header": "eyJmaWQiOjMwNTM2OSwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDRhNmVBQWUxMTkyQkM4Mzg5OTE5ZDRBMmNFQjZCRjcxMkQyNTJGODMifQ",
        "payload": "eyJkb21haW4iOiJmYWlyZHJvcC1vbGl2ZS52ZXJjZWwuYXBwIn0",
        "signature": "KodANJjr1fBNKCjOpC64k+VDceWsN5onZFSu5dscLnglfdoRL3tlDfONeeB8yCajXglG6iBtfuTDWTGiIuCTRRw="
    },
    frame: {
        name: "Fairdrop",
        version: "1",
        iconUrl: `${ROOT_URL}/icon.png`,
        homeUrl: ROOT_URL,
        imageUrl: `${ROOT_URL}/hero.png`,
        buttonTitle: "Check Airdrop",
        splashImageUrl: `${ROOT_URL}/splash.png`,
        splashBackgroundColor: "#0D0D12",
        webhookUrl: `${ROOT_URL}/api/webhook`,
        subtitle: "Airdrop Estimator",
        description: "Estimate your potential Farcaster airdrop tokens based on your real on-platform activity and engagement.",
        screenshotUrls: [`${ROOT_URL}/screenshot.png`],
        primaryCategory: "social",
        tags: ["airdrop", "tokens", "farcaster", "estimator", "checker"],
        heroImageUrl: `${ROOT_URL}/hero.png`,
        tagline: "Know Your Airdrop Potential",
        ogTitle: "Farcaster Airdrop Estimator",
        ogDescription: "Estimate how many tokens you could receive in a Farcaster airdrop based on your real activity.",
        ogImageUrl: `${ROOT_URL}/hero.png`,
    },
} as const;

export default minikitConfig;
