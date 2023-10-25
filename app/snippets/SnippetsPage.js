'use client';

import { useMemo, useState } from 'react';
import classNames from 'classnames';

import { tags } from '@/utils/snippets';

const tagConfig = {
  apache: {
    colorClass: 'text-white bg-[#c9d] ring-green-600/20',
    name: 'Apache Web Server',
  },
  bash: {
    colorClass: 'text-blue-700 bg-[#abc] ring-blue-600/20',
    name: 'Bash Shell',
  },
  browser: {
    colorClass: 'text-indigo-700 bg-[#def] ring-indigo-600/20',
    name: 'Web Browser',
  },
  chrome: {
    colorClass: 'text-purple-700 bg-[#fed] ring-purple-600/20',
    name: 'Chrome',
  },
  cli: {
    colorClass: 'text-yellow-700 bg-[#cba] ring-yellow-600/20',
    name: 'CLI',
  },
  composer: {
    colorClass: 'text-red-700 bg-[#bde] ring-red-600/20',
    name: 'Composer',
  },
  compression: {
    colorClass: 'text-pink-700 bg-[#aed] ring-pink-600/20',
    name: 'Data Compression',
  },
  css: {
    colorClass: 'text-teal-700 bg-[#eca] ring-teal-600/20',
    name: 'CSS',
  },
  curl: {
    colorClass: 'text-cyan-700 bg-[#fde] ring-cyan-600/20',
    name: 'cURL',
  },
  database: {
    colorClass: 'text-green-700 bg-[#c9d] ring-green-600/20',
    name: 'Database',
  },
  'dependency management': {
    colorClass: 'text-white bg-[#abc] ring-blue-600/20',
    name: 'Dependency Management',
  },
  docker: {
    colorClass: 'text-indigo-700 bg-[#def] ring-indigo-600/20',
    name: 'Docker',
  },
  ftp: {
    colorClass: 'text-purple-700 bg-[#fed] ring-purple-600/20',
    name: 'File Transfer Protocol (FTP)',
  },
  git: {
    colorClass: 'text-white bg-[#cba] ring-yellow-600/20',
    name: 'Git',
  },
  google: {
    colorClass: 'text-red-700 bg-[#bde] ring-red-600/20',
    name: 'Google',
  },
  htaccess: {
    colorClass: 'text-pink-700 bg-[#aed] ring-pink-600/20',
    name: '.htaccess',
  },
  jquery: {
    colorClass: 'text-black bg-[#eca] ring-teal-600/20',
    name: 'jQuery',
  },
  linux: {
    colorClass: 'text-cyan-700 bg-[#fde] ring-cyan-600/20',
    name: 'Linux',
  },
  macos: {
    colorClass: 'text-blue-900 bg-[#def] ring-blue-900/20',
    name: 'macOS',
  },
  mysql: {
    colorClass: 'text-white bg-[#c9d] ring-green-900/20',
    name: 'MySQL',
  },
  pagespeed: {
    colorClass: 'text-indigo-900 bg-[#abc] ring-indigo-900/20',
    name: 'PageSpeed',
  },
  php: {
    colorClass: 'text-purple-900 bg-[#fed] ring-purple-900/20',
    name: 'PHP',
  },
  regex: {
    colorClass: 'text-yellow-900 bg-[#cba] ring-yellow-900/20',
    name: 'Regex',
  },
  sql: {
    colorClass: 'text-red-900 bg-[#bde] ring-red-900/20',
    name: 'SQL',
  },
  ssh: {
    colorClass: 'text-pink-900 bg-[#aed] ring-pink-900/20',
    name: 'Secure Shell (SSH)',
  },
  svn: {
    colorClass: 'text-teal-900 bg-[#eca] ring-teal-900/20',
    name: 'Subversion',
  },
  tar: {
    colorClass: 'text-cyan-900 bg-[#fde] ring-cyan-900/20',
    name: 'tar',
  },
  unix: {
    colorClass: 'text-blue-700 bg-[#def] ring-blue-600/20',
    name: 'Unix',
  },
  'version control': {
    colorClass: 'text-white bg-[#c9d] ring-green-600/20',
    name: 'Version Control',
  },
  vimeo: {
    colorClass: 'text-indigo-700 bg-[#abc] ring-indigo-600/20',
    name: 'Vimeo',
  },
  vsftpd: {
    colorClass: 'text-purple-700 bg-[#fed] ring-purple-600/20',
    name: 'vsftpd',
  },
  web: {
    colorClass: 'text-yellow-700 bg-[#cba] ring-yellow-600/20',
    name: 'Web',
  },
  youtube: {
    colorClass: 'text-red-700 bg-[#bde] ring-red-600/20',
    name: 'YouTube',
  },
};

const SnippetsPage = ({ data = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(false);

  const filteredData = useMemo(() => {
    if (!selectedCategory) {
      return data;
    }

    return data.filter((item) =>
      [...(item?.categories || [])].includes(selectedCategory)
    );
  }, [data, selectedCategory]);

  return (
    <div className="flex w-full max-w-6xl min-h-screen mx-auto">
      <div className="w-full lg:w-2/6">
        <h2 className="mb-2 text-lg font-heading font-semibold leading-6 text-gray-900 dark:text-gray-300">
          Tags
        </h2>
        <ul className="flex flex-wrap">
          <li
            className={classNames(
              'inline-block px-2 py-1 rounded-full text-sm mr-2 mb-2',
              {
                'bg-blue-500 text-white': !selectedCategory,
              }
            )}
          >
            <button
              onClick={() => setSelectedCategory(false)}
              className="w-full text-left"
            >
              All
            </button>
          </li>
          {tags.map((item) => (
            <li
              key={`type${item}`}
              className={classNames(
                'inline-block px-2 py-1 rounded-full text-sm mr-2 mb-2',
                {
                  'bg-blue-500 text-white': selectedCategory === item,
                }
              )}
            >
              <button
                onClick={() => setSelectedCategory(item)}
                className="w-full text-left"
              >
                {tagConfig[item]?.name || item}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ul role="list" className="w-full lg:pl-10 divide-y divide-gray-100">
        {filteredData.map((item) => (
          <li key={item.id}>
            <article className="flex items-center justify-between gap-x-6 py-5 w-full">
              <div className="min-w-full">
                <a className="flex items-start gap-x-3" href={item.href}>
                  <header>
                    <h3 className="text-sm font-semibold leading-6">
                      {item.title}
                    </h3>
                  </header>
                  {[...(item?.categories || [])].map((category) => (
                    <p
                      className={classNames(
                        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                        {
                          [tagConfig[category]?.colorClass]: true,
                        }
                      )}
                      key={`id-${item.id}-category${category}`}
                    >
                      {category}
                    </p>
                  ))}
                </a>
                <div>{item.description}</div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <a
                  href={item.href}
                  className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                  View <span className="sr-only">, {item.title}</span>
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetsPage;
