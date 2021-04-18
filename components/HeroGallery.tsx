import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Factions } from "../types/hero";
import { HeroMap } from "../util/databaseSingleton";

export function HeroGallery({ heroMap }: { heroMap: HeroMap }) {
  return (
    <div className="bg-white flex flex-grow justify-center flex-col cursor-auto">
      <h1 className="text-6xl text-center mb-10 font-thin text-gray-600">
        Heroes
      </h1>
      <div className="flex flex-wrap justify-center text-center w-100">
        <div style={{ maxWidth: "1280px" }}>
          {Object.values(Factions).map((faction) => (
            <Image
              key={faction}
              src={"/factions/" + faction + ".png"}
              width={50}
              height={50}
            ></Image>
          ))}
        </div>
      </div>
      <div className="flex font-sans font-normal justify-center">
        <div
          className="flex flex-row flex-wrap cursor-pointer gap-5 justify-center"
          style={{ maxWidth: "1280px" }}
        >
          {Object.values(heroMap).map((hero) => {
            return (
              <div key={hero.name}>
                <Link href={"/heroes/" + hero.name}>
                  <Image
                    src={"/hero cards/Card_" + hero.prettyName + ".png"}
                    width={100}
                    height={100}
                  ></Image>
                </Link>
                <Link href={"/heroes/" + hero.name}>
                  <p className="text-center" style={{ width: "100px" }}>
                    {hero.prettyName}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
