'use client';

import React from 'react';
import PropTypes from 'prop-types';

import TextTo from '@/components/widgets/TextTo';
import PasswordGenerator from '@/components/widgets/PasswordGenerator';
import PixelTo from '@/components/widgets/PixelTo';
import StripTags from '@/components/widgets/StripTags';
import ColourManager from '@/components/widgets/ColourManager';
import ListGenerator from '@/components/widgets/ListGenerator';

const HomePage = (props) => {
  return (
    <div>
      <div className="mb-5">
        <h1 className="py-2 text-lg text-center">
          Convert Hex To RGB, Text to Camel, Snake and Kebab Case, Pixels to
          EM's and more...
        </h1>
      </div>
      <div className="px-5">
        <div className="flex flex-wrap">
          <div className="flex flex-col gap-y-5 w-full xl:w-4/12">
            <TextTo titleAsHeading="h2" text="Text To" />
            <PasswordGenerator titleAsHeading="h2" text="Password Generator" />
          </div>
          <div className="flex flex-col gap-y-5 w-full xl:w-5/12 px-5">
            <ColourManager
              title="Colour Manager"
              titleAsHeading="h2"
              text="Generate a colour palette and RGBA from a hex colour."
            />
            <ListGenerator title="HTML List Generator" titleAsHeading="h2" />
          </div>
          <div className="flex flex-col gap-y-5 w-full xl:w-3/12">
            <PixelTo
              title="Pixel To EM / REM"
              titleAsHeading="h2"
              text="Convert pixels to em's/rem"
            />
            <StripTags
              title="Strip Tags"
              titleAsHeading="h2"
              text="Remove HTML tags and leave intact the raw text."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
