import React from "react";
import { HeroLink } from "../gallery/HeroLink";
export function RelatedHeroesSection({ heroNames }: { heroNames: string[] }) {
  return (
    <>
      <p className="text-xl mb-2 font-bold">Availability</p>
      <ul className="flex flex-wrap mb-4">
        {heroNames.map((name) => (
          <li className="mr-1">
            <HeroLink name={name.toLowerCase()} prettyName={name} />
          </li>
        ))}
      </ul>
    </>
  );
}
