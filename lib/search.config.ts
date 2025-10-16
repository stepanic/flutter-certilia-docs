// Orama Cloud search configuration
// This file is kept for reference but search is now initialized client-side
// in components/search-dialog.tsx to avoid build-time errors

export const ORAMA_ENDPOINT = process.env.NEXT_PUBLIC_ORAMA_ENDPOINT || '';
export const ORAMA_API_KEY = process.env.NEXT_PUBLIC_ORAMA_API_KEY || '';
export const ORAMA_INDEX_TYPE = (process.env.NEXT_PUBLIC_ORAMA_INDEX_TYPE as 'crawler' | 'default') || 'crawler';
