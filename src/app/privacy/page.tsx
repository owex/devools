import React from 'react';
import type { Metadata } from "next";

import PrivacyPage from '@/resources/templates/PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy ',
  description: '',
  openGraph: {
    title: 'Privacy Policy ',
    description: '',
  },
};


const Page = () => {
  return <PrivacyPage />;
};

export default Page;
