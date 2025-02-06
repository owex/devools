'use client';

import React from 'react';

import PasswordGenerator from '@/resources/components/widgets/PasswordGenerator';
import TextTo from '@/resources/components/widgets/TextTo';
import StripTags from '@/resources/components/widgets/StripTags';
import ColourManager from '@/resources/components/widgets/ColourManager';
import PixelTo from '@/resources/components/widgets/PixelTo';

const ToolsSlugPage = ({ slug }: { slug: string }) => {
  const tools: { [key: string]: React.ReactNode } = {
    'text-formatter': <TextTo titleAsHeading="h1" />,
    'password-generator': <PasswordGenerator titleAsHeading="h1" />,
    'strip-tags': <StripTags titleAsHeading="h1" />,
    'colour-manager': <ColourManager titleAsHeading="h1" />,
    'pixel-converter': <PixelTo titleAsHeading="h1" />,
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto p-8">{tools[slug] || ''}</div>
    </>
  );
};

export default ToolsSlugPage;
