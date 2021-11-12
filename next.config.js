const isGhPages = process.env.ENV === "gh-pages";

console.log("-------------------------------------------------");
console.log("isGhPages", isGhPages);
console.log("-------------------------------------------------");

module.exports = {
  basePath: isGhPages ? "/wikigrisser-next" : "",
  assetPrefix: isGhPages ? "/wikigrisser-next" : "",
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
