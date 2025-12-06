// Utility functions
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

export function shortenAddress(address: string, chars: number = 4): string {
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function formatNumber(num: number | undefined | null): string {
    if (num === undefined || num === null) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
}

export function formatTokens(num: number | undefined | null): string {
    if (num === undefined || num === null) return '0';
    return num.toLocaleString();
}

export const APP_NAME = 'FAIRDROP';
export const APP_DESCRIPTION = 'Farcaster Airdrop Estimator';
