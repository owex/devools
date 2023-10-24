import { formattedSnippets } from '@/utils/snippets';
import SnippetsPage from './SnippetsPage';

// either Static metadata
export const metadata = {
  title: 'Snippets | Devools',
  description: 'A collection of code snippets for developers.',
};

export default async function Page({ params }) {
  // Forward fetched data to your Client Component
  return <SnippetsPage data={formattedSnippets} />;
}
