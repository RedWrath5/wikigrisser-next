import React, { PropsWithChildren } from "react";
import { Header } from "./Header";
import { TranslateUILanguageMap } from "../types/translate";
import { UITranslateWrapper } from "./context/UITranslateContext";

export function Layout({
  translateUIMap,
  children,
}: PropsWithChildren<{ translateUIMap: TranslateUILanguageMap }>) {
  return (
    <>
      <UITranslateWrapper translateMap={translateUIMap}>
        <div id="page-container" className="flex flex-col justify-between">
          <div id="content-wrap">
            <Header />
            <main className="flex pt-14 sm:pt-0">{children}</main>=
          </div>
          <footer id="footer">{`© ${new Date().getFullYear()} Wikigrisser`}</footer>
        </div>
      </UITranslateWrapper>
    </>
  );
}
