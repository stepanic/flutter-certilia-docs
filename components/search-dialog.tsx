'use client';

import { useMemo } from 'react';
import OramaSearchDialog from 'fumadocs-ui/components/dialog/search-orama';
import { OramaClient } from '@oramacloud/client';
import type { SharedProps } from 'fumadocs-ui/components/dialog/search';

export function SearchDialog(props: SharedProps) {
  // Initialize Orama client on the client side only
  const oramaClient = useMemo(() => {
    const endpoint = process.env.NEXT_PUBLIC_ORAMA_ENDPOINT || '';
    const apiKey = process.env.NEXT_PUBLIC_ORAMA_API_KEY || '';

    if (!endpoint || !apiKey) {
      console.warn('Orama Cloud credentials not configured. Search will not work.');
      // Return a dummy client that won't be used
      return null as any;
    }

    return new OramaClient({
      endpoint,
      api_key: apiKey,
    });
  }, []);

  const indexType = (process.env.NEXT_PUBLIC_ORAMA_INDEX_TYPE as 'crawler' | 'default') || 'crawler';

  return (
    <OramaSearchDialog
      {...props}
      client={oramaClient}
      index={indexType}
    />
  );
}
