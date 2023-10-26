import React from 'react';

import AboutPage from './AboutPage';

const Page = (props) => {
  return <AboutPage />;
};

export const metadata = {
  title: 'About ',
  description:
    'A developer toolset and resources for web development founded in 2012.',
  openGraph: {
    title: 'About ',
    description:
      'A developer toolset and resources for web development founded in 2012.',
  },
};


export default Page;
