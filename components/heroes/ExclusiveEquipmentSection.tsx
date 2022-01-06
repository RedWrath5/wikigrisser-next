import React from "react";
import { ExclusiveEquipment } from "../../types/hero";
import { addDefaultSrc } from "../../util/addDefaultSrc.fn";

export default function ExclusiveEquipmentSection({
  equipment,
}: {
  equipment: ExclusiveEquipment;
}) {
  return (
    <>
      <div className="grid grid-cols-12 items-center mt-2 mb-2">
        <div className="col-span-12 text-center sm:col-span-1">
          <div className="mb-3">
            <img
              src={"/equipment/" + equipment.name + ".png"}
              className="inline"
              width={70}
              height={70}
              onError={addDefaultSrc}
            ></img>
          </div>
        </div>
        <div className="col-span-12 text-center sm:col-span-11 sm:text-left">
          <p className="text-2xl">
            {`Exclusive Equipment:  ${equipment.name}`}
          </p>
          <p className="whitespace-pre-line">{equipment.effect}</p>
        </div>
      </div>
    </>
  );
}
