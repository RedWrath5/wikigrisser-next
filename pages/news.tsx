import React, { PropsWithRef } from "react";
import { DBSingleton, PatchMap } from "../util/databaseSingleton";
import { Layout } from "../components/Layout";
import { NewsPage } from "../components/patch/NewsPage";
import { TranslateUILanguageMap } from "../types/translate";
import { TranslateWrapper } from "../components/context/TranslateContext";

const NewsPageBase = ({
  patches,
  translateUIMap,
}: PropsWithRef<{
  patches: PatchMap;
  translateUIMap: TranslateUILanguageMap;
}>) => (
  <TranslateWrapper translateMap={translateUIMap}>
    <Layout>
      <NewsPage patches={patches}></NewsPage>
    </Layout>
  </TranslateWrapper>
);

export const getStaticProps = async () => {
  var workbook = DBSingleton.getInstance();
  const patches = workbook.getPatchMap();
  const translateUIMap = workbook.getTranslateUIMap();

  return {
    props: {
      patches,
      translateUIMap,
    },
  };
};

export default NewsPageBase;
