import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "sgp1.digitaloceanspaces.com",
      },
      {
        protocol: "http",
        hostname: "143.110.230.81",
      },{
        protocol: "https",
        hostname: "picsum.photos"
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },

};

export default withNextIntl(nextConfig);
