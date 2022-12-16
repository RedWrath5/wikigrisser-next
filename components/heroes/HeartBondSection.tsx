import React from "react";
import { HeartBond, Inscription } from "../../types/hero";
import { Img } from "../layout/Img";

export default function HeartBondSection({
  heartBond,
}: {
  heartBond: HeartBond;
}) {
  const row = (title: string, text: string) => (
    <div className="flex flex-row">
      <div className="font-bold mr-2">{title}</div>
      <div className="whitespace-pre-line">{text}</div>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-12 items-center mt-2 mb-2">
        <div className="col-span-12 text-center sm:col-span-1">
          <div className="mb-3">
            <Img
              src={"/confession/Heart Bond.png"}
              className="inline"
              width={70}
              height={70}
            />
          </div>
        </div>

        <div className="col-span-12 text-center sm:col-span-11 sm:text-left">
          {heartBond.lvl4 && row("Level 4", heartBond.lvl4)}
          {heartBond.lvl7 && row("Level 7", heartBond.lvl7)}
        </div>
      </div>
    </>
  );
}
