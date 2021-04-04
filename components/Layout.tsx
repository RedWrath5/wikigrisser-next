import React, { PropsWithChildren } from "react";
import { Header } from "./Header";

export function Layout({children}: PropsWithChildren<{}>) {
  
    return (
      <>
        <Header/>
        <div className="flex flex-col">
          <main className="flex">{children}</main>
          <footer className="flex">
            {`© ${new Date().getFullYear()} Wikigrisser`}
          </footer>
        </div>
      </>
    );
  }