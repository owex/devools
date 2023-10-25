import snippets from '@/data/snippets';

export const formattedSnippets = snippets.map((snippet) => ({
  ...snippet,
  href: `/snippets/${snippet.slug}`,
  id: `snippet-${snippet.slug}`,
}));

export const tags = [
  ...new Set(snippets.flatMap((snippet) => snippet.categories)),
].sort((a, b) => a.localeCompare(b));

export const codeTypes = [
  ...new Set(snippets.map((snippet) => snippet.codeType)),
].sort((a, b) => a.localeCompare(b));
