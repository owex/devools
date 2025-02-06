import type { Metadata } from "next";

import HomePage from "@/resources/templates/HomePage";

export const metadata: Metadata = {
  title: 'Devools | Web Development Code Snippets and Tools',
  description:
    'Providing code snippets and tools to help you speed up your development time.',
  openGraph: {
    title: 'Devools | Web Development Code Snippets and Tools',
    description:
      'Providing code snippets and tools to help you speed up your development time.',
  },
};

const Home = () => {
  return <HomePage />;
}

export default Home;
