export type Snippet = {
  categories?: string[];
  code?: string;
  codeType?: string;
  description: string;
  htmlContent?: string;
  slug?: string;
  steps?: { id: string; title?: string; code?: string; description?: string }[]; // Ensure it's optional
  title: string;
  href?: string;
  key: string;
};
