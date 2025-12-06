# 🪂 FAIRDROP - Farcaster Airdrop Estimator

<div align="center">

![FAIRDROP Logo](public/icon.png)

**Discover your potential token allocation based on your real Farcaster activity**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Lesnak1/fairdrop)
[![Built on Base](https://img.shields.io/badge/Built%20on-Base-0052FF?style=flat-square&logo=coinbase)](https://base.org)
[![Farcaster](https://img.shields.io/badge/Farcaster-Mini%20App-8B5CF6?style=flat-square)](https://farcaster.xyz)

</div>

---

## ✨ Features

- **📊 Real Data Analysis** - Fetches your actual Farcaster stats via Neynar API
- **🎯 6-Category Scoring** - Comprehensive airdrop eligibility assessment
- **💰 Token Estimation** - Projected token allocation based on activity
- **🏆 Tier Ranking** - Diamond, Platinum, Gold, Silver, Bronze, Starter tiers
- **📤 Share Results** - Cast your score directly to Farcaster
- **🔒 Privacy First** - No data stored, analysis happens in real-time

---

## 📊 Scoring Categories

| Category | Max Score | Description |
|----------|-----------|-------------|
| 📊 Engagement | 200 | Cast activity, likes, recasts |
| 👥 Social Proof | 200 | Followers, power badge status |
| 🏠 Community | 150 | Channel participation |
| ⏳ Longevity | 150 | Account age, consistency |
| ⛓️ On-Chain | 150 | Wallet connections, NFTs |
| 🌐 Network | 150 | Connection quality |

**Total: 1000 points**

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Lesnak1/fairdrop.git

# Navigate to project
cd fairdrop

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import to [Vercel](https://vercel.com/new)
3. Deploy automatically

### Environment Variables (Optional)

```env
NEYNAR_API_KEY=your_neynar_api_key
NEXT_PUBLIC_URL=https://your-app.vercel.app
```

> Note: The app works with demo Neynar API key, but for production use, get a key from [neynar.com](https://neynar.com)

---

## 🎮 Farcaster Mini App Setup

After deployment, configure the Farcaster manifest:

1. Go to [Farcaster Developer Tools](https://farcaster.xyz/~/developers/hosted-manifests)
2. Create a new hosted manifest with your deployed URL
3. Update `minikit.config.ts` with the account association credentials
4. Redeploy to Vercel

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Custom CSS with Glassmorphism
- **API**: Neynar (Farcaster data)
- **SDK**: @farcaster/miniapp-sdk
- **Animation**: Framer Motion
- **Deployment**: Vercel

---

## 📁 Project Structure

```
fairdrop/
├── app/
│   ├── page.tsx           # Main application
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Theme styles
│   ├── api/
│   │   ├── analyze/       # Neynar API route
│   │   └── webhook/       # Farcaster webhooks
│   └── .well-known/       # Farcaster manifest
├── components/
│   ├── WelcomeScreen.tsx  # Welcome UI
│   ├── LoadingAnimation.tsx
│   └── ResultsCard.tsx    # Results display
├── lib/
│   ├── neynar.ts          # Neynar API client
│   ├── airdropCalculator.ts # Scoring algorithm
│   └── utils.ts           # Utilities
└── public/
    └── icon.png           # App icon
```

---

## 🎨 Design

- **Theme**: Futuristic Finance
- **Colors**: Purple (#8B5CF6) → Pink (#EC4899) gradient
- **Background**: Deep dark (#0D0D12)
- **Effects**: Glassmorphism, token rain animations

---

## 👨‍💻 Built By

**[@heleknax](https://warpcast.com/heleknax)** on Farcaster

---

## 📄 License

MIT License - feel free to use and modify!

---

<div align="center">

**Built with 💜 on Base ⚡ Farcaster**

</div>
