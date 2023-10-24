'use client';

import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import PasswordGenerator from '@/components/widgets/PasswordGenerator';
import TextTo from '@/components/widgets/TextTo';
import StripTags from '@/components/widgets/StripTags';
import ColourManager from '@/components/widgets/ColourManager';
import PixelTo from '@/components/widgets/PixelTo';

const ToolsSlugPage = ({ slug }) => {
  const tools = {
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
