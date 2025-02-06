import React from 'react';
import type { Metadata } from "next";

import PrivacyPage from '@/resources/templates/TermsPage';

export const metadata: Metadata = {
  title: 'Terms ',
  description: 'Terms and conditions for Devools.',
  openGraph: {
    title: 'Terms ',
    description: 'Terms and conditions for Devools.',
  },
};


const Page = () => {
  return <PrivacyPage />;
};

export default Page;
