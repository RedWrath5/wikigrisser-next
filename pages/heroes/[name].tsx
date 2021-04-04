import React, { PropsWithoutRef } from "react";
import fs from "fs";
import path from "path";
import { Layout } from "../../components/Layout";
import { Hero } from "../../types/hero";
import { HeroComponent } from "../../components/heroes/HeroComponent";
import matter from "gray-matter";
import marked from "marked";
import { GetStaticPaths, GetStaticProps } from "next";

const HeroPage = ({ heroData }: {heroData: Hero}) => {
  return (
    <>
      <Layout>
        <HeroComponent hero={heroData}></HeroComponent>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("data/heroes");
  const paths = files.map(filename => ({
    params: {
      name: filename.replace(".json", "")
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps  = async (context) => {
  const name = context.params?.name;
  const heroDataBuffer = fs.readFileSync(path.join("data", "heroes", name + ".json"));

  const heroData: Hero = JSON.parse(heroDataBuffer.toString());


  if (heroData.talent.descriptionUrl) {
    heroData.talent.descriptionMarkdown= loadAndParseMarkdown(heroData.talent.descriptionUrl)
  }

  if (heroData.threeCostSkill?.descriptionUrl) {
    heroData.threeCostSkill.descriptionMarkdown = loadAndParseMarkdown(heroData.threeCostSkill.descriptionUrl)
  }

  return {
    props: {
      heroData
    }
  };
};

function loadAndParseMarkdown(fileUrl: string): string {
  const markdownWithMetadata = fs
  .readFileSync(path.join(fileUrl))
  .toString();

  const parsedMarkdown = matter(markdownWithMetadata);

  return marked(parsedMarkdown.content);
}

export default HeroPage;