import { GetStaticProps } from "next";
import { Layout } from "../components/Layout";
import React from "react";
import { DBSingleton, Patch, PatchMap } from "../util/databaseSingleton";
import { PatchSection } from "../components/patch/PatchSection";

const Home = ({ patchMap }: { patchMap: PatchMap }) => {
  const today = new Date().valueOf();
  const majorPatches: Patch[] = Object.values(patchMap).filter(
    (a: Patch) => a.type === "major"
  );
  const globalPatch = majorPatches.reduce((prev: Patch, curr: Patch) => {
    const currDiff = new Date(curr.releaseDate).valueOf() - today;

    if (currDiff > 0) return prev;

    return curr;
  });

  const cnPatch: Patch = majorPatches.pop()!;

  return (
    <Layout>
      <div className="flex flex-grow flex-col bg-black">
        <div className="flex justify-center">
          <img
            src={"/web/banner.jpg"}
            className="inline"
            width={2300}
            height={850}
          ></img>
        </div>

        <div className="flex flex-col justify-center text-center">
          <PatchSection patch={globalPatch}></PatchSection>
          <PatchSection patch={cnPatch}></PatchSection>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const patchMap = DBSingleton.getInstance().getPatchMap();

  return {
    props: {
      patchMap,
    },
  };
};

export default Home;
