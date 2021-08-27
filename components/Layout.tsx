import React, { PropsWithChildren } from "react";
import { Header } from "./Header";

export function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <div id="page-container" className="flex flex-col justify-between">
        <div id="content-wrap">
          <Header />
          <main className="flex pt-16 sm:pt-0">{children}</main>
        </div>
        <footer id="footer">{`© ${new Date().getFullYear()} Wikigrisser`}</footer>
      </div>
    </>
  );
}
