// IMPORTANT: Update ROOT_URL after deploying to Vercel
const ROOT_URL = "https://fairdrop-olive.vercel.app";

export const minikitConfig = {
    accountAssociation: {
        // Will be filled after getting credentials from Base Build
        "header": "",
        "payload": "",
        "signature": ""
    },
    miniapp: {
        version: "1",
        name: "FAIRDROP",
        subtitle: "Airdrop Estimator",
        description: "Estimate your potential Farcaster airdrop tokens based on your real activity.",
        iconUrl: `${ROOT_URL}/icon.png`,
        splashImageUrl: `${ROOT_URL}/splash.png`,
        splashBackgroundColor: "#0D0D12",
        homeUrl: ROOT_URL,
        webhookUrl: `${ROOT_URL}/api/webhook`,
        primaryCategory: "social",
        screenshotUrls: [
            `${ROOT_URL}/screenshot.png`
        ],
        heroImageUrl: `${ROOT_URL}/hero.png`,
        tags: ["airdrop", "tokens", "farcaster", "estimator", "finance"],
        tagline: "Know Your Airdrop Potential",
        ogTitle: "FAIRDROP - Farcaster Airdrop Estimator",
        ogDescription: "Estimate how many tokens you could receive in a Farcaster airdrop based on your real activity.",
        ogImageUrl: `${ROOT_URL}/hero.png`,
    },
} as const;

export default minikitConfig;
