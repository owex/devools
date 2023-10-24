'use client';

import { useMemo, useState } from 'react';
import classNames from 'classnames';

import { types } from '@/utils/snippets';

const statuses = {
  cli: 'text-green-700 bg-green-50 ring-green-600/20',
};

const SnippetsPage = ({ data = [] }) => {
  const [type, setType] = useState(false);

  const filteredData = useMemo(() => {
    if (!type) {
      return data;
    }

    return data.filter((item) => [...(item?.categories || [])].includes(type));
  }, [data, type]);

  return (
    <div className="flex w-full max-w-5xl min-h-screen mx-auto">
      <div className="w-full lg:w-1/6">
        <ul className="flex flex-col gap-y-2">
          <li className="text-left text-sm font-semibold leading-6 hover:text-primary">
            <button onClick={() => setType(false)} className="w-full text-left">
              All
            </button>
          </li>
          {types.map((item) => (
            <li
              key={`type${item}`}
              className={classNames(
                'text-left text-sm font-semibold leading-6 hover:text-primary',
                {
                  'text-primary': type === item,
                }
              )}
            >
              <button
                onClick={() => setType(item)}
                className="w-full text-left"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ul role="list" className="w-full lg:pl-10 divide-y divide-gray-100">
        {filteredData.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-x-6 py-5 w-full"
          >
            <div className="min-w-full">
              <a className="flex items-start gap-x-3" href={item.href}>
                <p className="text-sm font-semibold leading-6">{item.title}</p>
                {item.type && (
                  <p className="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'">
                    {item.type}
                  </p>
                )}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetsPage;
