import React from 'react';
import type { Metadata } from "next";

import AboutPage from '@/resources/templates/AboutPage';

const Page = () => {
  return <AboutPage />;
};

export const metadata: Metadata = {
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
