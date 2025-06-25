// // const { createProxyMiddleware } = require("http-proxy-middleware");
// import { createProxyMiddleware } from "http-proxy-middleware";

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // output: "export",
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "via.placeholder.com",
//       },
//       {
//         protocol: "https",
//         hostname: "assets.led-italia.it",
//       },
//       {
//         protocol: "https",
//         hostname: "foundation.alphalive.pro",
//       },
//     ],
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/api/proxy",
//         destination: "https://led-italia.it/api/catalog",
//       },
//       {
//         source: "/api/products/filter/category",
//         destination:
//           "https://foundation.alphalive.pro/api/front/products/filter/category",
//       },
//     ];
//   },
// };

// export default nextConfig;

// // module.exports = {
// //   async rewrites() {
// //     return [
// //       {
// //         source: "/api/proxy",
// //         destination: "https://led-italia.it/api/catalog",
// //       },
// //     ];
// //   },
// // };

import { createProxyMiddleware } from "http-proxy-middleware";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "assets.led-italia.it",
      },
      {
        protocol: "https",
        hostname: "foundation.alphalive.pro",
      },
      {
        protocol: "https",
        hostname: "foundation.techifort.com", // ✅ Added this domain
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy",
        destination: "https://led-italia.it/api/catalog",
      },
      {
        source: "/api/products/filter/category",
        destination:
          "https://foundation.alphalive.pro/api/front/products/filter/category",
      },
    ];
  },
};

export default nextConfig;
