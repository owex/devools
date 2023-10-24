import ToolsSlugPage from './ToolsSlugPage';

export default function Page({ params }) {
  return <ToolsSlugPage slug={params.slug} />;
}

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const slug = params.slug;

  const metaDataSet = {
    'colour-manager': {
      title: 'Colour Manager',
      description: 'Colour Manager',
    },
    'text-formatter': {
      title: 'Text Formatter',
      description: 'Text Formatter',
    },
    'password-generator': {
      title: 'Password Generator',
      description: 'Password Generator',
    },
    'strip-tags': {
      title: 'Strip Tags',
      description: 'Strip Tags',
    },
    'pixel-converter': {
      title: 'Pixel Converter',
      description: 'Pixel Converter',
    },
  };

  const metadata = metaDataSet[slug] || {};

  return {
    title: metadata?.title || '',
  };
}
