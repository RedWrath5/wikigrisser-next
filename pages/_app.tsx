// import App from 'next/app'
import type { AppProps } from "next/app";
import React from "react";
import "tailwindcss/tailwind.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles.css";
import {
  LanguageSwitchContext,
  LanguageSwitchContextWrapper,
} from "../components/context/LanguageSwitchContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageSwitchContextWrapper>
      <Component {...pageProps} />
    </LanguageSwitchContextWrapper>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
