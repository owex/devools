/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    site_url: process.env.SITE_URL,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client,
    site_url: process.env.SITE_URL,
    gtm_id: process.env.GTM_ID,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig
