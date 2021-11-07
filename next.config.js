const isProd = process.env.NODE_ENV === "production";

module.exports = {
  assetPrefix: isProd ? "/wikigrisser-next/" : "",
  future: {
    webpack5: true,
  },
  target: "serverless",
  // async headers() {
  //   return [
  //     {
  //       source: "/_next/image(.*)",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=31536000, must-revalidate",
  //         },
  //       ],
  //     },
  //   ];
  // },
};
