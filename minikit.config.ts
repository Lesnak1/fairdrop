// IMPORTANT: Update ROOT_URL after deploying to Vercel
const ROOT_URL = "https://fairdrop-3qbysp90y-muratcans-projects-ce0b9ee3.vercel.app";

export const minikitConfig = {
    accountAssociation: {
        // Will be filled after getting credentials from Farcaster Developer Tools
        "header": "",
        "payload": "",
        "signature": ""
    },
    frame: {
        version: "1",
        name: "FAIRDROP",
        subtitle: "Airdrop Estimator",
        description: "Estimate your potential Farcaster airdrop tokens based on your real activity.",
        iconUrl: `${ROOT_URL}/icon.png`,
        imageUrl: `${ROOT_URL}/hero.png`,
        buttonTitle: "Check Airdrop",
        splashImageUrl: `${ROOT_URL}/splash.png`,
        splashBackgroundColor: "#0D0D12",
        homeUrl: ROOT_URL,
        webhookUrl: `${ROOT_URL}/api/webhook`,
        primaryCategory: "finance",
        screenshotUrls: [
            `${ROOT_URL}/screenshot.png`
        ],
        heroImageUrl: `${ROOT_URL}/hero.png`,
        tags: ["airdrop", "tokens", "farcaster", "estimator", "finance"],
        tagline: "Know Your Airdrop Potential",
        ogTitle: "FAIRDROP - Farcaster Airdrop Estimator",
        ogDescription: "Estimate how many tokens you could receive in a Farcaster airdrop based on your real activity.",
        ogImageUrl: `${ROOT_URL}/hero.png`,
        noindex: false
    },
} as const;

export default minikitConfig;
