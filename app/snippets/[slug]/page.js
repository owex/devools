import { formattedSnippets } from 'resources/utils/snippets';
import SnippetPage from './SnippetPage';

async function getSnippet(slug) {
  if (!slug) {
    return false;
  }

  const snippet = [...formattedSnippets].find((i) => i.slug === slug);

  if (snippet) {
    return snippet;
  }

  return false;
}

export default async function Page({ params }) {
  const { slug } = params;
  // // Fetch data directly in a Server Component
  const data = await getSnippet(slug);

  if (!data) {
    return false;
  }
  // Forward fetched data to your Client Component
  return <SnippetPage {...data} />;
}

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const slug = params.slug;

  const data = await getSnippet(slug);

  if (!data) {
    return false;
  }

  return {
    title: `${data?.title || ''} | Snippets | Devools`,
    description: data?.description || '',
  };
}
