import { nanoid } from 'nanoid';

import snippets from '@/resources/data/snippets';
import { Snippet } from '@/resources/types/snippet.type';

export const formattedSnippets: Snippet[] = snippets.map((snippet) => ({
  ...snippet,
  steps: [...(snippet as Snippet).steps || []].map((step) => ({
    ...step,
    id: step.id ?? nanoid(),
  })),
  href: `/snippets/${snippet.slug}`,
  key: `snippet-${snippet.slug}`,
}));

export const tags: string[] = [
  ...new Set(snippets.flatMap((snippet) => snippet.categories ?? [])),
].sort((a, b) => a.localeCompare(b));

export const codeTypes = [
  ...new Set(snippets.map((snippet) => snippet.codeType)),
].sort((a, b) => a.localeCompare(b));
