'use client';

import React from 'react';

const SupportPage = () => {
  return (
    <div className="container py-10">
      <div className="prose prose-xl dark:prose-invert">
        <h1>Support Devools</h1>

        <p>
          Devools is a free to use, to help with the running costs, on going
          maintenace and future upgrades Google Ads and Amazon Affiliate links
          have been installed to provide monetary support.
        </p>

        <p>
          If you wish to support Devools you are welcome to{' '}
          <a
            href="https://www.buymeacoffee.com/owenr"
            target="_blank"
            rel="nofollow"
          >
            {' '}
            Buy me a Coffee
          </a>{' '}
        </p>

        <p>
          Find me on{' '}
          <a href="https://twitter.com/catratbat_uk" rel="nofollow">
            Twitter
          </a>{' '}
          if you have any queries.
        </p>
      </div>
    </div>
  );
};

export default SupportPage;
