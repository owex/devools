import React from 'react';

import HomePage from './HomePage';


export const metadata = {
  title: 'Devools | Web Development Code Snippets and Tools',
  description:
    'Providing code snippets and tools to help you speed up your development time.',
  openGraph: {
    title: 'Devools | Web Development Code Snippets and Tools',
    description:
      'Providing code snippets and tools to help you speed up your development time.',
  },
};

const Page = (props) => {
  return <HomePage />;
};

export default Page;
