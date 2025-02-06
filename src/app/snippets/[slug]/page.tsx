import type { Metadata } from 'next'
import { nanoid } from 'nanoid';

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

import { formattedSnippets } from '@/resources/utils/snippets';
import SnippetPage from '@/resources/templates/SnippetPage';
import { Snippet } from '@/resources/types/snippet.type';

async function getSnippet(slug: string) {
  if (!slug) {
    return false;
  }

  const snippet = [...formattedSnippets].find((i) => i.slug === slug);

  if (snippet) {
    return snippet;
  }

  return false;
}

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;

  const data = await getSnippet(slug);

  if (!data) {
    return null;
  }

  const formattedData: Snippet = {
    categories: data?.categories || [],
    code: data?.code || '',
    codeType: data?.codeType || '',
    description: data?.description || '',
    htmlContent: data?.htmlContent || '',
    slug: data?.slug || '',
    steps: (data?.steps || []).map((step) => ({
      ...step,
      id: step.id ?? nanoid(),
    })),
    title: data?.title || '',
    key: nanoid(),
  }

  return <SnippetPage {...formattedData} />;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const slug = (await params).slug;

  const data = await getSnippet(slug);

  if (!data) {
    return {};
  }

  return {
    title: `${data?.title || ''} | Snippets `,
    description: data?.description || '',
    openGraph: {
      title: `${data?.title || ''} | Snippets `,
      description: data?.description || '',
    },
  };
}
