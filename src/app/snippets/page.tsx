

import type { Metadata } from 'next';

import { formattedSnippets } from '@/resources/utils/snippets';
import SnippetsPage from '@/resources/templates/SnippetsPage';

// either Static metadata
export const metadata: Metadata = {
  title: 'Snippets ',
  description: 'A collection of code snippets for developers.',
  openGraph: {
    title: 'Snippets ',
    description: 'A collection of code snippets for developers.',
  },
};

export default async function Page() {
  return <SnippetsPage data={formattedSnippets} />;
}
