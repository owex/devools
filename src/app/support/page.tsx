import React from 'react';
import type { Metadata } from "next";

import SupportPage from '@/resources/templates/SupportPage';

export const metadata: Metadata = {
  title: 'Support ',
  description: 'Learn how to support Devools.',
  openGraph: {
    title: 'Support ',
    description: 'Learn how to support Devools.',
  },
};


const Page = () => {
  return <SupportPage />;
};

export default Page;
