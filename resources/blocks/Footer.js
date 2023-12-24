import React from 'react';
import PropTypes from 'prop-types';

const navigation = {
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  about: [
    { name: 'About Devools', href: '/about' },
    { name: 'Support', href: '/support' },
  ],
  social: [
    {
      name: 'Twitter / X',
      href: 'https://twitter.com/catratbat_uk',
      icon: (props) => (
        <svg
          fill="currentColor"
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 1227"
        >
          <path
            fill="currentColor"
            d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
          />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/owex',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const Footer = (props) => {
  return (
    <>
      <div className="hidden print:block w-full text-center mt-10">
        https://devools.com
      </div>
      <footer
        className="bg-white dark:bg-gray-800 print:hidden"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-10 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="flex w-full">
            <div className="w-full lg:w-2/3">
              <div className="flex flex-col lg:flex-row w-full gap-x-10">
                <div className="w-full lg:w-1/4">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
                    About
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.about.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-primary"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full lg:w-1/4 mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
                    Legal
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-primary"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-10 xl:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
                Support Devools
              </h3>
              <p className="my-2 text-sm leading-6 text-gray-600 dark:text-white">
                If you wish to support Devools then...
              </p>
              <a href="https://www.buymeacoffee.com/owenr" target="_blank">
                <img
                  width="235"
                  height="50"
                  src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=owenr&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
                  alt="Buy me a coffee"
                />
              </a>
            </div>
          </div>

          <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-sm leading-5 text-gray-500 dark:text-white md:order-1 md:mt-0"></p>
            <div className="mt-6 md:flex md:items-center md:justify-between">
              <div className="flex space-x-6 md:order-2 my-4 lg:my-0">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
              <div>
                <p className="text-xs leading-5 text-gray-500 dark:text-white">
                  &copy; {new Date().getFullYear()} Devools. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

Footer.propTypes = {};

export default Footer;
