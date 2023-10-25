'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Code from '@/components/Code';
import Steps from '@/components/Steps';

const SnippetPage = ({
  title,
  description,
  htmlContent,
  code,
  codeType,
  steps,
}) => {
  return (
    <div className="container min-h-screen px-5">
      <div className="lg:w-2/3">
        <div className="py-4">
          <div className="container mx-auto">
            <nav className="text-sm font-semibold">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <a href="/" className="hover:text-primary">
                    Home
                  </a>
                  <span className="mx-2">/</span>
                </li>
                <li className="flex items-center">
                  <a href="/snippets" className="hover:text-primary">
                    Snippets
                  </a>
                  <span className="mx-2">/</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary">{title}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <h1 className="w-2/3 mb-3 text-3xl font-semibold font-heading">
          {title}
        </h1>
        <p className="inline-block mb-5 pb-1 text-gray-700 border-b"></p>
        <p className="max-w-2xl mb-5 text-xl">{description}</p>

        {code && (
          <>
            <h2 className="text-2xl font-bold">Code</h2>
            <div className="my-5">
              <Code language={codeType} code={code} />
            </div>
          </>
        )}
        {steps && (
          <>
            <Steps steps={steps} />
          </>
        )}
        {htmlContent && (
          <>
            <div
              className="prose mt-10"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

SnippetPage.propTypes = {};

export default SnippetPage;
