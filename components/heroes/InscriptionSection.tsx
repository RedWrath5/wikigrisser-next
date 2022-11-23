import React from "react";
import { Inscription } from "../../types/hero";
import { Img } from "../layout/Img";

export default function InscriptionSection({
  inscription,
}: {
  inscription: Inscription;
}) {
  return (
    <>
      <div className="grid grid-cols-12 items-center mt-2 mb-2">
        <div className="col-span-12 text-center sm:col-span-1">
          <div className="mb-3">
            <Img
              src={"/Inscription/Inscription Skill.png"}
              className="inline"
              width={70}
              height={70}
            />
          </div>
        </div>
        <div className="col-span-12 text-center sm:col-span-11 sm:text-left">
          <p className="text-2xl">{`Inscription:  ${inscription.skillName}`}</p>
          <p className="whitespace-pre-line">{inscription.skillEffect}</p>
        </div>
      </div>
    </>
  );
}
