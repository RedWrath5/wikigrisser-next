import React, { createContext, PropsWithChildren, useState } from "react";
import { Header } from "./Header";

export interface LangContextInterface {
  langMap: any;
  langMode: any;
  setLangMode: any;
}
export const LangContext = createContext<LangContextInterface>(
  {} as LangContextInterface
);

export function Layout(props: PropsWithChildren<{ langMap: any }>) {
  const [langMode, setLangMode] = useState("english");
  return (
    <>
      <div id="page-container" className="flex flex-col justify-between">
        <div id="content-wrap">
          <LangContext.Provider
            // any tip how set lang map in better way ?
            value={{ langMap: props?.langMap, langMode, setLangMode }}
          >
            <Header />
            <main className="flex pt-14 sm:pt-0">{props.children}</main>
          </LangContext.Provider>
        </div>
        <footer id="footer">{`© ${new Date().getFullYear()} Wikigrisser`}</footer>
      </div>
    </>
  );
}
