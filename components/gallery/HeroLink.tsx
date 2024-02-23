import React, { ReactEventHandler, SyntheticEvent } from "react";
import Link from "next/link";
import { addDefaultSrc } from "../../util/addDefaultSrc.fn";
import { Img } from "../layout/Img";

export function HeroLink({
  name,
  prettyName,
}: {
  name: string;
  prettyName: string;
}) {
  return (
    <div className="cursor-pointer" key={name}>
      <Link legacyBehavior href={"/heroes/" + name} passHref={true}>
        <a>
          <Img
            src={"/hero cards/" + prettyName + ".png"}
            width={100}
            height={100}
            onError={addDefaultSrc}
          ></Img>
        </a>
      </Link>
      <Link legacyBehavior href={"/heroes/" + name}>
        <p className="text-center" style={{ width: "100px" }}>
          {prettyName}
        </p>
      </Link>
    </div>
  );
}
