/** @type {import('next').NextConfig} */
const { parsed: envVars } = require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  env: {
    ...envVars,
  },
};

module.exports = nextConfig;
