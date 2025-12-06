/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/.well-known/farcaster.json',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET',
                    },
                    {
                        key: 'Content-Type',
                        value: 'application/json',
                    },
                ],
            },
        ];
    },
    images: {
        domains: ['i.imgur.com', 'imagedelivery.net'],
    },
};

module.exports = nextConfig;
