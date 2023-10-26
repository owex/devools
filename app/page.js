import React from 'react';

import HomePage from './HomePage';



export const metadata = {
  title: 'Devools',
  description:
    'Providing code snippets and tools to help you speed up your development time.',
  openGraph: {
    title: 'Home Page ',
    description:
      'Providing code snippets and tools to help you speed up your development time.',
  },
};

const Page = (props) => {
  return <HomePage />;
};

export default Page;
