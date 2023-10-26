import ToolsSlugPage from './ToolsSlugPage';

export default function Page({ params }) {
  return <ToolsSlugPage slug={params.slug} />;
}

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const slug = params.slug;

  const metaDataSet = {
    'colour-manager': {
      title: 'Colour Manager  - Easily Manage Colors',
      description:
        'Devools Colour Manager allows you to easily create Tailwind, CSS and SCSS colors schemes. Manage colors with ease with Colour Manager.',
      openGraph: {
        title: 'Devools Colour Manager - Simplify Color Management',
        description:
          'Easily create Tailwind, CSS and SCSS colour schemes with Devools Colour Manager. Simplify color management for your web projects today.',
      },
    },
    'text-formatter': {
      title: 'Text Formatter - Format Text Easily ',
      description:
        'Devools Text Formatter is your go-to tool for easily formatting text. Make your text look just the way you want it with Text Formatter.',
      openGraph: {
        title: 'Devools Text Formatter - Easily Format Text',
        description:
          'Format text the way you want with Devools Text Formatter. Create beautifully formatted text effortlessly.',
      },
    },
    'password-generator': {
      title: 'Password Generator - Generate Secure Passwords ',
      description:
        'Devools Password Generator helps you create secure and strong passwords for your online accounts. Generate passwords with ease.',
      openGraph: {
        title: 'Devools Password Generator - Create Secure Passwords',
        description:
          'Generate strong and secure passwords with Devools Password Generator. Protect your online accounts effectively.',
      },
    },
    'strip-tags': {
      title: 'Strip Tags - Remove HTML Tags from Text ',
      description:
        'Devools Strip Tags tool allows you to easily remove HTML tags from text. Clean up your content and extract pure text effortlessly.',
      openGraph: {
        title: 'Devools Strip Tags - Clean Text by Removing HTML Tags',
        description:
          'Easily clean up text by removing HTML tags with Devools Strip Tags. Get pure text without hassle.',
      },
    },
    'pixel-converter': {
      title: 'Pixel Converter - Convert Pixels to Other Units ',
      description:
        'Devools Pixel Converter lets you convert pixels to other units easily. Make pixel-to-unit conversions a breeze with Pixel Converter.',
      openGraph: {
        title: 'Devools Pixel Converter - Effortless Pixel-to-Unit Conversions',
        description:
          'Convert pixels to other units effortlessly with Devools Pixel Converter. Simplify your unit conversion needs.',
      },
    },
  };

  return {
    ...(metaDataSet[slug] || {}),
  };
}
